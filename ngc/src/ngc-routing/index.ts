import { Rule, SchematicContext, Tree, mergeWith, move, apply, url, template } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core/src/utils';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcRouting(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { path } = parsedPath;

    const sourceTemplates = url('./templates');
    const newPath = path + '/routes/';

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings
      }), move(newPath)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
