import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply,mergeWith,move,Rule,SchematicContext,template,Tree,url } from '@angular-devkit/schematics';
import { ServiceOptions } from '../shared/service.params';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcServiceFirebase(options: ServiceOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Default file path
    const defaultProjectPath = 'src/app';
    options.fileName = dasherize(options.fileName) || dasherize(options.moduleName);
    options.moduleName = dasherize(options.moduleName);

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
