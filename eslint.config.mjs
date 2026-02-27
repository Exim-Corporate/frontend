// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    rules: {
      // Disabling the rule that causes formatting issues with attributes
      'vue/first-attribute-linebreak': 'off',
      // Disabling the rule that requires hyphenated attributes
      'vue/attribute-hyphenation': 'off',
    },
  },
]);
