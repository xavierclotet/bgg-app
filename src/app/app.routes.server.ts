import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'collection',
    renderMode: RenderMode.Client
  },
 /*  {
    path: 'hydrate',
    renderMode: RenderMode.Client
  } */
];
