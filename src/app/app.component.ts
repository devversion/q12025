import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTabGroup, MatTab } from "@angular/material/tabs";
import { MatButton } from "@angular/material/button";
import { Highlight } from "ngx-highlightjs";
import { HighlightLineNumbers } from "ngx-highlightjs/line-numbers";

@Component({
  selector: "app-root",
  imports: [
    RouterOutlet,
    MatToolbar,
    MatTabGroup,
    MatTab,
    MatButton,
    Highlight,
    HighlightLineNumbers,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "fixit-imports";

  examples = [
    {
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
        "This is an import within the same package. Notice how `core/testing/test_bed.ts` imports " +
        "from `@angular/core`.\nThis may look like an external import, but in reality it just uses the module name to import from a directory higher. " +
        "\nImports from secondary entry-points to the primary entry-point should still use relative imports.",
    },
    {
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
        "Tests should also import things they test relatively. " +
        "The rule is simple: Test code is part of the package, so it should import that way.",
    },
    {
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
        "This is a cross-package import, and those should never use relative specifiers." +
        "<br/>Use the public module name, like a user would do.",
    },
  ].map((e) => ({
    ...e,
    before: e.before.trim(),
    after: e.after?.trim() ?? null,
  }));

  prepareExplanation(expl: string): string {
    return expl.replace(/\n/g, "<br/>");
  }
}
