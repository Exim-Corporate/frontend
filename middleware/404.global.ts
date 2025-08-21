// /**
//  * Global 404 handling middleware
//  * Automatically redirects users to homepage when accessing non-existent routes
//  */
// export default defineNuxtRouteMiddleware(to => {
//   // Get all available routes from the router
//   const router = useRouter();
//   const routes = router.getRoutes();

//   // Check if the current route exists in the available routes
//   const routeExists = routes.some(route => {
//     // Check if route path matches exactly or as a pattern
//     if (route.path === to.path) return true;

//     // Check for dynamic routes (contains : or *)
//     if (route.path.includes(':') || route.path.includes('*')) {
//       // Convert route pattern to regex
//       const pattern = route.path
//         .replace(/:\w+/g, '[^/]+') // Replace :param with [^/]+
//         .replace(/\*/g, '.*'); // Replace * with .*
//       const regex = new RegExp(`^${pattern}$`);
//       return regex.test(to.path);
//     }

//     return false;
//   });

//   // If route doesn't exist, redirect to homepage
//   if (!routeExists) {
//     return navigateTo('/', { replace: true });
//   }
// });
// filepath: c:\Users\craig\OneDrive\Dokumenty\projects\outsource-nuxt\middleware\redirect.global.ts
/**
 * Global redirect middleware optimized for SSG deployment
 * Handles client-side redirects for non-existent routes
 */

export default defineNuxtRouteMiddleware(to => {
  // Skip на server-side во время генерации
  // console.log('to', to);
  // if (import.meta.server) {
  //   return;
  // }
  // Список валидных маршрутов
  const validRoutes = new Set([
    '/',
    '/about',
    '/services',
    '/contact',
    '/privacy',
    '/terms',
    '/impressum',
    '/cookie-policy',
    // Языковые версии
    '/de',
    '/de/about',
    '/de/services',
    '/de/contact',
    '/de/privacy',
    '/de/terms',
    '/de/impressum',
    '/de/cookie-policy',
    '/fr',
    '/fr/about',
    '/fr/services',
    '/fr/contact',
    '/fr/privacy',
    '/fr/terms',
    '/fr/impressum',
    '/fr/cookie-policy',
    '/es',
    '/es/about',
    '/es/services',
    '/es/contact',
    '/es/privacy',
    '/es/terms',
    '/es/impressum',
    '/es/cookie-policy',
    '/referrals',
    '/de/referrals',
    '/fr/referrals',
    '/es/referrals',
    '/blog',
    '/de/blog',
    '/fr/blog',
    '/es/blog',
    '/preview/email',
  ]);

  const routePath = to.path;

  // Проверяем специальные маршруты
  const isApiRoute = routePath.startsWith('/api/');
  const isBlogRoute =
    routePath.startsWith('/blog/') ||
    routePath.startsWith('/de/blog/') ||
    routePath.startsWith('/fr/blog/') ||
    routePath.startsWith('/es/blog/');
  // const isPreviewRoute = routePath.startsWith('/preview/');
  const isValidRoute = validRoutes.has(routePath);

  // Редирект на главную для невалидных маршрутов (только client-side)
  if (import.meta.client && !isValidRoute && !isApiRoute && !isBlogRoute) {
    return navigateTo('/', { replace: true });
  }
});
