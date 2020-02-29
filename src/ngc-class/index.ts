import { Rule, SchematicContext, Tree, url, template, move, apply, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { ModuleFileClassOptions } from '../schema/module-file-class';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcClass(options: ModuleFileClassOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    // Module and Component names formatted with '+'
    const moduleName = (options.moduleName.substr(0, 1) == "+") ? options.moduleName : '+' + options.moduleName;

    // Module and Component paths
    const modulePath = "/" + defaultProjectPath + "/" + moduleName;

    const newPath = modulePath + '/models/';

    // templates folder path
    const sourceTemplates = url('./templates');

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }), move(newPath)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
