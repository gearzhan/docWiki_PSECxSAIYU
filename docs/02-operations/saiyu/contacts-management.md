# Contacts Management

**Document Information:**
- **Title:** Contacts Management
- **Category:** Operations
- **Last Updated:** 2025-02-04
- **Tags:** contacts, google-contacts, management
- **Version:** 2024.10.c

---

## Google Contacts Management

> **GEAR's** Google Contacts is used to sort all contacts. Delegation is given to **CA** and **Ewen**.

## Categories

Categories are distinguished by **LABELS**:

- **Co-worker** 
	- Saiyu/PSEC employees
  - Saiyu/PSEC former employees
- **Authority**
- **Clients**
- **Consultant**
- **Landlord**
  - New Owners
  - Neighbours
- **Trade**

## Basic Information

- **Email**: All email addresses the contact uses or has used.
- **Phone**: All phone/mobile numbers the contact uses or has used (note: please add country code, e.g., `+61`).
- **Address**: Work or home address, if known.
- **Company**: Current company, if known.
- **Job Title**: Including Position & Profession.
  - *Examples*:
    - `Director, Engineer, Structural`
    - `Project Manager, Demolition, Waste Management`

---

## Additional Notes

- Ensure all **emails** and **phone numbers** are up to date.
- Include **country codes** for phone numbers, e.g., `+61` for Australia.
- **Addresses** should be added if known to help with location-based sorting.
- Use the **Job Title** field to include detailed professional information.
- Ensure consistent use of **vertical bars `|`** in naming formats to separate fields.

---

## Example Entries

### Co-worker

`John Doe`

### Trade - Company Known

`Emily |Quality Electricians| Davis`

### Client

`Jane |Acme Corp| Smith`

### Consultant

`Mike |Engineering Solutions| Brown`

### Landlord - New Owner

`Sarah |B3-U202| Johnson`

### Landlord - Neighbour

`Tom |C4-Neighbour| Smith`

## Naming Conventions

### For Job Title

**Format:**
```markdown
[Position] , [Profession] , [Field]...
```

**Example:**
```markdown
[Position] , [Profession] , [Field]
Senior Consultant, Engineer, Structural, Stormwater, Civil
Associate Director, Architect
Director, Plumber, Major S73
Project Manager, Electrician, Level1 ASP, Level 2
```

### For Co-workers

**Format:**
```
[First Name] [Last Name]
```

**Example:**
```markdown
Eric Chan
```

For **Co-workers**, Company is not import information.

### For Authority, Clients, Consultant

**Format:**
```
[First Name] |[Company]| [Last Name]
```

**Example:**
```markdown
Eric |SHENS| Wu
```

For **Consultants**, in the **Job Title** section, input Position, Occupation, Field (e.g., `Director, Engineer, Structural`).

### For Landlord - New Owners

**Format:**
```
[First Name] |[Job-Unit]| [Last Name]
```

**Examples:**
```markdown
Claire |K2-U103| Hallam
Bruce |O2-6A| Niver
```

### For Landlord - Neighbours

**Format:**
```
[First Name] |[Job-"Neighbour"]| [Last Name]
```

**Example:**
```markdown
Alec |H1-Neighbour|
```

### For Trade - Company Known

**Format:**
```
[First Name] |[Company]| [Last Name]
```

**Example:**
```markdown
Alan |Mac Renders| Ryan
```

If company is not known:
```markdown
Adison |Tiler|
```

## Contact Management Delegation

*Contact management responsibilities are delegated to designated team members as specified above.*