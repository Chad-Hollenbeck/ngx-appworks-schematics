import { Rule, SchematicContext, Tree, chain, url, apply, template, move, mergeWith, MergeStrategy, schematic } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify, camelize } from '@angular-devkit/core/src/utils/strings';
import { TAGS } from '../shared/template-tags';
import { ComponentOptions } from '../shared/component.params';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcComponentListFirebase(options: ComponentOptions): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      // Default file path
      const defaultProjectPath = 'src/app';
      options.fileName = options.fileName || options.moduleName;

      // Module and Component names formatted with proper prefix
      const moduleName = (options.moduleName.substr(0, 1) == "+") ? options.moduleName : '+' + options.moduleName;
      const prefix = '+';

      const componentName = prefix + options.fileName;

      // Module and Component paths
      const modulePath = "/" + defaultProjectPath + "/" + moduleName;
      const componentPath = modulePath + "/" + componentName + '-list';

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

      if (routeModuleBuffer != null) {
        const content = routeModuleBuffer.toString();

        // Create new content snippets
        const componentClassImport = "import { " + classify(options.fileName) + "ListComponent } from '../+" + options.fileName + "-list/" + options.fileName + "-list.component';\n  " + TAGS.componentImport;

        const componentRoute = "{ path: " + options.moduleName.replace(/-/g, '_').toUpperCase() + "_ROUTE_NAMES." + camelize(options.fileName).toUpperCase() + "LIST, component: " + classify(options.fileName) + "ListComponent },\n  " + TAGS.componentRoute;


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
        const componentClassImport = "import { " + classify(options.fileName) + "ListComponent } from './" + prefix + options.fileName + "-list/" + options.fileName + "-list.component';\n  " + TAGS.componentImport;

        const componentRoute = "{ path: " + options.moduleName.replace(/-/g, '_').toUpperCase() + "_ROUTE_NAMES." + camelize(options.fileName).toUpperCase() + ", component: " + classify(options.fileName) + "ListComponent },\n  " + TAGS.componentRoute;

        const moduleComponentDeclaration = classify(options.fileName) + "ListComponent,\n  " + TAGS.componentDeclaration;

        // Replace overwrite tags
        let newContent = content
          .replace(TAGS.componentImport, componentClassImport)
          .replace(TAGS.componentRoute, componentRoute)
          .replace(TAGS.componentDeclaration, moduleComponentDeclaration);

        // if (options.export) {
        //   const moduleComponentExport = classify(options.fileName) + "Component,\n  " + TAGS.moduleExport;
        //   newContent = newContent.replace(TAGS.moduleExport, moduleComponentExport);
        // }

        tree.overwrite(modulePath + '/' + moduleFileName, newContent);
      }

      //* Register component with routing names file
      const routeNameFileName = options.moduleName + '.routes.names.ts';
      const routeNameBuffer = tree.read(modulePath + '/routes/' + routeNameFileName);

      if (routeNameBuffer) {
        const content = routeNameBuffer.toString();

        const importSnippet = camelize(options.fileName).toUpperCase() + "LIST : '',\n" + TAGS.routeName;

        let newContent = content.replace(TAGS.routeName, importSnippet);

        tree.overwrite(modulePath + '/routes/' + routeNameFileName, newContent);
      }

      const rule = chain([
        schematic('component-table', { moduleName: options.moduleName, fileName: options.fileName }),
        mergeWith(sourceParametrized, MergeStrategy.Default)
      ]);

      return rule(tree, _context);
    }]);
}
