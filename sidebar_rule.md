Docsify Sidebar Rules

1. _sidebar.md file
	•	The sidebar is controlled by a file named _sidebar.md.
	•	Place one in the ./docs/ for a global sidebar.
⸻
2. Links and file extensions
	•	In _sidebar.md, you normally link to Markdown files (.md).
Example:

- [Quick Start](getting-started/quickstart.md)

	•	Docsify lets you omit .md in the link:

- [Quick Start](getting-started/quickstart)

Both will work.

	•	Best practice: omit .md for cleaner links, especially if you might later change file extensions or use routing.

⸻

3. README.md as default page
	•	Each folder can have a README.md, and Docsify treats it as the default page for that folder.
	•	If you link only to the folder, Docsify automatically loads README.md.

Example:

- [Getting Started](getting-started/)

→ will display getting-started/README.md.

	•	So: you don’t need to link README.md explicitly. Just point to the folder, and Docsify knows to show it.


⸻

4. Hierarchy (indentation)
	•	Use indentation in _sidebar.md to create nested menus.
  •	Root level heading (no link) is first level folder name 
	•	max level 2

Example:

- [Home](/)
- Policies // Root level heading (no link) is first level folder name 
  - [Company Policies](01-policies/company-policies)
  - [Safety Guidelines](01-policies/safety-guidelines)
- Commercial // Root level heading (no link) is first level folder name 
  - [Commercial Policies](02-commercial/commercial-policies)

