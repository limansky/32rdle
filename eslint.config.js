import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from "eslint-plugin-react-refresh";
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-refresh": reactRefresh,
      "react-hooks": eslintPluginReactHooks
    },
    rules: {
      "react-refresh/only-export-components": "warn",
    }
  }
);
