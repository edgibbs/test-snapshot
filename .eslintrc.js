const pkg = require('./package.json')
module.exports = {
  "rules": {
    "array-bracket-spacing": [2, "never"],
    "babel/no-invalid-this": 1,
    "camelcase": 0,
    "comma-dangle": [2, "always-multiline"],
    "consistent-return": [2],
    "computed-property-spacing": [2, "never"],
    "dot-notation": [2],
    "func-names": [2],
    "func-style": [2, "declaration", { "allowArrowFunctions": true }],
    "generator-star-spacing": [2, "after"],
    "indent": [2, 2, {"SwitchCase": 1}],
    "import/no-duplicates": 0,
    "import/no-named-default": 0,
    "jsx-a11y/label-has-for": [
      "error",
      {
        "components": ["label"],
        "required": {
          "some": ["nesting", "id"]
        },
        "allowChildren": true
      }
    ],
    "jsx-a11y/anchor-has-content": 0,
    "jsx-a11y/no-onchange": 0,
    "linebreak-style": [2, "unix"],
    "no-alert": [2],
    "no-console": 0,
    "no-implicit-coercion": [2],
    "no-invalid-this": [2],
    "no-lonely-if": [2],
    "no-loop-func": [2],
    "no-magic-numbers": [2, { "enforceConst": true, "ignore": [-1,0,1,2] }],
    "no-mixed-operators": 0,
    "no-native-reassign": [2],
    "no-negated-condition": [2],
    "no-nested-ternary": [2],
    "no-spaced-func": [2],
    "no-useless-concat": [2],
    "no-var": [2],
    "no-void": [2],
    "object-curly-spacing": [2, "never"],
    "operator-assignment": [2, "always"],
    "operator-linebreak": [2, "after"],
    "prefer-arrow-callback": [2],
    "prefer-const": [2],
    "prefer-spread": [2],
    "prefer-template": [2],
    "radix": [2],
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "react/jsx-curly-spacing": [2, "never"],
    "react/jsx-indent-props": [2, 2],
    "react/no-danger": [2],
    "react/no-did-mount-set-state": [2],
    "react/no-did-update-set-state": [2],
    "react/no-unused-state": 2,
    "react/no-typos": 2,
    "react/prefer-es6-class": [2, "always"],
    "react/self-closing-comp": [
      2,
      {
        "component": true,
        "html": true
      }
    ],
    "react/sort-prop-types": [2],
    "react/sort-comp": [2],
    "require-yield": [2],
    "space-before-function-paren": [2, "never"],
    "yield-star-spacing": ["error", "after"]
  },
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "jasmine": true,
    "node": true
  },
  "plugins": ["react", "jsx-a11y", "standard", "babel"],
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true,
      "modules": true
    },
    "sourceType": "module"
  },
  "extends": [
    "standard",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  settings: {
    react: {
      version: (pkg.devDependencies && pkg.devDependencies.react) || '^16.4',
    },
  },
}
