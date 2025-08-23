---
Document Type: Knowledge Base
Title: Wiki.js Database Transfer Process
Category: System Administration
Last Updated: 2025-01-20
Version: 1.0
Author: SAIYU Team
---

# Wiki.js Database Transfer Process

This document outlines the process for transferring a Wiki.js installation between servers, specifically for PostgreSQL databases running on Docker. It covers the complete workflow from setting up a new server to backing up, transferring, and restoring the database.

## Overview

Transferring a Wiki.js installation involves migrating both the application configuration and the PostgreSQL database. This process ensures continuity of content, user accounts, and system settings when moving between servers.

## Prerequisites

### Source Server Requirements
- Running Wiki.js instance with PostgreSQL
- Docker and Docker Compose installed
- Administrative access to the server
- Network connectivity for file transfer

### Target Server Requirements
- Fresh server with Docker and Docker Compose
- Sufficient storage space for database and files
- Network connectivity to source server
- Same or compatible Wiki.js version

## Process Overview

### Phase 1: New Server Setup
1. **Server Preparation**
   - Install Docker and Docker Compose
   - Configure network and security settings
   - Set up directory structure
   - Configure firewall rules

2. **Wiki.js Installation**
   - Deploy Wiki.js using Docker Compose
   - Configure initial settings
   - Verify basic functionality
   - Prepare for data migration

### Phase 2: Database Backup
1. **Backup Preparation**
   - Stop Wiki.js application (optional but recommended)
   - Verify database connectivity
   - Create backup directory
   - Check available disk space

2. **Database Export**
   - Execute PostgreSQL dump command
   - Verify backup file integrity
   - Compress backup if necessary
   - Document backup metadata

### Phase 3: File Transfer
1. **Transfer Methods**
   - SCP (Secure Copy Protocol)
   - SFTP (SSH File Transfer Protocol)
   - rsync for large files
   - Cloud storage intermediate transfer

2. **Transfer Verification**
   - Verify file integrity
   - Check file permissions
   - Validate transfer completion
   - Document transfer details

### Phase 4: Database Restoration
1. **Restoration Preparation**
   - Stop target Wiki.js instance
   - Clear existing database (if any)
   - Verify PostgreSQL connectivity
   - Prepare restoration environment

2. **Database Import**
   - Execute PostgreSQL restore command
   - Monitor restoration progress
   - Verify data integrity
   - Update configuration if needed

## Detailed Procedures

### Setting Up New Server

#### Docker Installation
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

#### Directory Structure
```bash
# Create Wiki.js directory structure
mkdir -p ~/wikijs/{data,db-data,config}
cd ~/wikijs
```

### Database Backup from Old Server

#### Backup Command
```bash
# Create backup directory
mkdir -p ~/wikijs-backup

# Execute PostgreSQL dump
docker exec -t wikijs-db pg_dump -U wikijs -d wikijs > ~/wikijs-backup/wikijs-backup-$(date +%Y%m%d-%H%M%S).sql

# Alternative: Compressed backup
docker exec -t wikijs-db pg_dump -U wikijs -d wikijs | gzip > ~/wikijs-backup/wikijs-backup-$(date +%Y%m%d-%H%M%S).sql.gz
```

#### Backup Verification
```bash
# Check backup file size
ls -lh ~/wikijs-backup/

# Verify backup file integrity
file ~/wikijs-backup/wikijs-backup-*.sql

# Check backup content (first few lines)
head -20 ~/wikijs-backup/wikijs-backup-*.sql
```

### File Transfer

#### Using SCP
```bash
# Transfer backup file to new server
scp ~/wikijs-backup/wikijs-backup-*.sql user@new-server:~/wikijs-backup/

# Transfer with compression
scp -C ~/wikijs-backup/wikijs-backup-*.sql.gz user@new-server:~/wikijs-backup/
```

#### Using rsync
```bash
# Sync backup directory
rsync -avz ~/wikijs-backup/ user@new-server:~/wikijs-backup/

# With progress indicator
rsync -avz --progress ~/wikijs-backup/ user@new-server:~/wikijs-backup/
```

### Database Restoration on New Server

#### Preparation
```bash
# Stop Wiki.js container
docker-compose down

# Start only PostgreSQL container
docker-compose up -d db

# Wait for database to be ready
sleep 30
```

#### Restoration Command
```bash
# Restore from uncompressed backup
docker exec -i wikijs-db psql -U wikijs -d wikijs < ~/wikijs-backup/wikijs-backup-*.sql

# Restore from compressed backup
zcat ~/wikijs-backup/wikijs-backup-*.sql.gz | docker exec -i wikijs-db psql -U wikijs -d wikijs
```

#### Post-Restoration
```bash
# Start Wiki.js application
docker-compose up -d

# Check container status
docker-compose ps

# View logs
docker-compose logs -f wikijs
```

## Docker Compose Configuration

### Complete Stack Example

