module.exports = {
    root: true, // Make sure eslint picks up the config at the root of the directory
    settings: {
        react: {
            version: 'detect' // Automatically detect the react version
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb-typescript',
        'plugin:prettier/recommended' // Make this the last element so prettier config overrides other formatting rules
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ['./tsconfig.json']
    },
    plugins: ['@typescript-eslint', 'react', 'import'],
    rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Use our .prettierrc file as source

        //eslint/react/rules
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/jsx-pascal-case': 'error',


        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'typeLike',
                format: ['PascalCase'],
                filter: { regex: '^(__String|[A-Za-z]+_[A-Za-z]+)$', match: false }
            },
            {
                selector: 'interface',
                format: ['PascalCase'],
                custom: { regex: '^I[A-Z]', match: false },
                filter: {
                    regex: '^I(Arguments|TextWriter|O([A-Z][a-z]+[A-Za-z]*)?)$',
                    match: false
                }
            },
            {
                selector: 'variable',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                filter: {
                    regex: '^(_{1,2}filename|_{1,2}dirname|_+|[A-Za-z]+_[A-Za-z]+)$',
                    match: false
                }
            },
            {
                selector: 'function',
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
                filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false }
            },
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                filter: { regex: '^(_+|[A-Za-z]+_[A-Z][a-z]+)$', match: false }
            },
            {
                selector: 'method',
                format: ['camelCase', 'PascalCase'],
                leadingUnderscore: 'allow',
                filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false }
            },
            {
                selector: 'memberLike',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false }
            },
            {
                selector: 'enumMember',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
                leadingUnderscore: 'allow',
                filter: { regex: '^[A-Za-z]+_[A-Za-z]+$', match: false }
            },
            { selector: 'property', format: null }
        ],

        '@typescript-eslint/no-unused-vars': [
            'off',
            { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],

        'no-duplicate-imports': 'off',
        "import/no-extraneous-dependencies": 'off',
          

        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-this-alias': 'error',

        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],

        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/prefer-as-const': 'error',
        '@typescript-eslint/no-use-before-define': 'off',
        
        // eslint
        'constructor-super': 'error',
        curly: ['error', 'multi-line'],
        'dot-notation': 'error',
        eqeqeq: 'error',
        'new-parens': 'error',
        'no-caller': 'error',
        'no-duplicate-case': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-return-await': 'error',
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'space-in-parens': 'error',
        'unicode-bom': ['error', 'never'],
        'use-isnan': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
};
