import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply, chain, MergeStrategy, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { ComponentOptions } from '../shared/component.params';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcPage(options: ComponentOptions): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      // Default file path
      const defaultProjectPath = 'src/app/features';
      options.fileName = dasherize(options.fileName) || dasherize(options.moduleName);
      options.moduleName = dasherize(options.moduleName);


      // Module and Component paths
      const modulePath = "/" + defaultProjectPath + "/" + options.moduleName + '/pages';
      const componentPath = modulePath + "/" + options.fileName;

      // templates folder path
      const sourceTemplates = url('./templates');

      // create template files in component location
      const sourceParametrized = apply(sourceTemplates, [
        template({
          ...options,
          ...strings
        }), move(componentPath)
      ]);


      const rule = chain([
        mergeWith(sourceParametrized, MergeStrategy.Default)
      ]);

      return rule(tree, _context);
    }]);
}
