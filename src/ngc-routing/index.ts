import { Rule, SchematicContext, Tree, url, template, move, apply, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcRouting(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;
    const featureName = (name.substr(0, 1) == '+') ? name : '+' + name;
    const routePath = path + '/' + featureName + '/' + '/routes/';

    const sourceTemplates = url('./templates');

    // console.log(_context);
    _options.name = (name.substr(0, 1) == '+') ? name.slice(1) : name;

    // if (_options.name.substring(_options.name.length - 1) == 's') {
    //   _options.name = _options.name.substring(0, _options.name.length - 1); //remove the trailing 's'
    // }
    // console.log(_options.name);

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        uppercase
      }), move(routePath)
    ]);

    return mergeWith(sourceParametrized)(tree, _context);
  };
}

function uppercase(str: string) {
  return str.toUpperCase();
}
