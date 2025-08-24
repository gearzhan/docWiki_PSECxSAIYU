# Revision Description Format and Management
---
<p style="text-align:right">Date: 24.08.2025 | Revision: 2025.08.a</p>


## For PSEC Issued Drawings

PSEC-issued drawings follow a structured three-part revision system to ensure clarity and consistency across all project stages. The format is: `[Purpose].Rev[A-Z].[#]`

### 1. Purpose (`DA`, `CC`, `FC`, `CDC`)

The first part of the revision code identifies the **purpose** of the drawing set. This ensures that the context of the revision is immediately clear. For examples:
-   **DA/CDC**: Development Application
-   **CC**: Construction Certificate
-   **FC**: For Construction
-   **MU**: Markups

!>More discussion is needed to reach a standard.

### 2. Major Revision (`.RevA`, `.RevB`, ...)

The second part indicates the **major revision**, denoted by an alphabetical character (A, B, C, etc.).

-   A major revision is issued when there are significant design changes or updates that affect the **entire drawing** set.
-   The major revision letter **must remain consistent** across all drawings in the set for that release. It should not be updated for a single page.

### 3. Minor Revision (`.1`, `.2`, `.3`, ...)

The third part represents a **minor revision**, denoted by a number.

-   Minor revisions are for small changes, updates, or corrections within a major revision series.
-   This number increments with each minor update.

### Example

-   `DA.RevA.1`: The first issue of the Development Application set.
-   `DA.RevA.2`: A minor update to the DA set.
-   `DA.RevB.1`: A major update to the DA set, superseding RevA.

### Title Block Timestamp

To support this revision system and ensure accurate tracking, the **timestamp** of when the drawing was printed or generated **must be clearly visible** in the title block of every drawing sheet.


## For any other document

Revisions are recorded using the following format:

```
Rev.YYYY.MM.Alpha
```
**This rule applies to ALL documents and software platform.**

### Components
- **YYYY**: Year of the **Major Update**.  
- **MM**: Month of the **Major Update** (two digits).  
- **Alpha**: Alphabetic counter (`a`, `b`, `c` …) for **Minor Updates**.  

### Rules
1. **Major Update**  
   - Represents a significant change (e.g., legal review, design approval, or major content restructuring).  
   - The **Year (YYYY)** and **Month (MM)** are updated to reflect when the change occurs.  
   - The **Alpha** counter resets to `a`.  

2. **Minor Update**  
   - Represents small changes (e.g., spelling corrections, formatting, or clarifications).  
   - The **Year (YYYY)** and **Month (MM)** remain the same.  
   - The **Alpha** counter increments sequentially (`a → b → c`).  

### Example Revision Log

| Action                       | Date of Action | Revision      |
| ---------------------------- | -------------- | ------------- |
| Initial Issue                | 15 Feb 2023    | Rev.2023.02.a |
| Minor update – spell check   | 24 Nov 2024    | Rev.2023.02.b |
| Major update – legal review  | 03 Jan 2025    | Rev.2025.01.a |


---

Page Title: Revision Management | Last Update: 25.08.2025 | Revision: 2025.08.a | Status: Published
