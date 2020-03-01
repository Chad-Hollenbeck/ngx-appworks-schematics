import { Rule, SchematicContext, Tree, url, template, move, apply, mergeWith } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { strings } from '@angular-devkit/core';
import { ModuleOptions } from '../schema/module-routing.model';
import { classify } from '@angular-devkit/core/src/utils/strings';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcRouting(_options: ModuleOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';

    const parsedPath = parseName(defaultProjectPath, _options.moduleName);

    const { name, path } = parsedPath;
    const featureName = (name.substr(0, 1) == '+') ? name : '+' + name; //Module name with + appended if needed
    const routePath = path + '/' + featureName + '/' + '/routes/';

    const sourceTemplates = url('./templates');

    //_options.moduleName = (name.substr(0, 1) == '+') ? name.slice(1) : name;

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        uppercase
      }), move(routePath)
    ]);

    // fixme: Replace logic w/ tags vs split chars

    // Register module with app routing module
    const routingBuffer = tree.read('/src/app/app.routes.module.ts');
    if (routingBuffer) {
      // Parse Content
      const content = routingBuffer.toString();

      // Define split character
      const routePathSplitStr = "];";

      // Define appended content
      const appendedContent =
        "  {\n" +
        "    path: APP_ROUTE_NAMES." + _options.moduleName.toUpperCase() + ",\n" +
        "    component: Layout2Component,\n" +
        "    children: [\n" +
        "      { path: '', loadChildren: () => import('./+" + _options.moduleName + "/" + _options.moduleName + ".module').then(m => m." + classify(_options.moduleName) + "Module) },\n" + "    ]\n  },\n" + routePathSplitStr

      let newContent = '';
      // Register component with route with default name
      const contentParts = content.split(routePathSplitStr);

      newContent += contentParts[0] + appendedContent;

      tree.overwrite('/src/app/app.routes.module.ts', newContent);
    }

    // Register module with app routing names
    const routingNameBuffer = tree.read('/src/app/app.routes.names.ts');
    if (routingNameBuffer) {
      // Parse Content
      const content = routingNameBuffer.toString();

      // Define split character
      const routePathSplitStr = "}";

      // Define appended content
      const appendedContent = "  " + _options.moduleName.toUpperCase() + ": '" + _options.moduleName + "',\n" + routePathSplitStr;

      let newContent = '';
      // Register component with route with default name
      const contentParts = content.split(routePathSplitStr);

      newContent += contentParts[0] + appendedContent;

      tree.overwrite('/src/app/app.routes.names.ts', newContent);
    }

    return mergeWith(sourceParametrized)(tree, _context);
  };
}

function uppercase(str: string) {
  return str.toUpperCase();
}
