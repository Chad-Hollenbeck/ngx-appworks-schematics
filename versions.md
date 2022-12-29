## Version Log

### 5.0.0 -> 5.1.0
- Added Feature Folder scheamtic.

### 4.3.1 -> 5.0.0
- Removed all CRUD specific schematics
- Removed all module and routing steps for any remaining schematics
- Added Page schematic, refined component into a presentation component.
- Removed all HTTP specific schematics.
- Removed any references to "AppWorks" starter kit (mostly affected import paths);
- Updated folder structure to use the core/features/shared architecture instead of straight feature folders.

### 4.1.x -> 4.3.1
- Added boilerplate sorting mechanics to table and list views.
- User input is now forced into dasherize (kebab case) regardless of input format. This allows for `camelCase`, `snake_case`, or `included spaces`, formatting each to hyphen seperated format (camel-case, snake-case, included-spaces)
- Additional patch for version log update.

### 4.0.x -> 4.2.0
- Corrected parameter order for `applyAllUpdates` in list view. Minor version increment due to potentially distruptive behavior in established applications.

### 3.15.x -> 4.0.0
- Altered firebase service to utilize ngZone for new observable based query format
- Version increment to 4.0 since addition of ngZone is a breaking change for 3.15.x projects without correct Appworks base template version.

### 3.14.x -> 3.15.0
- Added subscription mgmt tools to list, manage, and default components.
- bugfixes to a handful of inconsitencies between table, form, list, and component schematics.

### 3.13.x -> 3.14.0
- Added route guards to top level routing configuration for auth checks
- Updated filtering and sorting for simpler firebase list components.
- Updated Readme with new scripts in package.json

### 3.12.x -> 3.13.0
- Removed all old spinner component stubs in form and table schematics
- Split List and Manage schematics into HTTP and Firebase specific schematics.
- Fixed hyphen replacement for multi-hyphen input to prevent semantic issues with Typescript Objects.
- Moved colspan attribute from H3 to <td> on table schematics.
- Added active status filter by default to table & list schematics.
- Added reactive forms error helper function to all form schematics.
- Added basic route guard with Firebase Guards for module level routes.

### 3.11.x -> 3.12.0
- Added NgBlockUI directive for spinner/loading controls on component list and manage controls.

### 3.10.x -> 3.11.0
- Fixed base component stynax for module registration
- Added exportable base component for exported widgets.

### 3.10.0 -> 3.10.1
- Fixed a handful of missing imports for manage and list views
- Fixed linter errors for components and routing.

### 3.9.x -> 3.10.0
- Patched typo with hyphenated module names on routing files
- Renamed IBaseModelVM to IBaseModel for continuity
- Renamed ngc:model to ngc:interface

### 3.7.x -> 3.9.0
- Added event emitters to form/manage features for propogated updates

### 3.6.x -> 3.7.0
- Split services into firebase and http variants.
- Split feature component into firebase and http variants;
- Fixed missing semicolon on table component.
- Fixed missing imports on table component.
- Replaced generic object with model defaults on form view.

### 3.5.x -> 3.6.0
- Constant export from models for simpler form building with default values
- Added filtes to list feature
- Updated default layout component name
- Updated service syntax for Angular 9
- Removed imports to prevent uneeded future patches on services and components.

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
