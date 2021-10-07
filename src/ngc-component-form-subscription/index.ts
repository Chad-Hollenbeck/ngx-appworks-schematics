import { Rule, SchematicContext, Tree, chain, url, apply, template, move, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { classify, dasherize } from '@angular-devkit/core/src/utils/strings';
import { TAGS } from '../shared/template-tags';
import { ComponentOptions } from '../shared/component.params';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcFormSubscriptionComponent(options: ComponentOptions): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      // Default file path
      const defaultProjectPath = 'src/app';
      options.fileName = dasherize(options.fileName) || dasherize(options.moduleName);
      options.moduleName = dasherize(options.moduleName);

      // Module and Component names formatted with '+'
      const moduleName = (options.moduleName.substr(0, 1) == "+") ? options.moduleName : '+' + options.moduleName;
      const componentName = (options.fileName.substr(0, 1) == "_") ? options.fileName : '_' + options.fileName;

      // Module and Component paths
      const modulePath = "/" + defaultProjectPath + "/" + moduleName;
      const componentPath = modulePath + "/" + componentName + '-form';

      // templates folder path
      const sourceTemplates = url('./templates');

      // create template files in newPath location
      const sourceParametrized = apply(sourceTemplates, [
        template({
          ...options,
          ...strings
        }), move(componentPath)
      ]);


      // Register component with feature module
      const moduleFileName = options.moduleName + '.module.ts';
      const moduleBuffer = tree.read(modulePath + '/' + moduleFileName);

      if (moduleBuffer != null) {
        const content = moduleBuffer.toString();

        // Create new content snippets
        const componentClassImport = "import { " + classify(options.fileName) + "FormComponent } from './_" + options.fileName + "-form/" + options.fileName + "-form.component';\n" + TAGS.componentImport;

        const componentDeclaration = classify(options.fileName) + "FormComponent,\n  " + TAGS.componentDeclaration;
        const moduleComponentExport = classify(options.fileName) + "FormComponent,\n  " + TAGS.moduleExport;

        // Replace overwrite tags
        let newContent = content
          .replace(TAGS.componentImport, componentClassImport)
          .replace(TAGS.componentDeclaration, componentDeclaration)
          .replace(TAGS.moduleExport, moduleComponentExport);


        tree.overwrite(modulePath + '/' + moduleFileName, newContent);
      }

      return mergeWith(sourceParametrized)(tree, _context);
    }]);
}
