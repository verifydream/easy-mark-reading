## ADDED Requirements

### Requirement: Split-view layout
The system SHALL display a default split-view layout with editor panel on the left and preview panel on the right.

#### Scenario: Default split-view display
- **WHEN** user opens the application
- **THEN** system displays split-view with editor (40%) and preview (60%) panels

#### Scenario: Sync scrolling between panels
- **WHEN** user scrolls in either editor or preview panel
- **THEN** system scrolls the other panel proportionally to maintain content alignment

### Requirement: Layout mode switching
The system SHALL allow users to switch between split-view, editor-only, and preview-only modes.

#### Scenario: Switch to preview-only mode
- **WHEN** user clicks preview-only button
- **THEN** system hides editor panel and expands preview to full width

#### Scenario: Switch to editor-only mode
- **WHEN** user clicks editor-only button
- **THEN** system hides preview panel and expands editor to full width

#### Scenario: Return to split-view
- **WHEN** user clicks split-view button
- **THEN** system displays both panels in default proportions

### Requirement: Layout transitions
The system SHALL animate transitions between layout modes smoothly.

#### Scenario: Smooth panel resize animation
- **WHEN** user switches between layout modes
- **THEN** system animates the panel width changes over 300ms with easing function

### Requirement: Resizable split panels
The system SHALL allow users to adjust the split ratio by dragging the divider.

#### Scenario: Drag divider to resize
- **WHEN** user drags the center divider
- **THEN** system updates panel widths in real-time based on cursor position

#### Scenario: Minimum width constraints
- **WHEN** user drags divider beyond minimum width (200px)
- **THEN** system stops resizing at the minimum threshold

### Requirement: Panel header controls
The system SHALL display action buttons in each panel header.

#### Scenario: Editor panel header
- **WHEN** viewing editor panel header
- **THEN** system displays buttons for: save, import, export, and clear

#### Scenario: Preview panel header
- **WHEN** viewing preview panel header
- **THEN** system displays buttons for: copy HTML, print, and toggle full screen
