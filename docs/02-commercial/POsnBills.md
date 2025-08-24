# Financial Workflow: POs, Bills, and Invoices

---
<p style="text-align:right">Date: 20.08.2025 | Revision: 2023.02.d</p>

This document outlines the comprehensive workflow for managing Purchase Orders (POs), Bills, and Invoices in Buildertrend. Adhering to this process ensures financial control, accurate job costing, and timely payments.


## 1. Core Concepts: The PO-Bill-Invoice Relationship

Understanding the distinction between these three components is critical for maintaining financial integrity.

| Component | Purpose | Key Rules |
| :--- | :--- | :--- |
| **Purchase Order (PO)** | Defines the **scope and approved budget** for work or materials. | - Authorizes work to begin.<br>- Once approved, its value appears as a **Committed Cost** in the job budget. |
| **Bill** | Records a **debt owed** to a supplier or subcontractor for services/goods rendered. | - **Must** be linked to a PO.<br>- Cannot exist independently.<br>- Total bills cannot exceed the PO amount. |
| **Invoice** | A **request for payment** from a supplier or subcontractor. | - Triggers the verification and approval process.<br>- Payment is based on **approved** invoices, not just submitted ones. |

> For detailed procedures on invoice handling, refer to the [Invoice Management Workflow](/04-procedures/buildertrend/BT-Workflow-Invoices-Bills-POs).



## 2. The Workflow: From Purchase Order to Payment

### Step 1: Create the Purchase Order (PO)

A PO is the foundation of any expenditure. The approach to creating a PO depends on the nature of the subcontractor or supplier.

#### PO Creation Strategy

| Subcontractor/Supplier Type | Policy | Rationale |
| :--- | :--- | :--- |
| **Main Subcontractors** | **One PO per job.** | Consolidates all work, including variations, under a single order for streamlined tracking. |
| **Accounts & Labour** | **One PO per billing cycle** (e.g., monthly). | Aligns with their recurring payment schedules. For labor, itemize costs weekly within the monthly PO. |
| **One-Off Trades** | **One PO per contractor.** | Ensures even small, specialized jobs are properly documented and tracked. |
| **Direct Card/Cash Payments** | A PO may still be required. | For one-off purchases (e.g., materials from Bunnings) or fees. Consult with Account Manager **Sunny** for cash payments. |

> **Important:** If a company is not on the official [Accounts & Labour List](/11-assets/saiyu_AccountsList), they are treated as a **Main Subcontractor** or **One-Off Trade**. For new subcontractors, always consult with the Director (**Gear**) before proceeding.
> {.is-warning}

### Step 2: Receive and Upload the Invoice

When an invoice is received from a subcontractor or supplier:

1.  **Identify the corresponding PO** in Buildertrend.
2.  **Create a Bill** against that PO. The bill amount should match the invoice amount.
3.  **Upload the invoice** and attach it to the newly created Bill.

### Step 3: Approve the Invoice for Payment

An uploaded invoice is not automatically ready for payment. It must undergo a rigorous approval process.

**Approval Checklist:**
- [ ] **Verify Accuracy:** Is the amount correct?
- [ ] **Prevent Duplicates:** Has this invoice already been processed?
- [ ] **Confirm Legitimacy:** Is the work or material documented and justified?
- [ ] **Check Quality:** Was the work completed to standard, without defects?
- [ ] **Cross-Reference:** Does it align with the contract terms and PO?

Once all checks are complete, the Project Manager or Contract Administrator must mark the Bill as **"Ready for Payment"** in Buildertrend.

> A Bill can be created without being marked "Ready for Payment." This signifies that the invoice has been logged but is still pending final review (e.g., waiting for a signed delivery docket).
> {.is-info}



## 3. Summary of Key Principles

- **No PO, No Work:** A PO must exist before any cost is committed.
- **Bills Follow POs:** All bills must be tied to a pre-existing PO.
- **Invoices Trigger Action:** Invoices are claims that require verification and approval before payment.
- **Documentation is Key:** Maintain meticulous records of all POs, Bills, and Invoices for auditing and financial accountability.
- **When in Doubt, Ask:** For any uncertainties, consult with Director **Gear** or Account Manager **Sunny**.


## Work FLow
<p style="text-align:right">Date: 20.08.2025 | Revision: 2024.08.d</p>

```mermaid
sequenceDiagram

Contractor ->> Sub-Contractor: Award Sub-Contract
note left of Contractor: Create a PO
note right of Sub-Contractor: Commence Work

Loop till sub-contract is completed
  Sub-Contractor -->> Contractor: 1. Submit progress claim.
  Contractor ->> Contractor: Review, if no error proceed to 2, otherwise back to 1.
  note right of Sub-Contractor: Continue Work
  Sub-Contractor -->> Contractor: 2. Issue Invoice according to Sub-Contract
  note left of Contractor: Create a Bill
  Contractor ->> Sub-Contractor: Make payment.
end
  note right of Sub-Contractor: Complete Work
  Sub-Contractor -->> Contractor: 3. Submit final progress claim.
  Contractor ->> Contractor: Review, check defects and retention.
  Contractor ->> Sub-Contractor: Release retention accoding to Subcontract.
  note over Contractor,Sub-Contractor: Sub-Contract is closed.

```

---

Page Title: POs & Bills | Last Update: 20.11.2024 | Revision: 2023.02.c | Status: Published
