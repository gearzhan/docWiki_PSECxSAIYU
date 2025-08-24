# PSEC Project Folder Structure

<p style="text-align:right">Date: 24.08.2025 | Revision: 2025.08.c</p>

## 1. Overview

This document outlines the standardized project management folder system for PSEC's architectural and construction projects in New South Wales, Australia. It is designed to ensure consistency, clarity, and efficiency from project feasibility through to post-completion.

## 2. Core Principles

Our file organization is guided by four key principles:

| Principle | Description |
| :--- | :--- |
| **Consistent Numbering** | Main categories are prefixed with two digits (e.g., `01`, `02`) to maintain a logical and predictable order. |
| **Clear Hierarchy** | The structure is kept to a maximum of 3-4 levels deep to prevent over-nesting and ensure easy navigation. |
| **Standardized Naming** | Files like meeting minutes and invoices follow a strict `YYMMDD` format for chronological sorting. |
| **Version Control** | Superseded files are moved to `SS` folders to maintain a clean working directory and a clear document history. |

## 3. Root Structure Overview

| No. | Folder Name | Purpose |
| :-- | :--- | :--- |
| 01 | **Administration** | Central hub for financials, legal, and project reporting. |
| 02 | **Authorities** | Manages all interactions with government and regulatory bodies. |
| 03 | **Consultants** | Organizes all consultant deliverables, proposals, and correspondence. |
| 04 | **Contractor Correspondence** | Tracks all communication with the contractor, organized by project phase. |
| 05 | **Data Records** | Chronological log of critical project communications and site photos. |
| 09 | **Research Info** | Repository for non-project-specific research and reference materials. |

---

## 4. Detailed Folder Breakdown

### 01 Administration

The central hub for project administration, financial management, and business operations.

-   `01 Accounting/`
    -   `01 Feasibility/`: Financial feasibility studies.
    -   `02 Project Budget/`: Detailed project budgets and cost forecasts.
    -   `03 Project Expenses/`: Central repository for **all invoices**. Naming: `YYMMDD_ProjectCode_Company_(if Paid)`.
    -   `04 Finance - Bank Funding/`: Bank loan documentation.
-   `02 Legal/`: Legal contracts, agreements, and warranties.
-   `03 Meeting Minutes/`: Unified folder for all meeting records. Naming: `YYMMDD_ProjectCode_Subject_Attendee01-Attendee02(Company)`.
-   `04 Project Monthly Report/`: Regular project status and progress reports.
-   `05 Sales Contract and Marketing/`
    -   `01 Sales Contracts/`: Purchase agreements and settlement documents.
    -   `02 Marketing/`: Materials, agent agreements, and price lists.
    -   `03 Strata management/`: Strata bylaws and plans.
-   `09 Fieldwire Backups/`: Digital backups from the Fieldwire platform.

### 02 Authorities

Manages all interactions and submissions with government authorities and utility providers.

-   `01 NSW Planning Portal/`
-   `02 Council/` (DA, LEC, S4.55, S88B)
-   `03 PCA - building/` (CC, OC)
-   `04 PCA - Strata/`
-   `05 NSW Land Registry Services(LRS)/`
-   `06 NSW Fire & Rescue/`
-   `07 Sydney Water/`
-   `08 Energy Provider Ausgrid & EE/`
-   `09 Telstra & NBN/`
-   `10 Jemina/` (Gas)
-   `11 NSW RFS/`
-   `12 Water NSW/`
-   `13 Railcorp/`

### 03 Consultants

Manages all project consultants, their deliverables, and fee proposals.

> **Note:** Each consultant's root folder contains their **current working files**. Outdated files are moved to the `SS/` (Superseded) sub-folder. All invoices are filed in `01 Administration/03 Project Expenses/`.

-   `3D Physical model & Rendering/`
-   `Access & DDA compliance/`
-   `Acoustic engineering/`
-   `Arborist services/`
-   `Architecture services/`
-   `BASIX & Section J/`
-   `BCA (Building Code of Australia)/`
-   `Civil & Stormwater engineering/`
-   `Environmental assessment/`
-   `Facade engineering/`
-   `Fire Safety engineering/`
-   `Geotechnical engineering/`
-   `Hydraulic engineering/`
-   `Interior design/`
-   `Landscape architecture/`
-   `Level 3 ASP/`
-   `MEPF/` (Mechanical, Electrical, Plumbing, Fire)
-   `Planning consultants/`
-   `Project management services/`
-   `Quantity surveying/`
-   `Structural engineering/`
-   `Survey services/`
-   `Sydney Water coordination/`
-   `Traffic engineering/`
-   `Vertical Transport Engineer/`

### 04 Contractor Correspondence

Tracks all formal communication with the contractor, organized by project phase.

-   `01 Tender/`: Tender process documentation.
-   `02 Construction/`
    -   `01 RFI_AI_Notice/`: Requests for Information and Architect's Instructions.
    -   `02 Progress Claim/`: Progress payment claims.
    -   `03 EOT/`: Extension of Time requests.
    -   `04 Variations/`: Contract variations.
    -   `05 PCG reports/`: Project Control Group reports.
    -   `06 QA check/`: Quality Assurance checks.
-   `03 Pre-OC/`: Pre-Occupation Certificate activities.
-   `04 Post PC/`: Post-Practical Completion activities.

### 05 Data Records

A chronological log for critical information and communications not captured elsewhere.

> **Best Practice:** Use descriptive filenames and maintain chronological order for easy retrieval.

-   **Naming Convention:**
    -   `YYMMDD_IN_description`: For incoming correspondence.
    -   `YYMMDD_OUT_description`: For outgoing correspondence.
-   **Contents:**
    -   Important project communications.
    -   Key decisions and approvals.
    -   Chronological site photos.

### 09 Research Info

A repository for non-project-specific research, industry standards, and reference materials.

> **Note:** Once a product or system is selected for the project, its specifications should be relocated to the relevant consultant's folder (e.g., a selected cladding spec moves to `03 Consultants/Facade engineering/`).

-   **Contents:**
    -   Industry best practices.
    -   Regulatory updates.
    -   Market research.
    -   Technical specifications for potential products.
