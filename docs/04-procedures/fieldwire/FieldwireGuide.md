# Fieldwire Guide
---
<p style="text-align:right">Date: 23.08.2025 | Revision: 2025.08.a</p>

## Introduction

This guide provides a comprehensive overview of using **Fieldwire** for project management. Fieldwire is our primary tool for managing on-site activities, including plans, files, daily reports, and tasks. Adhering to these guidelines ensures consistency and efficiency across all projects.



## 1. General Rules & Responsibilities

-   **Plans & Files**: Managed and updated by **SAIYU's Project Manager (PM)**.
-   **Daily Reports**: Managed and updated by **SAIYU's Foreman**.
-   **Tasks**: Including QA, defects, etc., which require tracking and follow-up.



## 2. Plans and Files Management

Proper management of plans and files is critical for project success.

### Folder Structure Template

> Plans & File Folder Structure is FIXED on Fieldwire from **Aug 2024**. When creating a new project on Fieldwire, use the following template: `Saiyu's Template - NEW Build Rev.2024.08.a`


### Naming and Version Control

When uploading plans, the following fields must be updated:

-   **Sheet #:** Drawing Number
-   **Description:** Drawing Title
-   **Version Control**: This is crucial. See details below.

#### Version Control Guidelines

**Scenario #1: Regular Plan Updates**

-   **Version Description Format:**
    ```markdown
    YYYY.MM.DD | DA/CC(n)/FC | REVxx
    2025.02.01 | CC5 | RevGG.1
    2023.11.23 | FC | Rev17
    ```
    -   **YYYY.MM.DD:** Date of receiving the plan, if known. Otherwise, use the issuing date on the plan.
    -   **DA/CDC/S4.55/CC/ModCC(n):** The drawing's project stage.
    -   **FT:** For Tendering, or for information.
    -   **FC:** For Construction.
    -   **REVxx:** Revision number of the drawing.

-   **Version Notes:**
    -   Include any pertinent information about the drawing or plan.

> **Note:**
> 1.  Always use the **date of receiving the plan** for consistency. (If receiving date is unknown, use the issuing date on the plan.)
> 2.  CC Set drawings are sometimes issued for tendering or certification. For Construction drawings, they **MUST** be from a CC Set.
> 3.  If consultants update drawings without updating the revision, add a `.n` at the end (e.g., `RevC.1`).

**Scenario #2: Other Plan Types**

-   **Version Description Format:**
    ```markdown
    YYYY.MM.DD | Special Operator
    2024.10.11 | Additional
    ```
    -   **YYYY.MM.DD:** Date of receiving the plan, if known. Otherwise, use the issuing date on the plan.
    -   **Special Operator:** See the list below.

-   **Version Notes:**
    -   Provide context about the drawing.

**Special Operators:**

-   `Markups`: For markups of details or plans.
-   `Additional`: For details that don't belong to a DA/CC set and have no revision.
-   `Schedule`: For PC Items or Special Condition Schedules.

### Maintaining Plans

-   **Regular Audits:** Periodically review plans to ensure they are current.
-   **Access Control:** Limit editing permissions to authorized personnel.
-   **Backup Procedures:** Establish regular backups.
-   **Change Log:** Maintain a log of all changes.



## 3. Daily Construction Site Reports

Daily reports are essential for keeping all stakeholders informed. 

?> [READMORE abour Daily Report](11-assets/daily_reports_temp)

> SAIYU's daily report system is currently hosted on Fieldwire with a preset template.

### What to Include in Your Report

1.  **Weather Conditions**: Record temperature, precipitation, and wind at 6:00 AM, 12:00 PM, and 4:00 PM. Note any weather-related delays.
2.  **Work Log and Trade Activities**: List each trade, tasks completed, personnel, hours worked, and responsibilities. Be specific.
3.  **General Information**: Document schedule delays, accidents, injuries, equipment breakdowns, or staff absences, and how they were handled.
4.  **Equipment and Hiring Logs**: Detail equipment type, hours used, and delivery/removal times.
5.  **Material Delivery and Skip Bin Usage**: Track incoming materials, quantities, returns, and skip bin usage.
6.  **Inspections and Certifications**: Record inspections, who conducted them, and the outcome.
7.  **Attachments and Images**: Attach photos of key activities, progress, and completed work.

### Sample Report

!>Right click to download.

[>>Fieldwire Daily Report Example<<](docs/11-assets/daily_report_fw_example.pdf ':ignore')

[>>Printable Daily Report Template<<](docs/11-assets/daily_reports_temp.pdf ':ignore')


## 4. Fieldwire Functions

### Locations

Use locations to label specific areas (e.g., units, lobbies, levels). You can import locations using a CSV file in the project settings.

**Example CSV Structure:**

| Tier 1 | Tier 2 | Tier 3 | Tier 4 | Tier 5 |
|---|---|---|---|---|
| Tower A | | | | |
| Tower A | Basement | Lobby | | |
| Tower A | GL | U01 | Bedroom | Master |


### Plan Markups and Color Codes (NOT in use)

!> **Under Development:** This rule is **NOT** currently in use and is for discussion purposes only.

To maintain consistency and clarity in project communication, Fieldwire's plan markup tools should be used with a standardized color-coding system. This ensures that all team members can quickly identify the nature of a markup.

**Color Code Standard:**

-   **Red: Defects & Markups**
    -   Used to identify and track construction defects, errors, or areas that require correction.
    -   Also used for general markups and annotations that highlight specific details on the plans.
-   **Green: RFIs (Requests for Information)**
    -   Used to flag areas on the plans where information is missing or clarification is needed from the architect, engineer, or other stakeholders.
-   **Blue: Notes & Observations**
    -   Used for general comments, observations, or reminders that do not require immediate action but provide helpful context.
-   **Purple: Personal Use**
    -   Reserved for individual team members' private notes or temporary markups that are not intended for the entire team. These should be removed once they are no longer needed.

**Best Practices:**

-   Always select the appropriate color before creating a markup.
-   Use the toggle feature to hide or show certain colors to focus on specific types of information.
-   Keep markups clean and concise to avoid cluttering the plans.

---

Page Title: Fieldwire Guide | Last Update: 23.08.2025 | Revision: 2025.08.a | Status: Published