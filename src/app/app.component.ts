import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbar,
    MatTabGroup,
    MatTab,
    MatButton,
    Highlight,
    HighlightLineNumbers,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fixit-imports';

  examples: Array<{
    showSolution: boolean;
    before: string;
    after: string | null;
    explanation: string;
    category: string;
  }> = [
    {
      category: 'FW',
      showSolution: false,
      before: `
        // packages/core/testing/test_bed.ts
        import {ApplicationConfig} from '@angular/core';
      `,
      after: `
        // packages/core/testing/test_bed.ts
        import {ApplicationConfig} from '../src/application_config';
      `,
      explanation:
        'This is an import within the same package. Notice how `core/testing/test_bed.ts` imports ' +
        'from `@angular/core`.\nThis may look like an external import, but in reality it just uses the module name to import from a directory higher. ' +
        '\nImports from secondary entry-points to the primary entry-point should still use relative imports.',
    },
    {
      category: 'FW',
      showSolution: false,
      before: `
        // packages/core/src/application_ref.ts
        import {ApplicationConfig} from '../application_config';
      `,
      after: null,
      explanation:
        "This is already correct. It's a relative import within the same package, so it should always be relative.",
    },
    {
      category: 'FW',
      showSolution: false,
      before: `
        // packages/core/test/application_ref_spec.ts
        import {ApplicationConfig} from '@angular/core';
      `,
      after: `
        // packages/core/test/application_ref_spec.ts
        import {ApplicationConfig} from '../src/application_ref';
      `,
      explanation:
        'Tests should also import things they test relatively. ' +
        'The rule is simple: Test code is part of the package, so it should import that way.',
    },
    {
      category: 'FW',
      showSolution: false,
      before: `
        // packages/forms/src/some_file.ts
        import {Component} from '../../core/index';
      `,
      after: `
        // packages/forms/src/some_file.ts
        import {Component} from '@angular/core';
      `,
      explanation:
        'This is a cross-package import, and those should never use relative specifiers.' +
        '<br/>Use the public module name, like a user would do.',
    },
    {
      category: 'Material',
      showSolution: false,
      before: `
        // src/material/select/select.ts
        import {MatOption} from '@angular/material/core';
      `,
      after: `
        // src/material/select/select.ts
        import {MatOption} from '../core';
    `,
      explanation:
        'This is an import within the Material package, so it should use relative imports.\n' +
        'It might look surprising because Material is large, but in reality, it\s a the package, so the canonical rules apply.',
    },
    {
      category: 'Material',
      showSolution: false,
      before: `
        // src/material/toolbar/toolbar.ts
        import {SomeA11yThing} from '@angular/cdk/a11y';
      `,
      after: null,
      explanation:
        'This is already correct. The Material package references something from the CDK.\n' +
        'This is a cross-package import and should use the npm module name.',
    },
  ].map((e) => ({
    ...e,
    before: e.before.trim(),
    after: e.after?.trim() ?? null,
  }));

  prepareExplanation(expl: string): string {
    return expl.replace(/\n/g, '<br/>');
  }
}
