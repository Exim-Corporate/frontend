// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import prettier from 'eslint-plugin-prettier';

export default withNuxt([
  // Your custom configs here
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // Disabling the rule that causes formatting issues with attributes
      'vue/first-attribute-linebreak': 'off',
      // Disabling the rule that requires hyphenated attributes
      'vue/attribute-hyphenation': 'off',
    },
  },
]);
