# Markdown 101: A Quick Reference Guide

Markdown is a lightweight markup language for creating formatted text using a plain-text editor. It's simple, portable, and widely supported, making it an ideal choice for documentation. This guide provides a quick reference to the most common Markdown syntax.

## Basic Syntax

| Element          | Syntax                               | Example                               |
| ---------------- | ------------------------------------ | ------------------------------------- |
| **Headings**     | `# H1` `## H2` `### H3`               | Renders as different heading levels.  |
| **Bold**         | `**bold text**` or `__bold text__`   | **bold text**                         |
| **Italic**       | `*italic text*` or `_italic text_`   | *italic text*                         |
| **Blockquote**   | `> quoted text`                      | > quoted text                         |
| **Ordered List** | `1. First item` `2. Second item`     | 1. First item<br>2. Second item       |
| **Unordered List**| `- An item` `* An item` `+ An item` | • An item<br>• An item<br>• An item |
| **Inline Code**  | `` `code` ``                         | `code`                                |
| **Link**         | `[title](https://www.example.com)`   | [title](https://www.example.com)      |
| **Image**        | `![alt text](image.jpg)`              | Renders an image with alt text.       |

## Advanced Syntax

### Code Blocks

To create a fenced code block, wrap your code in triple backticks (``````). You can also specify the language for syntax highlighting.

``````javascript
function greet() {
  console.log("Hello, world!");
}
``````

### Tables

Create tables using pipes (`|`) to define columns and hyphens (`-`) for the header separator. Use colons (`:`) to align columns.

| Syntax      | Description |
| :---------- | :---------: |
| `|`         |   Divider   |
| `:---`      | Left-align  |
| `:--:`      | Center-align|
| `---:`      | Right-align |

**Example:**
```markdown
| Item      | Quantity |
| :-------- | -------: |
| Apples    |        3 |
| Oranges   |        5 |
```

### Task Lists

Create task lists using hyphens followed by square brackets. Mark a task as complete by adding an `x` inside the brackets.

- [x] Completed task
- [ ] Incomplete task

## Best Practices for Documentation

*   **Structure with Headings**: Use headings to create a clear hierarchy.
*   **Use Lists**: Organize information with bulleted or numbered lists.
*   **Be Consistent**: Stick to a consistent style for syntax (e.g., use `*` or `_` for emphasis, but not both).
*   **Keep Lines Short**: For readability in raw text, consider wrapping lines at 80 characters.
*   **Preview Your Work**: Always check the rendered output to ensure formatting is correct.

For more detailed information, refer to the [Markdown Guide](https://www.markdownguide.org).