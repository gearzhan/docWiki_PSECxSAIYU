---
Document Type: Knowledge Base
Title: GitHub SSH Connection for Wiki.js
Category: System Administration
Last Updated: 2025-01-20
Version: 1.0
Author: SAIYU Team
---

# GitHub SSH Connection for Wiki.js

This guide provides step-by-step instructions for connecting Wiki.js (running in Docker) to GitHub using SSH authentication. This setup enables secure repository synchronization and version control integration.

## Overview

Connecting Wiki.js to GitHub via SSH provides secure, automated access to repositories without requiring password authentication. This is essential for:

- Automated content synchronization
- Version control integration
- Secure repository access
- Continuous deployment workflows

## Prerequisites

### System Requirements
- Wiki.js running in Docker container
- Docker Compose configuration
- Administrative access to the server
- GitHub account with repository access
- SSH client tools available

### Access Requirements
- Repository permissions on GitHub
- Docker container access
- File system write permissions
- Network connectivity to GitHub

## SSH Key Generation Process

### Step 1: Generate SSH Key Pair

#### Using ssh-keygen Command
```bash
# Generate ED25519 key (recommended)
ssh-keygen -t ed25519 -C "wikijs@yourdomain.com" -f ~/.ssh/wikijs_github

# Alternative: Generate RSA key (if ED25519 not supported)
ssh-keygen -t rsa -b 4096 -C "wikijs@yourdomain.com" -f ~/.ssh/wikijs_github
```

#### Key Generation Options
- **-t ed25519**: Use ED25519 algorithm (more secure, faster)
- **-t rsa -b 4096**: Use RSA with 4096-bit key size
- **-C "comment"**: Add comment to identify the key
- **-f filename**: Specify custom filename for key files

#### Security Considerations
```bash
# Set appropriate file permissions
chmod 600 ~/.ssh/wikijs_github
chmod 644 ~/.ssh/wikijs_github.pub

# Verify key generation
ls -la ~/.ssh/wikijs_github*
```

### Step 2: Add Public Key to GitHub

#### Via GitHub Web Interface
1. **Navigate to GitHub Settings**
   - Go to GitHub.com
   - Click on your profile picture
   - Select "Settings"
   - Click "SSH and GPG keys"

2. **Add New SSH Key**
   - Click "New SSH key"
   - Enter a descriptive title (e.g., "Wiki.js Docker Container")
   - Select key type: "Authentication Key"
   - Paste the public key content

3. **Copy Public Key Content**
   ```bash
   # Display public key content
   cat ~/.ssh/wikijs_github.pub
   
   # Copy to clipboard (macOS)
   pbcopy < ~/.ssh/wikijs_github.pub
   
   # Copy to clipboard (Linux with xclip)
   xclip -sel clip < ~/.ssh/wikijs_github.pub
   ```

#### Via GitHub CLI (Alternative)
```bash
# Install GitHub CLI if not available
# macOS: brew install gh
# Ubuntu: sudo apt install gh

# Authenticate with GitHub
gh auth login

# Add SSH key
gh ssh-key add ~/.ssh/wikijs_github.pub --title "Wiki.js Docker Container"
```

### Step 3: Configure Docker Volumes

#### Docker Compose Configuration
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
      - ./ssh:/home/wiki/.ssh:ro  # SSH keys volume
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

networks:
  wikijs-network:
    driver: bridge
```

#### SSH Directory Setup
```bash
# Create SSH directory for Docker volume
mkdir -p ./ssh

# Copy SSH keys to Docker volume directory
cp ~/.ssh/wikijs_github ./ssh/id_ed25519
cp ~/.ssh/wikijs_github.pub ./ssh/id_ed25519.pub

# Set appropriate permissions
chmod 600 ./ssh/id_ed25519
chmod 644 ./ssh/id_ed25519.pub
chown -R 1000:1000 ./ssh  # Wiki.js container user
```

### Step 4: Configure SSH Known Hosts

#### Add GitHub to Known Hosts
```bash
# Method 1: Manual addition
echo "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl" >> ./ssh/known_hosts
echo "github.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEmKSENjQEezOmxkZMy7opKgwFB9nkt5YRrYMjNuG5N87uRgg6CLrbo5wAdT/y6v0mKV0U2w0WZ2YB/++Tpockg=" >> ./ssh/known_hosts
echo "github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=" >> ./ssh/known_hosts

# Method 2: Automatic retrieval
ssh-keyscan -H github.com >> ./ssh/known_hosts

# Set permissions
chmod 644 ./ssh/known_hosts
```

#### Verify Known Hosts
```bash
# Check known_hosts content
cat ./ssh/known_hosts

# Test SSH connection (from host)
ssh -i ./ssh/id_ed25519 -T git@github.com
```

### Step 5: Configure SSH Client

#### SSH Config File
```bash
# Create SSH config file
cat > ./ssh/config << EOF
Host github.com
    HostName github.com
    User git
    IdentityFile /home/wiki/.ssh/id_ed25519
    IdentitiesOnly yes
    StrictHostKeyChecking yes
    UserKnownHostsFile /home/wiki/.ssh/known_hosts
