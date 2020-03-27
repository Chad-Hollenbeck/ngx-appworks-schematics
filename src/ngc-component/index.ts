import { Rule, SchematicContext, Tree, chain, url, apply, template, move, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify, camelize } from '@angular-devkit/core/src/utils/strings';
import { TAGS } from '../schema/template-tags';
import { ComponentOptions } from '../shared/component.params';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcComponent(options: ComponentOptions): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      // Default file path
      const defaultProjectPath = 'src/app';

      // Module and Component names formatted with proper prefix
      const moduleName = (options.moduleName.substr(0, 1) == "+") ? options.moduleName : '+' + options.moduleName;
      const prefix = (options.export) ? '_' : '+';

      const componentName = prefix + options.fileName;

      // Module and Component paths
      const modulePath = "/" + defaultProjectPath + "/" + moduleName;
      const componentPath = modulePath + "/" + componentName;

      // templates folder path
      const sourceTemplates = url('./templates');

      // create template files in component location
      const sourceParametrized = apply(sourceTemplates, [
        template({
          ...options,
          ...strings
        }), move(componentPath)
      ]);

      //* Add route to feature routing module
      const routeModuleFileName = options.moduleName + '.routes.module.ts';
      const routeModuleBuffer = tree.read(modulePath + '/routes/' + routeModuleFileName);

      console.log(TAGS);

      if (routeModuleBuffer != null) {
        const content = routeModuleBuffer.toString();

        // Create new content snippets
        const componentClassImport = "import { " + classify(options.fileName) + "Component } from '../+" + options.fileName + "/" + options.fileName + ".component';\n  " + TAGS.componentImport;

        const componentRoute = "{ path: " + options.moduleName.toUpperCase() + "_ROUTE_NAMES." + camelize(options.fileName).toUpperCase() + ", component: " + classify(options.fileName) + "Component },\n  " + TAGS.componentRoute;


        // Replace overwrite tags
        let newContent = content
          .replace(TAGS.componentImport, componentClassImport)
          .replace(TAGS.componentRoute, componentRoute);


        tree.overwrite(modulePath + '/routes/' + routeModuleFileName, newContent);
      }

      //* Register component with feature module
      const moduleFileName = options.moduleName + '.module.ts';
      const moduleBuffer = tree.read(modulePath + '/' + moduleFileName);

      if (moduleBuffer != null) {
        const content = moduleBuffer.toString();

        // Create new content snippets
        const componentClassImport = "import { " + classify(options.fileName) + "Component } from './" + prefix + options.fileName + "/" + options.fileName + ".component';\n  " + TAGS.componentImport;

        const componentRoute = "{ path: " + options.moduleName.toUpperCase() + "_ROUTE_NAMES." + camelize(options.fileName).toUpperCase() + ", component: " + classify(options.fileName) + "Component },\n  " + TAGS.componentRoute;

        const moduleComponentDeclaration = classify(options.fileName) + "Component,\n  " + TAGS.componentDeclaration;

        // Replace overwrite tags
        let newContent = content
          .replace(TAGS.componentImport, componentClassImport)
          .replace(TAGS.componentRoute, componentRoute)
          .replace(TAGS.componentDeclaration, moduleComponentDeclaration);

        if (options.export) {
          const moduleComponentExport = classify(options.fileName) + "Component,\n  " + TAGS.moduleExport;
          newContent = newContent.replace(TAGS.moduleExport, moduleComponentExport);
        }

        tree.overwrite(modulePath + '/' + moduleFileName, newContent);
      }

      //* Register component with routing names file
      const routeNameFileName = options.moduleName + '.routes.names.ts';
      const routeNameBuffer = tree.read(modulePath + '/routes/' + routeNameFileName);

      if (routeNameBuffer) {
        const content = routeNameBuffer.toString();

        const importSnippet = camelize(options.fileName).toUpperCase() + " : '" + options.fileName + "',\n" + TAGS.routeName;

        let newContent = content.replace(TAGS.routeName, importSnippet);

        tree.overwrite(modulePath + '/routes/' + routeNameFileName, newContent);
      }


      return mergeWith(sourceParametrized)(tree, _context);
    }]);
}
