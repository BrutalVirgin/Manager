module.exports = {
  env: {
    'browser': true,
    'es2021':  true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
  ],
  parser:        '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType':  'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style':            0,
    'quotes':                     ['error', 'single', { 'avoidEscape': true }],
    'semi':                       ['error', 'always'],
    'no-console':                 ['off'],
    'no-constant-condition':      ['error', { 'checkLoops': false }],
    'curly':                      ['error'],
    'eqeqeq':                     ['error'],
    'guard-for-in':               ['error'],
    'no-caller':                  ['error'],
    'no-global-assign':           ['error'],
    'no-implicit-coercion':       ['error'],
    'no-magic-numbers':           ['warn', { 'ignore': [0, 1, -1] }],
    'no-multi-spaces':            ['off'],
    'no-multi-str':               ['error'],
    'no-sequences':               ['error'],
    'object-curly-spacing':       [2, 'always'],
    'no-return-await':            ['error'],
    'no-throw-literal':           ['error'],
    'no-useless-escape':          ['error'],
    'no-useless-concat':          ['error'],
    'no-with':                    ['error'],
    'require-await':              ['off'],
    'strict':                     ['error', 'global'],
    'yoda':                       ['error'],
    'no-shadow':                  ['warn'],
    'no-shadow-restricted-names': ['error'],
    'no-undef-init':              ['error'],
    'no-unused-vars':             ['error', { 'vars': 'all', 'args': 'none' }],
    'callback-return':            ['error', ['callback', 'cb', 'done', 'next', 'res.send', 'res.view', 'reply', 'reply.view']],
    'global-require':             ['error'],
    'array-bracket-spacing':      ['error', 'never'],
    'block-spacing':              ['error', 'always'],
    'brace-style':                ['error', 'stroustrup', { 'allowSingleLine': false }],

    // 'camelcase': ['error', {'properties': 'never'}],
    'comma-spacing':                       ['error'],
    'computed-property-spacing':           ['error'],
    'key-spacing':                         ['error', { 'singleLine': { 'beforeColon': false, 'afterColon': true }, 'multiLine': { 'align': 'value' } }],
    'consistent-this':                     ['error'],
    'eol-last':                            ['error', 'always'],
    'func-call-spacing':                   ['error', 'never'],
    'keyword-spacing':                     ['error'],
    'lines-around-comment':                ['error', { 'beforeBlockComment': true, 'beforeLineComment': true, 'allowBlockStart': true, 'allowObjectStart': true, 'allowArrayStart': true }],
    'max-depth':                           ['error', 4],
    'max-len':                             ['warn', 150],
    'max-params':                          ['warn', 10],
    'new-cap':                             ['off'],
    'new-parens':                          ['error'],
    'no-mixed-spaces-and-tabs':            ['error', 'smart-tabs'],
    'no-multiple-empty-lines':             ['error', { 'max': 2 }],
    'no-nested-ternary':                   ['error'],
    'no-trailing-spaces':                  ['error'],
    'no-undef':                            ['off'],
    'no-whitespace-before-property':       ['error'],
    'one-var':                             ['error', 'never'],
    'padded-blocks':                       ['off'],
    'semi-spacing':                        ['error'],
    'space-before-blocks':                 ['error'],
    'space-before-function-paren':         ['error'],
    'space-in-parens':                     ['error', 'never'],
    'space-infix-ops':                     ['error'],
    'spaced-comment':                      ['error', 'always'],
    'arrow-body-style':                    ['error', 'always'],
    'arrow-parens':                        ['error', 'always'],
    'arrow-spacing':                       ['error'],
    'no-var':                              ['warn'],
    'prefer-rest-params':                  ['error'],
    'prefer-spread':                       ['error'],
    'comma-dangle':                        ['error', 'always-multiline'],
    'unicorn/prevent-abbreviations':       ['off'],
    'unicorn/consistent-destructuring':    ['off'],
    'unicorn/filename-case':               ['off'],
    'unicorn/no-null':                     ['off'],
    'unicorn/better-regex':                ['off'],
    'unicorn/no-array-callback-reference': ['off'],
    'sonarjs/no-duplicate-string':         ['off'],
  },
};
