# How to Create Purchase Orders (POs) & Bills

**Document Information:**
- **Title:** How to Create Purchase Orders (POs) & Bills
- **Category:** Project Delivery - Subcontracting
- **Last Updated:** 2025-02-04
- **Tags:** pos, bills, buildertrend, purchase-orders
- **Version:** 2023.02.b

---

# Creating a Purchase Order (PO) on Buildertrend

*Date: 13.12.2023 | Revision: 2023.02.b*

## Basic Navigations in PO

### Step 1: Access Purchase Orders

- Navigate to the top search bar.
- Click on the dropdown menu labeled **"Financial"**.
- Select **"Purchase Orders"** from the list.
- ![create_po_1.png](/buildertrend/create_po_1.png)

### Step 2: Filter by Job

- On the sidebar, select the **Job** (e.g., **K3**, **M1**).
- Select **the job** / **All Jobs**  
- ![create_po_3.png](/buildertrend/create_po_3.png)

### Step 3: Filter by Subcontractor/Company

- Click on **"Filter"**.
- Under **"Performed By"**, enter the subcontractor or company name (e.g., **Alpha Quality Plumbing**, **Bunnings Warehouse**).
- ![create_po_2.png](/buildertrend/create_po_2.png)

---

# Creating a Purchase Order (PO) for Accounts - Monthly / Fortnightly

*Date: 13.12.2023 | Revision: 2023.02.b*

For accounts-related invoices, we need to create a separate Purchase Order (PO) on **Buildertrend** based on monthly or fortnightly statements. Accounts payment terms are typically **30 days end of the month** and are paid monthly at the end of the month. Labour hire subcontractors are typically **fortnightly** and paid in the middle and end of the month.

---

> **Work up to here**
> {.is-danger}

## Steps to Create a Purchase Order

### Step 4: Check for Existing PO

1. **Check whether a pre-existing PO for the month has been created**.
   - **If a pre-existing PO exists**, proceed to [Step 6](#step-6-create-a-bill).
   - **If no PO exists**, create a new PO:
     - Click **"+ Purchase Order"**.
     - Select **"Purchase Order"**.

### Step 5: Fill in Purchase Order Details

A pop-up screen will appear. Fill in the following details:

- **Purchase Order #:** Leave blank. Buildertrend will auto-generate this number.

- **Title:** Refer to the title naming conventions below.

#### Title Naming Conventions

- **Monthly Accounts:**

  ```
  SubcontractorName-MMMYY-JobCode
  ```

  - **Examples:**
    - `Bunnings-SEP23-H1`
    - `H&G-JAN24-M1`
    - `Kennards-JUL25-K3`

- **Fortnightly Accounts:**

  ```
  SubcontractorName-MMMaYY-JobCode
  ```

  - **Examples:**
    - `EmployMe-SEPa23-H1`
    - `EmployMe-SEPb23-H1`
    - `WorkForce-DECb23-K3`

#### Title Components

- **SubcontractorName:** Abbreviated name of the subcontractor (Refer to Subcontractors naming).
- **MMM:** First three letters of the month (e.g., JAN, FEB, MAR).
- **YY:** Last two digits of the year (e.g., 24, 25, 26).
- **a:** Alphabet ascending order for each week/fortnight (a, b, c, d, e).
- **JobCode (zz):** Job Code (e.g., K1, K2, H1, M1).

- **Assigned to:** Subcontractor Name (Same as **"Performed By"** in [Step 2](#step-2-filter-by-subcontractorcompany)).

- **Scheduled Completion:** Leave blank.

- **Scope of Work:** Leave blank. *Optional:* Add additional information if required.

- **Attachment:** Add all related invoices, credit notes, and statements received for the period.
  - *Highly recommended but not required if invoices are combined into one attachment.*

- **Internal Only:** Leave blank. *Optional:* Add additional information if required.

- **Variance:** Leave blank. Do not tick.

### Adding Line Items to the PO

Each individual invoice or credit note will have its own line item in the PO.

> **Note:** Credit notes are negative amounts, not positive.
> {.is-info}

- **Cost:** Click **"+ Item"** to add.

For each line item, fill in:

**A. Title:** Invoice number and date.

- *Example:* `inv1234 - 15/6/24`

**B. Cost Type:** Leave as **None**.

**C. Unit Cost:** Unit cost or rate as shown on the invoice (per item/m²/m³/lm, GST exclusive).

**D. Quantity:** Quantity as shown on the invoice; use **1** if lump sum.

**E. Unit:** Leave blank.

**F. Builder Cost:** Automatically calculated as **C x D**.
- *Confirm that the total matches the invoice.*

**G. Cost Code:** Select the appropriate cost code.
- *Note: If unsure, refer to previous jobs or ask for confirmation.*

**H. Description:** Leave blank. *Optional:* Add additional information if required.

**I. Internal Notes:** Use if needed for special cases.
- *Internal notes are visible to Saiyu users only.*

**J. Repeat** steps A–I for each invoice or credit note until the total amount equals the monthly statement total amount.

**K. Totals:** Ensure the total matches the **Total Accounts Statement** in $ (GST Exclusive).

- **Custom Attachment:** Leave blank.

- Click **"Save"**.

### Step 6: Create a Bill

- The **Purchase Order #** will be auto-filled.
- Create a new bill by clicking **"Create Bill"**.
  - **If a pre-existing PO exists**, click on the existing bill and apply the new invoices at **100%** or **Quantity 1**.

### Step 7: Fill in Bill Details

A pop-up will appear showing the amount inputted to date.

For accounts, we will only have **one bill per PO**.

- **Enter the Bill Amount** (GST exclusive) and click **"Save"**. The **Bills** window will open.

Fill in the following:

**A. Bill #:** Auto-generated. Do not modify.

**B. Title:** Auto-generated.

```
Xx-1234-POTitle-1
```

- **Xx:** Project Code / Job Code.
- **1234:** PO number.
- **POTitle:** Title of the Purchase Order.
- **1:** Auto-generated bill number in ascending order.

**C. Date Paid:** Leave blank.

**D. Invoice Date:** Last day of the month.

**E. Due Date:** [Specify the due date as per payment terms.]

**F. Cost:** Auto-generated. Do not modify.

**G. Xero:** Tick **"Sent to Xero"** only when it's **marked ready for payment** and all information is correct.

**H. Docs/Receipts:** Add the corresponding invoice as an attachment.

**I. Messaging:** Leave blank. *Optional:* Add additional information if required.

**J. Custom Fields:** Leave blank for Main Subcontractors.

---

## Additional Guidelines

### Quality Control

- Always verify that totals match between invoices and POs
- Ensure all required attachments are included
- Double-check cost codes for accuracy
- Confirm subcontractor details are correct

### Common Issues

- **Mismatched totals:** Recalculate line items and verify invoice amounts
- **Missing attachments:** Ensure all supporting documents are uploaded
- **Incorrect cost codes:** Refer to the current cost code list or consult with management

### Best Practices

- Create POs promptly upon receiving invoices
- Maintain consistent naming conventions
- Keep detailed records of all transactions
- Regular reconciliation with accounting systems