EOF

# Set permissions
chmod 600 ./ssh/config
```

#### Alternative: Global SSH Config
```bash
# For multiple GitHub accounts or complex setups
cat > ./ssh/config << EOF
# Default GitHub configuration
Host github.com
    HostName github.com
    User git
    IdentityFile /home/wiki/.ssh/id_ed25519
    IdentitiesOnly yes

# Organization-specific configuration
Host github-org
    HostName github.com
    User git
    IdentityFile /home/wiki/.ssh/id_ed25519_org
    IdentitiesOnly yes

# Global settings
Host *
    StrictHostKeyChecking yes
    UserKnownHostsFile /home/wiki/.ssh/known_hosts
    ServerAliveInterval 60
    ServerAliveCountMax 3
EOF
```

## Wiki.js Configuration

### Step 6: Configure Git Storage

#### Access Wiki.js Admin Panel
1. **Navigate to Administration**
   - Open Wiki.js in browser
   - Login as administrator
   - Go to "Administration" → "Storage"

2. **Add Git Storage Target**
   - Click "+ Add Storage Target"
   - Select "Git" as storage type
   - Configure the following settings:

#### Git Storage Configuration
```yaml
# Storage Target Settings
Module: Git
Repository URL: git@github.com:username/repository.git
Branch: main
SSH Private Key Path: /home/wiki/.ssh/id_ed25519
SSH Private Key Passphrase: [leave empty if no passphrase]
Default Author Email: wikijs@yourdomain.com
Default Author Name: Wiki.js
Local Repository Path: ./data/repo
Sync Direction: Bi-directional
Sync Schedule: Every 5 minutes
```

#### Advanced Git Settings
```yaml
# Additional Configuration Options
Git Binary Path: /usr/bin/git
SSH Binary Path: /usr/bin/ssh
Verify SSL: true
Sync Untracked Files: false
Squash Commits: true
Commit Message: "docs: update from Wiki.js"
Push Branch: main
Pull Branch: main
```

### Step 7: Test Connection

#### Container SSH Test
```bash
# Enter Wiki.js container
docker exec -it wikijs /bin/sh

# Test SSH connection to GitHub
ssh -T git@github.com

# Expected output:
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

#### Git Operations Test
```bash
# Inside container, test git operations
cd /wiki/data
git clone git@github.com:username/repository.git test-repo
cd test-repo
echo "Test file" > test.txt
git add test.txt
git commit -m "Test commit"
git push origin main

# Clean up test
cd ..
rm -rf test-repo
```

## Troubleshooting

### Common Issues and Solutions

#### SSH Key Permission Errors
```bash
# Problem: Permission denied (publickey)
# Solution: Check file permissions
ls -la ./ssh/
chmod 600 ./ssh/id_ed25519
chmod 644 ./ssh/id_ed25519.pub
chmod 644 ./ssh/known_hosts
chmod 600 ./ssh/config
```

#### Host Key Verification Failed
```bash
# Problem: Host key verification failed
# Solution: Update known_hosts
rm ./ssh/known_hosts
ssh-keyscan -H github.com >> ./ssh/known_hosts

# Or disable strict checking (not recommended for production)
echo "StrictHostKeyChecking no" >> ./ssh/config
```

#### Git Authentication Issues
```bash
# Problem: Git operations fail with authentication error
# Solution: Verify SSH agent and key loading
docker exec -it wikijs /bin/sh
eval $(ssh-agent -s)
ssh-add /home/wiki/.ssh/id_ed25519
ssh -T git@github.com
```

#### Container User Permissions
```bash
# Problem: SSH files not accessible in container
# Solution: Fix ownership and permissions
sudo chown -R 1000:1000 ./ssh
chmod 700 ./ssh
chmod 600 ./ssh/id_ed25519
chmod 644 ./ssh/id_ed25519.pub
```

### Debugging Commands

#### SSH Connection Debugging
```bash
# Verbose SSH connection test
ssh -vvv -T git@github.com

# Test with specific key
ssh -i ./ssh/id_ed25519 -T git@github.com

# Check SSH agent
ssh-add -l
```

#### Git Configuration Check
```bash
# Inside container
git config --list
git config user.name
git config user.email

# Test git SSH
GIT_SSH_COMMAND="ssh -vvv" git ls-remote git@github.com:username/repository.git
```

#### Container Environment Check
```bash
# Check container environment
docker exec -it wikijs env | grep -i ssh
docker exec -it wikijs ls -la /home/wiki/.ssh/
docker exec -it wikijs cat /home/wiki/.ssh/config
```

## Security Best Practices

### SSH Key Management
- **Use Strong Keys**: Prefer ED25519 over RSA
- **Key Rotation**: Regularly rotate SSH keys
- **Limited Scope**: Use deploy keys for specific repositories
- **Passphrase Protection**: Consider using passphrases for keys
- **Access Monitoring**: Monitor SSH key usage

### Repository Security
- **Minimal Permissions**: Grant only necessary repository access
- **Branch Protection**: Use branch protection rules
- **Audit Logging**: Enable GitHub audit logging
- **Regular Reviews**: Periodically review access permissions
- **Backup Keys**: Maintain secure backups of SSH keys

