## Version Log

### 3.4.5 -> 3.5.0
- Hotfixes to missing wildcard options across various schematics
- Added Manage schematic to wrap form in default html w/ angular component logic
- Added List schematic to wrap table in default html w/ angular component logic
- Added missing imports to Service schematic for BaseCrudService and model type
- Added Feature schematic to auto generate module, model, service, list, and manage components.
  - Feature schematic can also be used to add full CRUD operations to an existing feature module.

---

### 3.4.0 -> 3.4.5
- Added style scss file back to component
- Bugfixes to logged issues

---

### 3.3.0 -> 3.4.0
- Added table component for simple list view generation
- Edited name of component form to include `.form.component` extension.

---

### 3.1.0 -> 3.3.0
- Changed replace tags to fit eslint & tslint commenting rules.
- Reverted merging the routes and feature modules together due to a conflict with import/export shared components.
- Changed class schematic to generate an interface vs class for better compliation speed and package size. A `useClass` flag is provided to retain the original class structure.

### Upgrade
Generate a new set of files to see the new replace tag format. Find/Replace these app-wide as needed. The module routing files have been re-instated, but splitting those files manually should be very straightforward.

---

### 3.0.5 -> 3.1.0
- New components for base class and base firestore service
- Refactored firebase service to extend base service
- Refactored class to extend base class
- Removed routes/routes.module.ts file. All operations merged with feature module.

#### Upgrade
Class and service upgrades should not cause too many issues post-update, but the names of a handful of packages have changes. See the current version's documentation for a list of suggested npm scripts.

---

### 3.0.1 -> 3.0.5
- Added replace tags for consistent file updates

#### Upgrade
Generate a test module, component, and service to see the new replace tag comments. Adding these throughout your application will re-enable automatic imports, routes, and declarations in module files.

---

### 2.2.0 -> 3.0.1
- Table and Form schematics have had most of the HTML removed to allow for greater re-use.

#### Upgrade
This is such a major rewrite that I will not be providing upgrade steps to 3.0.1. My apologies for any inconvenience.

---

### 2.2.0
- Initial setup with custom table and form component classes