```yaml
version: '3.8'

services:
  wikijs:
    image: ghcr.io/requarks/wiki:2
    container_name: wikijs
    depends_on:
      - db
    environment:
      DB_TYPE: postgres
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: wikijs
      DB_PASS: wikijspassword
      DB_NAME: wikijs
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/wiki/data
      - ./config:/wiki/config
    networks:
      - wikijs-network

  db:
    image: postgres:15
    container_name: wikijs-db
    environment:
      POSTGRES_DB: wikijs
      POSTGRES_USER: wikijs
      POSTGRES_PASSWORD: wikijspassword
    restart: unless-stopped
    volumes:
      - ./db-data:/var/lib/postgresql/data
    networks:
      - wikijs-network
    ports:
      - "5432:5432"  # Optional: for external access

networks:
  wikijs-network:
    driver: bridge

volumes:
  db-data:
  wiki-data:
```

### Environment Configuration

#### .env File Example
```bash
# Database Configuration
DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USER=wikijs
DB_PASS=your_secure_password_here
DB_NAME=wikijs

# Wiki.js Configuration
WIKI_ADMIN_EMAIL=admin@yourdomain.com
WIKI_SITE_URL=https://wiki.yourdomain.com

# PostgreSQL Configuration
POSTGRES_DB=wikijs
POSTGRES_USER=wikijs
POSTGRES_PASSWORD=your_secure_password_here
```

## Troubleshooting

### Common Issues

#### Database Connection Problems
```bash
# Check database container status
docker-compose ps db

# View database logs
docker-compose logs db

# Test database connectivity
docker exec -it wikijs-db psql -U wikijs -d wikijs -c "SELECT version();"
```

#### Backup/Restore Errors
```bash
# Check backup file permissions
ls -la ~/wikijs-backup/

# Verify PostgreSQL user permissions
docker exec -it wikijs-db psql -U postgres -c "\du"

# Check database size after restore
docker exec -it wikijs-db psql -U wikijs -d wikijs -c "SELECT pg_size_pretty(pg_database_size('wikijs'));"
```

#### Application Startup Issues
```bash
# Check Wiki.js logs
docker-compose logs wikijs

# Verify environment variables
docker-compose config

# Check file permissions
ls -la ./data ./config
```

### Performance Optimization

#### Database Tuning
```sql
-- Check database statistics
SELECT schemaname, tablename, n_tup_ins, n_tup_upd, n_tup_del 
FROM pg_stat_user_tables;

-- Analyze database
ANALYZE;

-- Vacuum database
VACUUM ANALYZE;
```

#### Container Resource Limits
```yaml
services:
  wikijs:
    # ... other configuration
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '0.5'
        reservations:
          memory: 512M
          cpus: '0.25'
  
  db:
    # ... other configuration
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

## Security Considerations

### Database Security
- Use strong, unique passwords
- Limit database network exposure
- Regular security updates
- Backup encryption
- Access logging and monitoring

### File Transfer Security
- Use encrypted transfer methods (SCP, SFTP)
- Verify file integrity with checksums
- Secure temporary storage
- Clean up temporary files
- Audit transfer activities

### Application Security
- Keep Wiki.js updated
- Configure proper authentication
- Use HTTPS in production
- Regular security assessments
- Monitor access logs

## Maintenance Procedures

### Regular Backups
```bash
#!/bin/bash
# Automated backup script

BACKUP_DIR="/backup/wikijs"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="wikijs-backup-$DATE.sql.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create compressed backup
docker exec wikijs-db pg_dump -U wikijs -d wikijs | gzip > "$BACKUP_DIR/$BACKUP_FILE"

# Verify backup
if [ -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "Backup created successfully: $BACKUP_FILE"
    # Clean up old backups (keep last 7 days)
    find $BACKUP_DIR -name "wikijs-backup-*.sql.gz" -mtime +7 -delete
else
    echo "Backup failed!"
    exit 1
fi
```

### Health Monitoring
```bash
#!/bin/bash
# Health check script

# Check container status
if ! docker-compose ps | grep -q "Up"; then
    echo "Warning: Some containers are not running"
    docker-compose ps
fi

# Check database connectivity
if ! docker exec wikijs-db pg_isready -U wikijs; then
    echo "Error: Database is not ready"
    exit 1
fi

# Check Wiki.js response
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "Warning: Wiki.js is not responding"
fi

echo "Health check completed"
```

## Best Practices

### Planning and Preparation
- Document current configuration
- Test migration process in staging
- Plan for downtime windows
- Prepare rollback procedures
- Communicate with stakeholders

### Execution
- Follow documented procedures
- Monitor each step carefully
- Verify data integrity at each stage
- Keep detailed logs
- Have support contacts ready

### Post-Migration
- Comprehensive testing
- Performance monitoring
- User acceptance testing
- Documentation updates
- Lessons learned review

---

*This document provides comprehensive guidance for Wiki.js database transfers. Always test procedures in a non-production environment before executing on production systems.*