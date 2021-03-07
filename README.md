# NGC Schematics

![Angular Version](https://img.shields.io/badge/Angular-v11.0.0-informational)

## Summary
Angular schematics designed to work with a homebrewed Angular seed project. Most operations adhere to the standard /src/app directory flow, but some files such as services make use of shared resources not included in this package.

Schematics included for both RESTful API and Google's Firebase platform. Both schematics share the same interface schematic, but have seperate form, list, manage, and service configurations.

## Issues
Please submit any and all issues/enhancements to Github. I monitor the repo multiple times a week and usually respond to requests within a few days.


## Installation
This package is best used a dev dependency and can be installed via NPM with the following command:
`npm install --save-dev @chollenbeck/ngc@latest`

#### Recommended package.json scripts
The double hash on the end of the script allows arguments to apply to the `ng g` action vs the `npm run` action. Add/Remove functions and rename as needed.

```json
"scripts": {
    "ngc:form": "ng g @chollenbeck/ngc:component-form-subscription -- ",
    "ngc:table": "ng g @chollenbeck/ngc:component-table -- ",
    "ngc:c": "ng g @chollenbeck/ngc:component -- ",
    "ngc:ce": "ng g @chollenbeck/ngc:component-export -- ",
    "ngc:list:fire": "ng g @chollenbeck/ngc:component-list-firebase --",
    "ngc:list:http": "ng g @chollenbeck/ngc:component-list-http --",
    "ngc:manage:fire": "ng g @chollenbeck/ngc:component-manage-firebase --",
    "ngc:manage:http": "ng g @chollenbeck/ngc:component-manage-http --",
    "ngc:f:http": "ng g @chollenbeck/ngc:feature-http --",
    "ngc:f:fire": "ng g @chollenbeck/ngc:feature-firebase --",
    "ngc:i": "ng g @chollenbeck/ngc:interface --",
    "ngc:s:http": "ng g @chollenbeck/ngc:service-http -- ",
    "ngc:s:fire": "ng g @chollenbeck/ngc:service-http -- ",
    "ngc:s:fire": "ng g @chollenbeck/ngc:service-firebase --
}
```

## Versioning
This package uses symantic versioning and follows these guidelines:

- Major | *Newly added schematic or removal of an existing schematic.*
- Minor | *Schematic functionality tweaks to templates or chained schematics. May include renaming of schematics which will BREAK previous versions.*
- Patch | *Bugfix or non functional enhancements such as comments or syntax fixes in templates.*


## Schematics List
Each schematic is run with space separated arguments and includes prompts for any missing arguments. The only required argument is the module name, which can be used to autofill the rest of the prompts with a blank entry (press enter with no input).

*Component and Service schematics have two flavors to cover RESTful API integrations and Firebase Cloud Platform.*

- Module
- Model
- C.R.U.D Feature
- Component Blank
- Component Table
- Component Form
- Component List
- Component Manage
- Service


### Firebase vs RESTful API flavors
|                | Firebase           | RESTful |
|----------------|--------------------|---------|
| Entity ID type | STRING             | NUMBER  |
| Service Call   | Observable/Promise | Promise |

### Module & Routing
Generates a new folder and module file under /src/app/+feature. The `+` character is added automatically to the module folder name upon generation. The new module folder also contains a routes folder for component route configurations.

*Example:* `npm run ngc:module my-feature`
```
CREATE /src/app/+my-feature/my-feature.module.ts
CREATE /src/app/+my-feature/routes/my-feature.routes.module.ts
CREATE /src/app/+my-feature/routes/my-feature.routes.names.ts
```

### Interface
Generates a .ts file with the `{interface-name}.model.ts` naming convention in a `models` folder inside the designated feature folder.

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
