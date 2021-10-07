import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree, schematic, chain, noop } from '@angular-devkit/schematics';
import { ComponentOptions } from '../shared/component.params';
import { ModuleOptions } from '../shared/module-routing.model';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcFeatureHttp(options: ComponentOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    // Default file path
    const defaultProjectPath = 'src/app';
    options.fileName = dasherize(options.fileName) || dasherize(options.moduleName);
    options.moduleName = dasherize(options.moduleName);

    // Module and Component names formatted with '+'
    const moduleName = (options.moduleName.substr(0, 1) == "+") ? options.moduleName : '+' + options.moduleName;
    const modulePath = "/" + defaultProjectPath + "/" + moduleName;


    // Stock options for all schematics
    const moduleOptions: ModuleOptions = { moduleName: options.moduleName, routing: true };
    const componentOptions: ComponentOptions = { moduleName: options.moduleName, fileName: options.fileName, useSubscriptions: true };

    // Check if module exists
    const moduleFileName = options.moduleName + '.module.ts';
    const moduleBuffer = tree.read(modulePath + '/' + moduleFileName);


    const rule = chain([
      moduleBuffer != null ? noop() : schematic('module', moduleOptions),
      schematic('interface', componentOptions),
      schematic('service-http', componentOptions),
      schematic('component-list-http', componentOptions),
      schematic('component-manage-http', componentOptions),
    ]);

    return rule(tree, _context);
  };
}
