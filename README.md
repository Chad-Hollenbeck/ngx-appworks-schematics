# NGX Appworks Schematics

![Angular Version](https://img.shields.io/badge/Angular-v11.0.0-informational)

## Summary
Angular schematics designed to work with a homebrewed Angular seed project. Most operations adhere to the standard /src/app directory flow, but some files such as services make use of shared resources not included in this package.

Schematics included for both RESTful API and Google's Firebase platform. Both schematics share the same interface schematic, but have seperate form, list, manage, and service configurations.

## Issues
Please submit any and all issues/enhancements to Github. I monitor the repo multiple times a week and usually respond to requests within a few days.

## Versions
Please use the following versions based on which Starter Kit Template is being used. If your current version is not explicitely shown, use the closest version number of the last digit that does not exceed your version. i.e. `11.160.2` should use `4.0.0`

|  NGX Admin       | NGX       |
|------------------|-----------|
| 14.100.1         | 5.0.0     |

|  AppWorks Core   | NGX       |
|------------------|-----------|
| 11.160.3         | 4.1.0     |
| 11.160.1         | 4.0.0     |

### Depreciated
Due to naming convention, previous schematics had to be renamed. Use @chollenbeck/ngc for v3.15 or lower
| AppWorks Core  | NGC       |
|----------------|-----------|
| 1.11.0         | 3.15.x    |
| 1.5.2          | <= 3.14.x |


## Installation
This package is best used a dev dependency and can be installed via NPM with the following command:
`npm install --save-dev @chollenbeck/ngx-appworks-schematics@latest`

#### Recommended package.json scripts
The double hash on the end of the script allows arguments to apply to the `ng g` action vs the `npm run` action. Add/Remove functions and rename as needed.

```json
"scripts": {
    "ngc:c": "ng g @chollenbeck/ngc:component -- ",
    "ngc:page": "ng g @chollenbeck/ngc:page -- ",
    "ngc:i": "ng g @chollenbeck/ngc:interface --",
    "ngc:service": "ng g @chollenbeck/ngc:service-firebase --
}
```

## Versioning
This package uses symantic versioning and follows these guidelines:

- Major | *Newly added schematic or removal of an existing schematic.*
- Minor | *Schematic functionality tweaks to templates or chained schematics. May include renaming of schematics which will BREAK previous versions.*
- Patch | *Bugfix or non functional enhancements such as comments or syntax fixes in templates.*


## Schematics List
Each schematic is run with space separated arguments and includes prompts for any missing arguments.

- Model
- Component (Empty)
- Page (Empty)
- Firestore Service


### Interface
Generates a .ts file with the `{interface-name}.model.ts` naming convention in a `models` folder inside the designated feature folder.

*Example:* `npm run ngc:class my-feature interface-name`

### Component
An empty component with stubbed Import & Export properties.

*Example:* `npm run ngc:component my-feature my-component`


### Page
An empty page.

*Example:* `npm run ngc:component my-feature my-component`


### Firestore Service
An empty Firestore service which extends the default firestore base service. Includes a constructor with a stubbed converter object for Firestore integration.

*Example:* `npm run ngc:service my-service`
