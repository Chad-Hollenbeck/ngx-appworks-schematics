import { Rule, SchematicContext, Tree, url, template, move, apply, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcClass(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;

    const sourceTemplates = url('./templates');
    const pathSplitChar = '/';
    const modulePathParts = path.split(pathSplitChar);
    const featurePath = pathSplitChar + modulePathParts[1] + // /src
                    pathSplitChar + modulePathParts[2] + // /app
                    pathSplitChar + "+" + modulePathParts[3];
    const newPath = featurePath + '/models/';

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        name
      }), move(newPath)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
