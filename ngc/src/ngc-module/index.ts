import { Rule, SchematicContext, Tree, url, template, move, apply, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcModule(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;

    const sourceTemplates = url('./templates');

    // console.log(_context);
    _options.name = name.slice(1);
    console.log(_options.name);

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      }), move(path)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
