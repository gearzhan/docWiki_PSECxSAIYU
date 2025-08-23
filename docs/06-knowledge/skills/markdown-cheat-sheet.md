---
Document Type: Knowledge Base
Title: Markdown Cheat Sheet for Wiki.js
Category: Documentation Skills
Last Updated: 2025-01-20
Version: 1.0
Author: SAIYU Team
---

# Markdown Cheat Sheet for Wiki.js

This comprehensive cheat sheet covers Markdown formatting specifically for Wiki.js, including basic formatting, advanced features, and platform-specific shortcuts.

## Basic Formatting

### Text Styling

#### Bold Text
- **Usage**: `**bold text**` or `__bold text__`
- **Shortcut**: Ctrl/Cmd + B
- **Example**: **This text is bold**

#### Italic Text
- **Usage**: `*italic text*` or `_italic text_`
- **Shortcut**: Ctrl/Cmd + I
- **Example**: *This text is italic*

#### Strikethrough
- **Usage**: `~~strikethrough text~~`
- **Shortcut**: Ctrl/Cmd + Shift + X
- **Example**: ~~This text is crossed out~~

#### Combined Formatting
- **Bold and Italic**: `***bold and italic***`
- **Example**: ***This text is both bold and italic***

### Headers

#### Header Levels
```markdown
# Header 1 (H1)
## Header 2 (H2)
### Header 3 (H3)
#### Header 4 (H4)
##### Header 5 (H5)
###### Header 6 (H6)
```

#### Header Shortcuts
- **H1**: Ctrl/Cmd + 1
- **H2**: Ctrl/Cmd + 2
- **H3**: Ctrl/Cmd + 3
- **H4**: Ctrl/Cmd + 4
- **H5**: Ctrl/Cmd + 5
- **H6**: Ctrl/Cmd + 6

### Text Decoration

#### Underline
- **Usage**: `<u>underlined text</u>`
- **Shortcut**: Ctrl/Cmd + U
- **Example**: <u>This text is underlined</u>

#### Subscript
- **Usage**: `H<sub>2</sub>O`
- **Example**: H<sub>2</sub>O (water formula)

