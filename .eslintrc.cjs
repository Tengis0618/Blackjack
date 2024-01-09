module.exports = {
    'plugins': [ ],
    'env': {
        'es2021': true,
        'browser': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'semi': [
            'error',
            'always'
        ],
        'no-var': [
            'error',
        ],
        'prefer-const': ['error', {
            'destructuring': 'any',
            'ignoreReadBeforeAssign': false
        }],
        'curly': ['error'],
        'eqeqeq': ['error'],
        'no-multi-spaces': ['error'],
        'no-lone-blocks': ['error'],
        'no-self-compare': ['error'],
        'no-unused-expressions': ['error'],
        'no-useless-call': ['error'],
        'no-use-before-define': ['error'],

        'camelcase': ['error', {properties: 'never'}],
        'func-call-spacing': ['error'],
        'no-lonely-if': ['error'],
        'array-bracket-spacing': ['error'],

        'no-console': ['off'],
    }
};
