This is the NEW folder structural
Docsify allows max 2 level of folder structure

/README.md                 ← Homepage + Dashboard
/getting-started.md        ← Onboarding + how this wiki works
/policies/                 ← Internal policies (HSE, QA, IT, HR-lite)
/commercial/               ← Generic procurement, subcontractor prequal, progress claims
/processes/                ← SOPs: repeatable workflows
/procedures/               ← Work instructions (step-by-step “how”)
/procedures/buildertrend/
/procedures/fieldwire/
/procedures/googleservice/ ← google Search, Calendar, Contacts
/quality/                  ← ITPs, hold points, inspection guides (generic)
/safety/                   ← SWMS catalogue (generic), risk matrix, incident flow
/knowledge-base/           ← Glossary, standards,FAQs, playbooks, (no projects)
/templates/                ← Reusable forms, letters, registers

⸻

README.md placeholder requirement
	•	Every second-level folder MUST contain a README.md file as a placeholder.
	•	The content of this README.md should be a single heading with the folder name.

Example:

For a folder named `./commercial/finance/`, the README.md content should be:

```markdown
# Finance
```
	•	This ensures that Docsify can properly handle folder navigation and provides a consistent structure across all sections.
	•	The README.md serves as the default landing page when users navigate to that folder section.

⸻
Number the project folder when creating. e.g. "01 policies"