#### Superscript
- **Usage**: `E=mc<sup>2</sup>`
- **Example**: E=mc<sup>2</sup> (Einstein's equation)

#### Highlights
- **Usage**: `==highlighted text==`
- **Example**: ==This text is highlighted==

## Lists

### Unordered Lists
```markdown
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3
```

**Result:**
- Item 1
- Item 2
  - Nested item 2.1
  - Nested item 2.2
- Item 3

### Ordered Lists
```markdown
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item
```

**Result:**
1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists
```markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task
```

**Result:**
- [x] Completed task
- [ ] Incomplete task
- [ ] Another incomplete task

## Links and References

### Basic Links
```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
```

### Internal Wiki Links
```markdown
[Page Title](/page-path)
[Section Link](/page-path#section-heading)
```

### Reference Links
```markdown
[Link text][reference-id]
[Another link][reference-id]

[reference-id]: https://example.com "Optional title"
```

### Automatic Links
```markdown
<https://example.com>
<email@example.com>
```

## Images

### Basic Image Syntax
```markdown
![Alt text](image-url)
![Alt text](image-url "Optional title")
```

### Image with Link
```markdown
[![Alt text](image-url)](link-url)
```

### Reference Images
```markdown
![Alt text][image-reference]

[image-reference]: image-url "Optional title"
```

## Code

### Inline Code
```markdown
Use `inline code` for short code snippets.
```
**Result:** Use `inline code` for short code snippets.

### Code Blocks

#### Basic Code Block
```markdown
```
code block content
```
```

#### Syntax Highlighted Code Block
```markdown
```javascript
function hello() {
    console.log("Hello, World!");
}
```
```

#### Supported Languages
- `javascript` / `js`
- `python` / `py`
- `html`
- `css`
- `bash` / `shell`
- `sql`
- `json`
- `yaml` / `yml`
- `xml`
- `markdown` / `md`

## Tables

### Basic Table
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Result:**
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

### Table Alignment
```markdown
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |
```

**Result:**
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| Text         | Text           | Text          |

## Blockquotes

### Basic Blockquotes
```markdown
> This is a blockquote.
> It can span multiple lines.
```

**Result:**
> This is a blockquote.
> It can span multiple lines.

### Nested Blockquotes
```markdown
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.
```

**Result:**
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

### Blockquotes with Other Elements
```markdown
> ## Header in blockquote
>
> - List item 1
> - List item 2
>
> **Bold text** and *italic text* work too.
```

**Result:**
> ## Header in blockquote
>
> - List item 1
> - List item 2
>
> **Bold text** and *italic text* work too.

## Horizontal Rules

### Creating Horizontal Rules
```markdown
---
***
___
```

**All create:**

---

## Advanced Features

### Footnotes
```markdown
This text has a footnote[^1].

[^1]: This is the footnote content.
```

### Definition Lists
```markdown
Term 1
:   Definition 1

Term 2
:   Definition 2a
:   Definition 2b
```

### Abbreviations
```markdown
*[HTML]: Hyper Text Markup Language
*[W3C]: World Wide Web Consortium

The HTML specification is maintained by the W3C.
```

## Wiki.js Specific Features

### Page Metadata
```yaml
---
title: Page Title
description: Page description
published: true
date: 2025-01-20T10:00:00.000Z
tags:
  - tag1
  - tag2
editor: markdown
dateCreated: 2025-01-20T10:00:00.000Z
---
```

### Internal Page Links
```markdown
[Link to another page](/path/to/page)
[Link to section](/path/to/page#section-heading)
[Link with custom text](/path/to/page "Custom link title")
```

### Asset References
```markdown
![Image](/assets/images/example.png)
[Download PDF](/assets/documents/example.pdf)
```

### Tabs
```markdown
=== "Tab 1"
    Content for tab 1

=== "Tab 2"
    Content for tab 2

=== "Tab 3"
    Content for tab 3
```

### Admonitions
```markdown
!!! note
    This is a note admonition.

!!! warning
    This is a warning admonition.

!!! danger
    This is a danger admonition.

!!! info
    This is an info admonition.

!!! tip
    This is a tip admonition.
```

## Keyboard Shortcuts

### Text Formatting
- **Bold**: Ctrl/Cmd + B
- **Italic**: Ctrl/Cmd + I
- **Underline**: Ctrl/Cmd + U
- **Strikethrough**: Ctrl/Cmd + Shift + X
- **Inline Code**: Ctrl/Cmd + `

### Headers
- **H1**: Ctrl/Cmd + 1
- **H2**: Ctrl/Cmd + 2
- **H3**: Ctrl/Cmd + 3
- **H4**: Ctrl/Cmd + 4
- **H5**: Ctrl/Cmd + 5
- **H6**: Ctrl/Cmd + 6

### Lists
- **Unordered List**: Ctrl/Cmd + Shift + 8
- **Ordered List**: Ctrl/Cmd + Shift + 7
- **Task List**: Ctrl/Cmd + Shift + 9

### Other Elements
- **Link**: Ctrl/Cmd + K
- **Image**: Ctrl/Cmd + Shift + I
- **Code Block**: Ctrl/Cmd + Shift + C
- **Blockquote**: Ctrl/Cmd + Shift + >
- **Horizontal Rule**: Ctrl/Cmd + Shift + -

### Editor Actions
- **Save**: Ctrl/Cmd + S
- **Preview**: Ctrl/Cmd + Shift + P
- **Find**: Ctrl/Cmd + F
- **Replace**: Ctrl/Cmd + H
- **Undo**: Ctrl/Cmd + Z
- **Redo**: Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z

## Best Practices

### Document Structure
1. **Use Descriptive Headers**: Create a clear hierarchy with meaningful headers
2. **Consistent Formatting**: Maintain consistent formatting throughout the document
3. **Logical Flow**: Organize content in a logical, easy-to-follow structure
4. **Table of Contents**: Use headers to create an automatic table of contents

### Writing Style
1. **Clear and Concise**: Write clear, concise content
2. **Active Voice**: Use active voice when possible
3. **Consistent Terminology**: Use consistent terminology throughout
4. **Proper Grammar**: Maintain proper grammar and spelling

### Technical Documentation
1. **Code Examples**: Provide clear, working code examples
2. **Step-by-Step Instructions**: Break complex procedures into steps
3. **Screenshots**: Include relevant screenshots when helpful
4. **Cross-References**: Link to related pages and sections

### Accessibility
1. **Alt Text**: Always provide alt text for images
2. **Descriptive Links**: Use descriptive link text
3. **Header Hierarchy**: Maintain proper header hierarchy
4. **Color Independence**: Don't rely solely on color to convey information

## Common Mistakes to Avoid

### Formatting Issues
- **Missing Spaces**: Always include spaces after `#` for headers
- **Inconsistent Lists**: Use consistent bullet points or numbering
- **Broken Links**: Regularly check and update links
- **Missing Alt Text**: Always provide alt text for images

### Content Issues
- **Overly Long Lines**: Keep lines reasonably short for readability
- **Inconsistent Terminology**: Use consistent terms throughout
- **Missing Context**: Provide sufficient context for all content
- **Outdated Information**: Regularly review and update content

### Technical Issues
- **Incorrect Syntax**: Double-check Markdown syntax
- **Unsupported Features**: Verify feature support in Wiki.js
- **Encoding Issues**: Use UTF-8 encoding for special characters
- **File Path Errors**: Verify all file paths and references

## Troubleshooting

### Common Rendering Issues

#### Lists Not Rendering
```markdown
<!-- Incorrect -->
-Item 1
-Item 2

<!-- Correct -->
- Item 1
- Item 2
```

#### Headers Not Working
```markdown
<!-- Incorrect -->
#Header 1
##Header 2

<!-- Correct -->
# Header 1
## Header 2
```

#### Code Blocks Not Highlighting
```markdown
<!-- Incorrect -->
```
code here
```

<!-- Correct -->
```javascript
code here
```
```

#### Links Not Working
```markdown
<!-- Incorrect -->
[Link text] (https://example.com)

<!-- Correct -->
[Link text](https://example.com)
```

### Performance Considerations

#### Large Documents
- Break large documents into smaller, focused pages
- Use internal links to connect related content
- Consider using page hierarchies for organization
- Optimize images before uploading

#### Image Optimization
- Use appropriate image formats (JPEG for photos, PNG for graphics)
- Compress images to reduce file size
- Use responsive image techniques when possible
- Consider using thumbnails for large images

## Resources and References

### Official Documentation
- [Wiki.js Documentation](https://docs.requarks.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [CommonMark Specification](https://commonmark.org/)

### Online Tools
- [Markdown Editor](https://stackedit.io/)
- [Table Generator](https://www.tablesgenerator.com/markdown_tables)
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

### Browser Extensions
- Markdown Preview Plus (Chrome)
- Markdown Viewer (Firefox)
- Markdown Editor (Various browsers)

---

*This cheat sheet covers the most commonly used Markdown features in Wiki.js. For advanced features and platform-specific extensions, refer to the official Wiki.js documentation.*