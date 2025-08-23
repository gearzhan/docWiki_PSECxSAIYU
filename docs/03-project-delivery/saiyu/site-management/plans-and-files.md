# Plans and Files Management

**Document Information:**
- **Title:** Plans and Files
- **Category:** Site Management
- **Last Updated:** 2025-02-04
- **Tags:** plans, files, project-management, fieldwire
- **Version:** 2024.11.a

---

## Liability

> Plans files are managed and updated by **SAIYU's Project Manager (PM)**.

## Plans and Files Folder Structure

> Plans & File Folder Structure is FIXED from Aug 2024. When create a new project on Fieldwire chose to use the following template: 
>
> `Saiyu's Template - NEW Build Rev.2024.08.a`

---

## Naming and Version Control when Uploading Plans and Files

### Updating Plans

Fields to update:

- **Sheet #:** Drawing Number
- **Description:** Drawing Title
- **Version Control**: `this is important`, detail refer section below.

### Version Control Guidelines

#### Scenario #1: Regular Updating Plans

- **Version Description Format:**

  ``` markdown
  YYYY.MM.DD | DA/CC(n)/FC | REVxx
  2025.02.01 | CC5 | RevGG.1
  2023.11.23 | FC | Rev17
  ```

  - **YYYY.MM.DD:** Date of receiving the plan
  - **DA/CDC/S4.55/CC/ModCC(n):** The drawing belongs which stage of the project with modification numbering
  - **FT :** For Tending, or for information. 
  - **FC :** For Contruction.
  - **REVxx:** Revision number of the drawing

- **Version Notes:**
  - Include any pertinent information about the drawing or plan.

> **Note:** 
> 1. Always use the **date of receiving the plan** for consistency. (if receiving date unknow, then use the issuing date on the plan.)
> 1. CC Set drawing is sometimes issued for tending or certification. For Construction drawing **MUST** be CC Set.
> 1. If consutlants updated drawings with out updating the revision, add a `.n` at the end. e.g. RevC.1

#### Scenario #2: Other Plan.

- **Version Description Format:**

  ``` markdown
  YYYY.MM.DD | Special Operator
  2024.10.11 | Additional
  ```

  - **YYYY.MM.DD:** Date of receiving the plan
  - **Special Operator:** See the list below for applicable operators

- **Version Notes:**
  - Provide details or context about the drawing or plan.
  
##### Special Operators

- `Markups`
  - Indicates markups of details or plans.
- `Additional`
  - Additional details that do not belong to any DA or CC set and have no revision.
- `Schedule`
  - PC (Prime Cost) Items or Special Condition Schedules for site coordination.

> **Note:** Always use the **date of receiving the plan** for consistency. (if receiving date unknow, then use the issuing date on the plan.)

### Uploading Files

Fields to update:

- **File Name:** Ensure the file name reflects the content accurately.

---

## Maintaining Plans and Files

### Suggestions for Maintaining Plans

- **Regular Audits:**
  - Schedule periodic reviews to ensure all plans are current and accurately filed.
- **Access Control:**
  - Limit editing permissions to authorized personnel to prevent unauthorized changes.
- **Backup Procedures:**
  - Establish regular backups to safeguard against data loss.
- **Change Log:**
  - Maintain a log of all changes made to plans for transparency and tracking.