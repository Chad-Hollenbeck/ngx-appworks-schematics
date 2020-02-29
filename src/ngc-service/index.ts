import { Rule, SchematicContext, Tree, url, apply, template, move, mergeWith } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcService(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Default file path
    const defaultProjectPath = 'src/app';

    // Module and Component names formatted with '+'
    const moduleName = (options.moduleName.substr(0, 1) == "+") ? options.moduleName : '+' + options.moduleName;

    // Module and Component paths
    const modulePath = "/" + defaultProjectPath + "/" + moduleName;

    const sourceTemplates = url('./templates');

    const newPath = modulePath + '/services/';

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }), move(newPath)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
