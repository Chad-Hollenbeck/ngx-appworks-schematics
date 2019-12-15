import { Rule, SchematicContext, Tree, url, apply, template, move, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
import { classify } from '@angular-devkit/core/src/utils/strings';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcService(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;

    const sourceTemplates = url('./templates');

    const newPath = path + '/services/';

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        name
      }), move(newPath)
    ]);


    // Register service with parent module
    const _moduleNamePrefix = path.split('+')[1];
    const moduleName = _moduleNamePrefix + '.module.ts';

    const moduleBuffer = tree.read(path + '/' + moduleName);
    if (moduleBuffer != null) {
      const content = moduleBuffer.toString();

      // Import split
      const ngModuleStr = "\n@NgModule";
      const contentParts = content.split(ngModuleStr);

      // Declaration split
      const declarationSplitStr = "]";
      const declarationParts = contentParts[1].split(declarationSplitStr);

      // console.log(declarationParts);

      // Put it all together
      let updatedContent = contentParts[0]
        + "import { " + classify(name) + "Service } from './services/" + name + ".service';\n"
        + ngModuleStr + declarationParts.slice(0, declarationParts.length - 1).join(declarationSplitStr)
        + "  "
        + classify(name) + "Service,\n  " + declarationSplitStr + declarationParts[declarationParts.length - 1]
      // console.log(updatedContent);
      tree.overwrite(path + '/' + moduleName, updatedContent);
    }

    return mergeWith(sourceParametrized)(tree, _context);
  };
}
