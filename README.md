# NGC Schematics
![Package Version](https://img.shields.io/badge/version-v3.3.0-inactive)

![Schematics Version](https://img.shields.io/badge/Schematics-v8.3.17-informational)
![Angular Version](https://img.shields.io/badge/Angular-v8.2.8-informational)
![AngularFire Version](https://img.shields.io/badge/AngularFire-v5.2.1-informational)

## Summary
Angular schematics designed to work with a homebrewed Angular seed project. Most operations adhere to the standard /src/app directory flow, but some files such as services make use of shared resources not included in this package.


## Installation
This package is best used a dev dependency and can be installed via NPM with the following command:
`npm install @chollenbeck/ngc`

**Recommended package.json scripts**
The double hash on the end of the script allows arguments to apply to the `ng g` action vs the `npm run` action.
```json
"scripts": {
  "ngc:module": "ng g @chollenbeck/ngc:module -- ",
  "ngc:routes": "ng g @chollenbeck/ngc:routes -- ",
  "ngc:component": "ng g @chollenbeck/ngc:component -- ",
  "ngc:model": "ng g @chollenbeck/ngc:model -- ",
  "ngc:service": "ng g @chollenbeck/ngc:service -- ",
}
```

## Versioning
This package is versioned in the following manner: `major`.`minor`.`patch`. Major and minor version updates MAY NOT be backwards compatible, but patch updates can be applied without breaking changes. Check the versions.md file in the root directory for any manual changes needed to use an upgraded version of the schematics.

- Major versions will include new/depreciated features.
- Minor versions will contain feature rework including changes to generated file templates.
- Patch versions are used for bugfixes and issues.

## Schematics List
Each schematic is run with space separated arguments. Any arguments not provided will be prompted for if required.

- Module w/ Routing
- Interface
- Component
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
