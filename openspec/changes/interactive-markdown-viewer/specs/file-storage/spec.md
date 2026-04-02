## ADDED Requirements

### Requirement: LocalStorage document persistence
The system SHALL save markdown documents to browser LocalStorage with metadata including title, content, and timestamp.

#### Scenario: Auto-save on content change
- **WHEN** user makes changes to markdown content
- **THEN** system automatically saves to LocalStorage after a debounce period

#### Scenario: Manual save with custom title
- **WHEN** user clicks save button and enters a title
- **THEN** system saves document with provided title and current timestamp

### Requirement: Document history retrieval
The system SHALL retrieve and display saved documents from LocalStorage in a history list.

#### Scenario: Load history list
- **WHEN** user opens the application
- **THEN** system displays a list of previously saved documents sorted by timestamp (newest first)

#### Scenario: Load document from history
- **WHEN** user clicks on a document in the history list
- **THEN** system loads that document's content into the editor

### Requirement: Document deletion
The system SHALL allow users to delete saved documents from history.

#### Scenario: Delete single document
- **WHEN** user clicks delete button on a history item
- **THEN** system removes that document from LocalStorage and updates the history list

### Requirement: Storage quota management
The system SHALL handle LocalStorage quota limits gracefully.

#### Scenario: Storage quota exceeded
- **WHEN** LocalStorage quota is exceeded
- **THEN** system displays an error message and suggests deleting old documents

### Requirement: Document export
The system SHALL allow users to export saved documents as .md files.

#### Scenario: Export document
- **WHEN** user clicks export button on a history item
- **THEN** system downloads the document as a .md file with the document title as filename