### Container Security
- **Read-Only Volumes**: Mount SSH keys as read-only when possible
- **User Isolation**: Run containers with non-root users
- **Network Segmentation**: Limit container network access
- **Regular Updates**: Keep container images updated
- **Secret Management**: Use proper secret management tools

## Maintenance Procedures

### Regular Maintenance Tasks

#### SSH Key Rotation
```bash
#!/bin/bash
# SSH key rotation script

KEY_NAME="wikijs_github"
BACKUP_DIR="./ssh/backup"

# Create backup
mkdir -p $BACKUP_DIR
cp ./ssh/id_ed25519* $BACKUP_DIR/

# Generate new key
ssh-keygen -t ed25519 -C "wikijs@yourdomain.com" -f ./ssh/id_ed25519_new

# Update GitHub (manual step)
echo "Please add the new public key to GitHub:"
cat ./ssh/id_ed25519_new.pub

# After GitHub update, replace old key
# mv ./ssh/id_ed25519_new ./ssh/id_ed25519
# mv ./ssh/id_ed25519_new.pub ./ssh/id_ed25519.pub
```

#### Connection Health Check
```bash
#!/bin/bash
# SSH connection health check

# Test SSH connection
if docker exec wikijs ssh -T git@github.com 2>&1 | grep -q "successfully authenticated"; then
    echo "SSH connection to GitHub: OK"
else
    echo "SSH connection to GitHub: FAILED"
    exit 1
fi

# Test git operations
if docker exec wikijs git ls-remote git@github.com:username/repository.git > /dev/null 2>&1; then
    echo "Git repository access: OK"
else
    echo "Git repository access: FAILED"
    exit 1
fi

echo "All checks passed"
```

### Monitoring and Alerting

#### Log Monitoring
```bash
# Monitor SSH-related logs
docker logs wikijs 2>&1 | grep -i ssh

# Monitor git operations
docker logs wikijs 2>&1 | grep -i git

# Check for authentication failures
docker logs wikijs 2>&1 | grep -i "authentication\|permission denied"
```

#### Automated Alerts
```bash
#!/bin/bash
# Alert script for SSH/Git issues

LOG_FILE="/var/log/wikijs-ssh-monitor.log"
ALERT_EMAIL="admin@yourdomain.com"

# Check for recent authentication failures
if docker logs wikijs --since="1h" 2>&1 | grep -q "permission denied\|authentication failed"; then
    echo "$(date): SSH authentication failure detected" >> $LOG_FILE
    echo "SSH authentication failure detected in Wiki.js" | mail -s "Wiki.js SSH Alert" $ALERT_EMAIL
fi

# Check for git sync failures
if docker logs wikijs --since="1h" 2>&1 | grep -q "git.*failed\|sync.*error"; then
    echo "$(date): Git sync failure detected" >> $LOG_FILE
    echo "Git synchronization failure detected in Wiki.js" | mail -s "Wiki.js Git Alert" $ALERT_EMAIL
fi
```

## Advanced Configuration

### Multiple Repository Setup

#### Multiple SSH Keys
```bash
# Generate keys for different repositories
ssh-keygen -t ed25519 -C "wikijs-main@yourdomain.com" -f ./ssh/id_ed25519_main
ssh-keygen -t ed25519 -C "wikijs-docs@yourdomain.com" -f ./ssh/id_ed25519_docs

# SSH config for multiple repositories
cat > ./ssh/config << EOF
Host github-main
    HostName github.com
    User git
    IdentityFile /home/wiki/.ssh/id_ed25519_main
    IdentitiesOnly yes

Host github-docs
    HostName github.com
    User git
    IdentityFile /home/wiki/.ssh/id_ed25519_docs
    IdentitiesOnly yes
EOF
```

#### Repository-Specific Configuration
```yaml
# Wiki.js storage targets for multiple repositories
Storage Target 1:
  Module: Git
  Repository URL: git@github-main:org/main-repo.git
  Branch: main
  SSH Private Key Path: /home/wiki/.ssh/id_ed25519_main

Storage Target 2:
  Module: Git
  Repository URL: git@github-docs:org/docs-repo.git
  Branch: main
  SSH Private Key Path: /home/wiki/.ssh/id_ed25519_docs
```

### CI/CD Integration

#### GitHub Actions Workflow
```yaml
# .github/workflows/wikijs-sync.yml
name: Wiki.js Sync

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Trigger Wiki.js Sync
      run: |
        curl -X POST "https://wiki.yourdomain.com/api/storage/sync" \
             -H "Authorization: Bearer ${{ secrets.WIKIJS_API_TOKEN }}" \
             -H "Content-Type: application/json"
```

#### Webhook Configuration
```bash
# Configure GitHub webhook for automatic sync
# Webhook URL: https://wiki.yourdomain.com/api/storage/git/webhook
# Content type: application/json
# Events: push, pull_request
```

---

*This guide provides comprehensive instructions for setting up SSH-based GitHub integration with Wiki.js. Always test configurations in a development environment before applying to production systems.*