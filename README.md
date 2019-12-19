# NGC Schematics
![Package Version](https://img.shields.io/badge/version-v1.0.0-inactive)

![Schematics Version](https://img.shields.io/badge/Schematics-v8.3.17-informational)
![Angular Version](https://img.shields.io/badge/Angular-v8.2.8-informational)
![AngularFire Version](https://img.shields.io/badge/AngularFire-v5.2.1-informational)

## Summary
A set of personal Angular schematics I created to speed up my hobby and professional development.

## Installation
To use in your projects:
1. Download the .tgz file in the repot root.
2. Copy the .tgz file into your projects. I put mine in a `_schematics` folder.
3. Run this npm command to install: `i:schematics": "npm i -D ./schematics/schematics-ngz-{version}.tgz`
4. Add npm scripts for each of the schematics you'd like to use as a shortcut, or use the full naming convention via cli. Here's an example: `"ngc-service" : "ng g @schematics/ngc:ngc-service"`

**Recommended package.json scripts**
```json
"scripts": {
  "ngc:install": "npm i --save-dev ./schematics/schematics-ngc-{version}.tgz",
  "ngc:module": "ng g @schematics/ngc:ngc-module",
  "ngc:routes": "ng g @schematics/ngc:ngc-routes",
  "ngc:component": "ng g @schematics/ngc:ngc-component",
  "ngc:class": "ng g @schematics/ngc:ngc-class",
  "ngc:service": "ng g @schematics/ngc:ngc-service",
  "ngc:service:firestore": "ng g @schematics/ngc:ngc-service-firestore"
}
```

## Schematics List
All of my feature folders are prefixed with `+` which breaks the default angular cli file generation for a multitude of schematics. Most of my schematics were created with this issue in mind.

Examples included for each schematic using the npm script syntax.

### ngc-module
This module accepts a feature name with or without the `+` prefix and still generates the feature folder and module file correctly.

*Example:* `npm run ngc:module my-feature`
```
CREATE /src/app/+my-feature/my-feature.module.ts
```

### ngc-routing
Creates a routes folder which contains a routes.ts and routes.names.ts file in the designated feature folder.

*Example:* `npm run ngc:routes my-feature`
```
CREATE /src/app/+my-feature/routes/my-feature.routes.ts
CREATE /src/app/+my-feature/routes/my-feature.routes.names.ts
```

### ngc-class
Creates a class file with the `{class-name}.model.ts` naming convention in a `models` folder inside the designated feature folder.

*Example:* `npm run ngc:class my-feature/my-class`
```
CREATE /src/app/+my-feature/models/my-class.model.ts
```

### ngc-component
A blank component with a few default services added to the constructor. Also registers the component with the module and routes files if they exist.

*Example:* `npm run ngc:component my-feature/my-component`
```
CREATE /src/app/+my-feature/+my-component/my-component.component.ts
CREATE /src/app/+my-feature/+my-component/my-component.component.html
UPDATE /src/app/+my-feature/routes/my-feature.routes.ts
UPDATE /src/app/+my-feature/routes/my-feature.routes.names.ts
UPDATE /src/app/+my-feature/my-feature.module.ts
```



### ngc-service-firestore
Most of my applications are built to integrate with Google's Firebase Firestore database. This service provides all CRUD functionality with a prompt for the class to use for the bindings.

*Example:* `npm run ngc:service:firestore my-feature/my-firestore-service`
```
CREATE /src/app/+my-feature/services/my-firestore-service.firestore.service.ts
UPDATE /src/app/+my-feature/my-feature.module.ts
```

### ngc-service
A blank service for handling component to component data or other non Firebase Firestore data such as auth or localStorage caching.

*Example:* `npm run ngc:service my-feature/my-service`
```
CREATE /src/app/+my-feature/services/my-service.service.ts
UPDATE /src/app/+my-feature/my-feature.module.ts
```
