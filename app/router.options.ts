import type { RouterConfig } from '@nuxt/schema';

// Router options: keep scrollBehavior minimal; detailed hash scrolling handled in plugin.
export default <RouterConfig>{
  // scrollBehavior(to, _from, savedPosition) {
  //   if (savedPosition) return savedPosition;
  //   if (to.hash) return { left: 0, top: 0 };
  //   return { left: 0, top: 0 };
  // },
};
