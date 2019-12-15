# NGC Schematics

A set of personal Angular schematics I created to speed up my hobby and professional development.

## Schematics List
All of my feature folders are prefixed with `+` which breaks the default angular cli file generation for a multitude of schematics. Most of my schematics were created with this issue in mind.

### ngc-class
Creates a class file with the `{class-name}.module.ts` naming convention in a `models` folder inside the designated feature folder.

### ngc-component
A blank component with a few default services added to the constructor.


### ngc-module
This module accepts a feature name with the `+` prefix and still generates the module file correctly.

### ngc-routing
Creates a routes folder which contains a routes.ts and routes.names.ts file in the designated feature folder.

### ngc-service-firestore
Most of my applications are built to integrate with Google's Firebase Firestore database. This service provides all CRUD functionality with a prompt for the class to use for the bindings.

### ngc-service
A blank service for handling component to component data or other non Firebase Firestore data. 
