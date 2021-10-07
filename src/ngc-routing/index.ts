import { strings } from '@angular-devkit/core';
import { classify,dasherize } from '@angular-devkit/core/src/utils/strings';
import { apply,mergeWith,move,Rule,SchematicContext,template,Tree,url } from '@angular-devkit/schematics';
import { parseName } from '@schematics/angular/utility/parse-name';
import { ModuleOptions } from '../shared/module-routing.model';
import { TAGS } from '../shared/template-tags';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcRouting(options: ModuleOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const defaultProjectPath = 'src/app';
    options.moduleName = dasherize(options.moduleName);

    const parsedPath = parseName(defaultProjectPath, options.moduleName);

    const { name, path } = parsedPath;
    const featureName = (name.substr(0, 1) == '+') ? name : '+' + name; //Module name with + appended if needed
    const routePath = path + '/' + featureName + '/' + '/routes/';

    const sourceTemplates = url('./templates');

    //_options.moduleName = (name.substr(0, 1) == '+') ? name.slice(1) : name;

    const sourceParametrized = apply(sourceTemplates, [
      template({
        ...options,
        ...strings,
        uppercase
      }), move(routePath)
    ]);

    // Register module with app routing module
    const routingBuffer = tree.read('/src/app/app.routes.module.ts');
    if (routingBuffer) {
      // Parse Content
      const content = routingBuffer.toString();
      // Define appended content
      const appendedContent =
        "{\n" +
        "  path: APP_ROUTE_NAMES." + options.moduleName.replace(/-/g, '_').toUpperCase() + ",\n" +
        "  component: Layout2AdminComponent,\n" +
        "  canActivate: [AngularFireAuthGuard], data: { authGuardPipe: GUARD_PIPES.redirectUnauthorizedToLogin }," +
        "  children: [\n" +
        "    { path: '', loadChildren: () => import('./+" + options.moduleName + "/" + options.moduleName + ".module').then(m => m." + classify(options.moduleName) + "Module) },\n" + "    ]\n  },\n" + TAGS.appRoute

      let newContent = content.replace(TAGS.appRoute, appendedContent);

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
      const appendedContent = "  " + options.moduleName.replace(/-/g, '_').toUpperCase() + ": '" + options.moduleName + "',\n" + routePathSplitStr + ';';

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
  return str.replace(/-/g, '_').toUpperCase();
}
