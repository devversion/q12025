import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHighlightOptions } from "ngx-highlightjs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHighlightOptions({
      fullLibraryLoader: () => import("highlight.js"),
      lineNumbersLoader: () => import("ngx-highlightjs/line-numbers"),
      themePath: "assets/styles/androidstudio.css",
    }),
  ],
};
