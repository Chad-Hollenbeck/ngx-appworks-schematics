import { strings } from '@angular-devkit/core';
import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply,chain,MergeStrategy,mergeWith,move,Rule,schematic,SchematicContext,template,Tree,url } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { ModuleOptions } from '../shared/module-routing.model';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcModule(options: ModuleOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';
    options.moduleName = dasherize(options.moduleName);



    const parsedPath = parseName(defaultProjectPath, options.moduleName);

    const { name, path } = parsedPath;
    const componentPath = path + '/+' + name;

    const sourceTemplates = url('./templates');

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ...options,
        ...strings,
        uppercase
      }), move(componentPath)
    ]);

    //schematic('routing', { moduleName: options.moduleName, routing: true });


    const rule = chain([
      schematic('routing', { moduleName: options.moduleName, routing: true }),
      mergeWith(sourceParametrized, MergeStrategy.Default)
    ]);

    return rule(tree, _context);
  };
}
function uppercase(str: string) {
  return str.toUpperCase();
}
