import { Rule, SchematicContext, Tree, chain, url, apply, template, move, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
import { classify, underscore } from '@angular-devkit/core/src/utils/strings';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcComponent(_options: any): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      // Default file path
      const defaultProjectPath = 'src/app';

      // Parse name from path
      const parsedPath = parseName(defaultProjectPath, _options.name);

      // Const params for use in template
      const { name, path } = parsedPath;
      const componentName = (name.substr(0, 1) == "+") ? name : '+' + name;
      const pathSplitChar = '/';
      const modulePathParts = path.split(pathSplitChar);
      const featurePath = pathSplitChar + modulePathParts[1] + // /src
                      pathSplitChar + modulePathParts[2] + // /app
                      pathSplitChar + "+" + modulePathParts[3];
                       // /+featureName
      const newPath = featurePath + pathSplitChar + componentName;

      // console.log(newPath);

      // templates folder path
      const sourceTemplates = url('./templates');

      // create template files in newPath location
      const sourceParametrized = apply(sourceTemplates, [
        template({
          ..._options,
          ...strings,
          name
        }), move(newPath)
      ]);

      // Register component with parent module
      const pathParts = path.split("/");
      const featureName = '+' + pathParts[pathParts.length -1];
      const moduleName = featureName.substr(1) + '.module.ts';

      const moduleBuffer = tree.read(featurePath + '/' + moduleName);
      if(moduleBuffer != null){
        const content = moduleBuffer.toString();

        // Import split
        const ngModuleStr = "\n@NgModule";
        const contentParts = content.split(ngModuleStr);

        // Declaration split
        const declarationSplitStr = "]";
        const declarationParts = contentParts[1].split(declarationSplitStr);

        // Put it all together
        let updatedContent = contentParts[0] + "import { "+classify(name)+"Component } from './+"+name+"/"+name+".component';\n" + ngModuleStr + declarationParts[0] + "  " + classify(name)+"Component,\n  " + declarationSplitStr + declarationParts.slice(1).join(declarationSplitStr);

        tree.overwrite(featurePath + '/' + moduleName, updatedContent);
      }

      // Register component with routing
      const routesFilename = featureName.substr(1) + '.routes.ts';
      console.log(routesFilename);

      const routingBuffer = tree.read(featurePath + '/routes/' + routesFilename);
      if(routingBuffer){
        const content = routingBuffer.toString();
        const importSplitString = "export";
        const routePathSplitStr = "\n]";

        let newContent = '';
        // Register component with route with default name
        const importParts = content.split(importSplitString);

        newContent += importParts[0] + "import { "+ classify(name) +"Component } from '../+" + name + "/" + name + ".component';\n" + importSplitString;

        const registerParts = importParts[1].split(routePathSplitStr);

        newContent += registerParts[0]
        + "{path: " + (featureName.substr(1).toUpperCase()) + '_ROUTE_NAMES.' + name.toUpperCase() + ", component: "+classify(underscore(name))+"Component}," + routePathSplitStr;

        tree.overwrite(featurePath + '/routes/' + routesFilename, newContent);
      }


      // Register component with routing names file
      const routeNamesFilename = featureName.substr(1) + '.routes.names.ts';
      const routeNameBuffer = tree.read(featurePath + '/routes/' + routeNamesFilename);
      if(routeNameBuffer){
        const content = routeNameBuffer.toString();
        const splitChar = "\n}";


        // Register component with route with default name
        const importParts = content.split(splitChar);

        const newContent = importParts[0] + name.replace('-', '_').toUpperCase() + " : '" + name + "',\n" + splitChar;

        tree.overwrite(featurePath + '/routes/' + routeNamesFilename, newContent);
      }


      return mergeWith(sourceParametrized)(tree, _context);
    }]);
}
