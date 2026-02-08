# Landing Page

## Purpose

Presents an overview of the Pompidou autonomous development system, introducing the five-phase Holy Grail framework and the tool catalogue.

---

## Requirements

### Requirement: Holy Grail Framework Overview

The landing page SHALL display the five phases of the Holy Grail framework with visual distinction.

#### Scenario: Phase list rendering
- **WHEN** the landing page loads
- **THEN** all five phases are displayed in order
- **AND** each phase shows its number, name, and description
- **AND** each phase has a unique color-coded border

#### Scenario: Phase descriptions
- **WHEN** viewing the phase list
- **THEN** "Spec It" describes defining what to build
- **AND** "Task It" describes breaking into tasks
- **AND** "Build It" describes multi-agent execution
- **AND** "Verify It" describes CI validation
- **AND** "Learn It" describes capturing learnings

---

### Requirement: Catalogue Introduction

The landing page SHALL introduce the tool catalogue and its purpose.

#### Scenario: About section rendering
- **WHEN** the landing page loads
- **THEN** an "About This Catalogue" section is visible
- **AND** it mentions 80+ evaluated tools
- **AND** it describes assessment dimensions (integration, maturity, fit)
- **AND** it invites users to explore the catalogue

---

### Requirement: Page Header

The landing page SHALL display the Pompidou branding and tagline.

#### Scenario: Header rendering
- **WHEN** the landing page loads
- **THEN** "Pompidou" heading is displayed prominently
- **AND** tagline "The Holy Grail of Autonomous AI Development" is visible
- **AND** typography is clear and readable

---

### Requirement: Responsive Layout

The landing page SHALL adapt to different screen sizes.

#### Scenario: Desktop layout
- **WHEN** viewing on desktop (>640px)
- **THEN** content is centered with max-width constraint
- **AND** padding is applied for comfortable reading

#### Scenario: Mobile layout
- **WHEN** viewing on mobile (<640px)
- **THEN** content width adapts to viewport
- **AND** padding is reduced for space efficiency
- **AND** text remains readable
