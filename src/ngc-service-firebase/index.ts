import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { ServiceOptions } from '../shared/service.params';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcServiceFirebase(options: ServiceOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    // Default file path
    const defaultProjectPath = 'src/app/core';
    options.fileName = dasherize(options.fileName);

    // Module and Component paths
    const sourceTemplates = url('./templates');

    const newPath = defaultProjectPath + '/services/';

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }), move(newPath)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
