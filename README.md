# NGC Schematics

![Angular Version](https://img.shields.io/badge/Angular-v9.0.1-informational)

## Summary
Angular schematics designed to work with a homebrewed Angular seed project. Most operations adhere to the standard /src/app directory flow, but some files such as services make use of shared resources not included in this package. **If requested, I'll add gist links here to those files.**

## Issues
Please submit any and all issues/enhancements to Github. I monitor the repo multiple times a week and usually respond to requests within a few days.


## Installation
This package is best used a dev dependency and can be installed via NPM with the following command:
`npm install --save-dev @chollenbeck/ngc`

**Recommended package.json scripts**
The double hash on the end of the script allows arguments to apply to the `ng g` action vs the `npm run` action.
```json
"scripts": {
  "ngc:module": "ng g @chollenbeck/ngc:module -- ",
  "ngc:routes": "ng g @chollenbeck/ngc:routes -- ",
  "ngc:component": "ng g @chollenbeck/ngc:component -- ",
  "ngc:model": "ng g @chollenbeck/ngc:model -- ",
  "ngc:service:firebase": "ng g @chollenbeck/ngc:service-http -- ",
  "ngc:service:http": "ng g @chollenbeck/ngc:service-firebase -- ",
  "ngc:component:table": "ng g @chollenbeck/ngc:component-table --",
  "ngc:component:form": "ng g @chollenbeck/ngc:component-form --",
  "ngc:component": "ng g @chollenbeck/ngc:component --",
  "ngc:component:list": "ng g @chollenbeck/ngc:component-list --",
  "ngc:component:manage": "ng g @chollenbeck/ngc:component-manage --",
  "ngc:feature:firebase": "ng g @chollenbeck/ngc:feature-firebase --",
  "ngc:feature:http": "ng g @chollenbeck/ngc:feature-http --",

}
```

## Versioning
This package uses symantic versioning. All minor and patch updates will be backwards compatible within the same major version.


## Schematics List
Each schematic is run with space separated arguments. Any arguments not provided will be prompted for if required.

- Module
- Class
- Component
- Component-Table
- Component-Form
- Component-List
- Component-Manage
- Feature-Crud
- Service

### Module & Routing
Generates a new folder and module file under /src/app/+feature. The `+` character is added automatically to the module folder name upon generation. The new module folder also contains a routes folder for component route configurations.

*Example:* `npm run ngc:module my-feature`
```
CREATE /src/app/+my-feature/my-feature.module.ts
CREATE /src/app/+my-feature/routes/my-feature.routes.module.ts
CREATE /src/app/+my-feature/routes/my-feature.routes.names.ts
```

### Interface
Generates a .ts file with the `{interface-name}.interface.ts` naming convention in a `models` folder inside the designated feature folder.

*Example:* `npm run ngc:class my-feature interface-name`
```
CREATE /src/app/+my-feature/models/interface-name.model.ts
```

### Component
A blank component with a few default services added to the constructor. Also registers the component with the module and routes files if they exist. This does not generate any spec/test files or scss unlike the standard angular schematic.

*Example:* `npm run ngc:component my-feature my-component`
```
CREATE /src/app/+my-feature/+my-component/my-component.component.ts
CREATE /src/app/+my-feature/+my-component/my-component.component.html
UPDATE /src/app/+my-feature/routes/my-feature.routes.module.ts
UPDATE /src/app/+my-feature/routes/my-feature.routes.names.ts
UPDATE /src/app/+my-feature/my-feature.module.ts
```

### Service
A mostly blank service that extends an IService interface for OOP re-use vs generating the same boilerplate code for each feature. The generated file also includes the super() call with default values. Services are all decorated with `providedIn: root`.

*Example:* `npm run ngc:service my-feature my-service`
```
CREATE /src/app/+my-feature/services/my-service.service.ts
```
