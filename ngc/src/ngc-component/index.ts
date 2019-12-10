import { Rule, SchematicContext, Tree, chain, url, apply, template, move, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
// import { parseName } from '@schematics/angular/utility/parse-name';


// CONST
// const licenseText = `/** Created By: Chad Hollenbeck **/`;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcComponent(_options: any): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      const defaultProjectPath = 'src/app';

      const parsedPath = parseName(defaultProjectPath, _options.name);

      const { name, path } = parsedPath;

      // _options.name = name.slice(1);

      const newPath = path + '/+' + name;

      const sourceTemplates = url('./templates');



      const sourceParametrized = apply(sourceTemplates, [
        template({
          ..._options,
          ...strings,
          name
        }), move(newPath)
      ]);

      return mergeWith(sourceParametrized)(tree, _context);
    }]);
}
