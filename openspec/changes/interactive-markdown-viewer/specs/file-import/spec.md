## ADDED Requirements

### Requirement: File upload functionality
The system SHALL allow users to import markdown files (.md, .markdown) from their local system.

#### Scenario: Click to upload
- **WHEN** user clicks the import button in the editor header
- **THEN** system opens file picker dialog filtered for .md and .markdown files

#### Scenario: Drag and drop upload
- **WHEN** user drags a .md file over the editor panel
- **THEN** system highlights the drop zone and loads the file content on drop

### Requirement: File content parsing
The system SHALL read and parse the uploaded markdown file content.

#### Scenario: Load file content
- **WHEN** user selects a markdown file
- **THEN** system reads the file content and populates the editor panel

#### Scenario: Set document title from filename
- **WHEN** user imports a file named "example.md"
- **THEN** system sets the document title to "example" (without extension)

### Requirement: Invalid file handling
The system SHALL validate file types before import.

#### Scenario: Non-markdown file rejection
- **WHEN** user attempts to import a file without .md or .markdown extension
- **THEN** system displays error message "Please select a valid markdown file"

#### Scenario: Large file warning
- **WHEN** user attempts to import a file larger than 1MB
- **THEN** system displays warning message but allows import

### Requirement: Multiple file import
The system SHALL support importing multiple files sequentially.

#### Scenario: Import multiple files
- **WHEN** user selects multiple .md files
- **THEN** system loads the first file and adds others to history list

### Requirement: File encoding handling
The system SHALL handle different text encodings when reading files.

#### Scenario: UTF-8 file import
- **WHEN** user imports a UTF-8 encoded markdown file
- **THEN** system correctly displays all characters including emojis and special characters

#### Scenario: Fallback encoding detection
- **WHEN** system cannot determine file encoding
- **THEN** system attempts UTF-8, then Latin-1 fallback
