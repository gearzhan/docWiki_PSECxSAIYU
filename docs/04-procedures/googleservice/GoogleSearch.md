# Google Search Operator 101

*(Web Search, Google Drive, Gmail, and Google Cloud Search — concise, practical reference.)*

## 1. Google (web) Search — core operators

| **Operator**                                                 | **What it does**                    | **Example**                     |
| ------------------------------------------------------------ | ----------------------------------- | ------------------------------- |
| "exact phrase"                                               | Match the exact wording             | "construction certificate"      |
| -term                                                        | Exclude a term                      | fire door -timber               |
| OR                                                           | Either term can match               | vesda OR aspirating             |
| site:                                                        | Limit to a domain                   | site:planningportal.nsw.gov.au  |
| filetype:                                                    | Restrict to a file type             | filetype:pdf facade test report |
| before: / after:                                             | Filter by indexed date (YYYY-MM-DD) | after:2024-01-01 AS2047         |

> Tip: you can set most of these via* ***Advanced Search\*** *UI if you prefer.

## 2. Gmail — search operators you’ll actually use

| **Operator**                                           | **What it does**           | **Example**             |
| ------------------------------------------------------ | -------------------------- | ----------------------- |
| from: / to: / cc:                                      | Address filters            | from:pca@example.com    |
| subject:                                               | Subject contains           | subject:"Section J"     |
| label: / in:                                           | Label/system folder        | in:spam, label:Invoices |
| is:                                                    | State                      | is:unread, is:starred   |
| has:attachment / filename:                             | Attachment filters         | filename:dwg            |
| larger: / smaller:                                     | Size filter (e.g., 2M)     | larger:5M               |
| before: / after:                                       | Date (YYYY/MM/DD accepted) | after:2025/07/01        |
| older_than: / newer_than:                              | Relative date (d, m, y)    | older_than:6m           |
| category:                                              | Tabs                       | category:promotions     |
| has:userlabels / has:nouserlabels                      | Labeled vs not             | has:nouserlabels        |

**Combine freely, e.g.:**
`from:supplier.com filename:pdf newer_than:30d -in:spam`



## 3. Google Drive — quick filters (UI + typed)

| **Operator**                                                 | **What it does**               | **Example**                  |
| ------------------------------------------------------------ | ------------------------------ | ---------------------------- |
| type:                                                        | File type/MIME class           | type:pdf, type:spreadsheets  |
| owner:                                                       | File owner                     | owner:me                     |
| sharedwith:                                                  | People the file is shared with | sharedwith:maria@company.com |
| is:starred / is:trashed                                      | Starred or in trash            | is:starred                   |
| before: / after:                                             | Modified date                  | before:2024-12-31            |
| Quotes ""                                                    | Exact title/text matches       | "CC1 certificate"            |


> Note: You can also click filter chips in the search box: Type, People, Modified, etc.

> Developer view (for API and exact fields): filter on mimeType, owners, modifiedTime, name contains, starred, trashed, etc. UI search maps to these under the hood.



## 4. Google Cloud Search (Workspace) — org-wide search

| **Operator**                                                 | **What it does** | **Example**                             |
| ------------------------------------------------------------ | ---------------- | --------------------------------------- |
| owner:                                                       | Content owner    | owner:alex@company.com                  |
| type:                                                        | Content type     | type:document (Docs), type:presentation |
| after: / before:                                             | Date filters     | after:2025-07-01                        |


> Note: Schema-level notes for admins/devs: some operators (e.g., source, site) are *reserved* in Cloud Search schemas and behave differently than in consumer Search.



## Fast, practical recipes

- **NSW regs PDFs from the last year:**

  site:legislation.nsw.gov.au filetype:pdf after:2024-08-01 "Building Code" 

- **Gmail: invoices this month ≥5 MB:**

  subject:invoice has:attachment larger:5M newer_than:30d 

- **Drive: your starred DWGs:**

  type:dwg is:starred owner:me *(or use filter chips Type → Autodesk/AutoCAD + Starred)* 

- **Cloud Search: presentations by a colleague since July:**

  owner:kim@company.com type:presentation after:2025-07-01 

## Pro tips

1. **Group with parentheses**: (vesda OR aspirating) smoke to keep logic tidy. *(Works reliably on Web Search; Drive UI logic is more limited—prefer chips there.)*  
2. **Stick to ISO dates**: YYYY-MM-DD avoids ambiguity across products. 
3. **Prefer UI filters in Drive** for people/type/date; they’re faster and less error-prone than remembering syntax. 
4. **Know what’s “undocumented”**: some web operators come and go; if a query looks off, remove the fancy operators and re-add one by one. 

