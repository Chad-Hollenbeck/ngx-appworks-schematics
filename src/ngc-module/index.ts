import { Rule, SchematicContext, Tree, url, template, move, apply, mergeWith, schematic, chain, noop, MergeStrategy } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
import { ModuleOptions } from '../schema/module-routing.model';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcModule(options: ModuleOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, options.moduleName);

    const {name, path } = parsedPath;
    const componentPath = path + '/+' + name;

    const sourceTemplates = url('./templates');

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ...options,
        ...strings
      }), move(componentPath)
    ]);

    if (options.routing) {
      schematic('routing', {moduleName: options.moduleName, routing: true});
    }

    const rule = chain([
      options.routing ? schematic('routing', { moduleName: options.moduleName, routing: true }) : noop(),
      mergeWith(sourceParametrized, MergeStrategy.Default)
    ]);

    return rule(tree, _context);
  };
}
