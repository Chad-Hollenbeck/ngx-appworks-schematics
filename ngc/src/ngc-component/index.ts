import { Rule, SchematicContext, Tree, chain, externalSchematic } from '@angular-devkit/schematics';
// import { parseName } from '@schematics/angular/utility/parse-name';


// CONST
// const licenseText = `/** Created By: Chad Hollenbeck **/`;

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcModule(options: any): Rule {
  return chain([
    externalSchematic('@schematics/angular', 'module', options),
    (tree: Tree, _context: SchematicContext) => {
      // const defaultProjectPath = 'src/app';
      //
      // const parsedPath = parseName(defaultProjectPath, options.name);
      //
      // const { name, path } = parsedPath;
      //
      // tree.getDir(path).visit(filepath => {
      //   tree.re
      // })

      return tree;
  }]);
}
