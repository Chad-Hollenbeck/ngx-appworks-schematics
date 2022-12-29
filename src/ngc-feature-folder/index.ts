import { strings } from '@angular-devkit/core';
import { apply, chain, mergeWith, move, Rule, SchematicContext, template, Tree, url } from '@angular-devkit/schematics';
import { FeatureFolderOptions } from '../shared/feature-folder.params';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngcFeatureFolder(options: FeatureFolderOptions): Rule {
  return chain([
    (tree: Tree, _context: SchematicContext) => {
      // Default file path
      const filePath = `src/app/features/${options.featureName}`;

      // templates folder path
      const sourceTemplates = url('./templates');

      // create template files in component location
      const sourceParametrized = apply(sourceTemplates, [
        template({
          ...options,
          ...strings
        }), move(filePath)
      ]);

      return mergeWith(sourceParametrized)(tree, _context);
    }]);
}
