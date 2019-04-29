const AJVErrorParser = require('../')
const errors = AJVErrorParser.parseErrors(
    [{
        keyword: 'additionalProperties',
        dataPath: '.foo',
        schemaPath: '#/oneOf/0/additionalProperties',
        params: { additionalProperty: 'k' },
        message: 'should NOT have additional properties',
        schema: false,
        parentSchema:
        {
            properties: [Object],
            required: [Array],
            additionalProperties: false
        },
        data: { k: 1 }
    },
    {
        keyword: 'required',
        dataPath: '',
        schemaPath: '#/oneOf/0/required',
        params: { missingProperty: 'foo' },
        message: 'should have required property \'foo\'',
        schema: { foo: [Object] },
        parentSchema:
        {
            properties: [Object],
            required: [Array],
            additionalProperties: false
        },
        data: { k: 1 }
    },
    {
        keyword: 'type',
        dataPath: '.foo',
        schemaPath: '#/oneOf/0/properties/foo/type',
        params: { type: 'string' },
        message: 'should be string',
        schema: 'string',
        parentSchema: { type: 'string' },
        data: 1
    },
    {
        keyword: 'oneOf',
        dataPath: '',
        schemaPath: '#/oneOf',
        params: { passingSchemas: null },
        message: 'should match exactly one schema in oneOf',
        schema: [[Object], [Object]],
        parentSchema: { type: 'object', oneOf: [Array] },
        data: { k: 1 }
    }, {
        keyword: 'maximum',
        dataPath: '.dimensions.width',
        schemaPath: '#/properties/dimensions/properties/width/maximum',
        params: { comparison: '<=', limit: 5, exclusive: false },
        message: 'should be <= 5',
        schema: 5,
        parentSchema:
        {
            id: '/properties/dimensions/properties/width',
            type: 'integer',
            maximum: 5,
            title: 'The Width Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 6
    },
    {
        keyword: 'minLength',
        dataPath: '.name',
        schemaPath: '#/properties/name/minLength',
        params: { limit: 3 },
        message: 'should NOT be shorter than 3 characters',
        schema: 3,
        parentSchema:
        {
            id: '/properties/name',
            type: 'string',
            maxLength: 50,
            minLength: 3,
            pattern: '[abc]+',
            title: 'The Name Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 'ab'
    },
    {
        keyword: 'pattern',
        dataPath: '.name',
        schemaPath: '#/properties/name/pattern',
        params: { pattern: '[abc]+' },
        message: 'should match pattern "[abc]+"',
        schema: '[abc]+',
        parentSchema:
        {
            id: '/properties/name',
            type: 'string',
            maxLength: 50,
            minLength: 3,
            pattern: '[abc]+',
            title: 'The Name Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 'hi'
    },
    {
        keyword: 'maxLength',
        dataPath: '.name',
        schemaPath: '#/properties/name/maxLength',
        params: { limit: 50 },
        message: 'should NOT be longer than 50 characters',
        schema: 50,
        parentSchema:
        {
            id: '/properties/name',
            type: 'string',
            maxLength: 50,
            minLength: 3,
            pattern: '[abc]+',
            title: 'The Name Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 'aaaaaaaaaaabbbbbbbbbbaaaaaaaaaaabbbbbbbbbbaaaaaaaaaaabbbbbbbbbbaaaaaaaaaaabbbbbbbbbbaaaaaaaaaaabbbbbbbbbb'
    },
    {
        keyword: 'exclusiveMinimum',
        dataPath: '.price',
        schemaPath: '#/properties/price/exclusiveMinimum',
        params: { comparison: '>', limit: 5, exclusive: true },
        message: 'should be > 5',
        schema: 5,
        parentSchema:
        {
            id: '/properties/price',
            type: 'number',
            minimum: 5,
            exclusiveMinimum: 5,
            multipleOf: 5,
            title: 'The Price Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 3
    },
    {
        keyword: 'multipleOf',
        dataPath: '.price',
        schemaPath: '#/properties/price/multipleOf',
        params: { multipleOf: 5 },
        message: 'should be multiple of 5',
        schema: 5,
        parentSchema:
        {
            id: '/properties/price',
            type: 'number',
            minimum: 5,
            exclusiveMinimum: 5,
            multipleOf: 5,
            title: 'The Price Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 3
    },
    {
        keyword: 'exclusiveMaximum',
        dataPath: '.price',
        schemaPath: '#/properties/price/exclusiveMaximum',
        params: { comparison: '<', limit: 5, exclusive: true },
        message: 'should be < 5',
        schema: undefined,
        parentSchema:
        {
            id: '/properties/price',
            type: 'number',
            minimum: 5,
            exclusiveMaximum: 5,
            multipleOf: 5,
            title: 'The Price Schema.',
            description: 'An explanation about the purpose of this instance.'
        },
        data: 6
    },
    {
        keyword: 'format',
        dataPath: '.date',
        schemaPath: '#/properties/date/format',
        params: { format: 'date' },
        message: 'should match format "date"',
        schema: 'date',
        parentSchema:
        {
            id: '/properties/date',
            type: 'string',
            title: 'The date Schema.',
            format: 'date'
        },
        data: 'me'
    },
    {
        keyword: 'uniqueItems',
        dataPath: '.tagNames',
        schemaPath: '#/properties/tagNames/uniqueItems',
        params: { i: 0, j: 2 },
        message: 'should NOT have duplicate items (items ## 2 and 0 are identical)',
        schema: true,
        parentSchema:
        {
            id: '/properties/tagNames',
            type: 'array',
            maxItems: 3,
            uniqueItems: true,
            items: [Object]
        },
        data: ['me', 'hey', 'me']
    },
    {
        keyword: 'maxItems',
        dataPath: '.tagNames',
        schemaPath: '#/properties/tagNames/maxItems',
        params: { limit: 3 },
        message: 'should NOT have more than 3 items',
        schema: 3,
        parentSchema:
        {
            id: '/properties/tagNames',
            type: 'array',
            maxItems: 3,
            uniqueItems: true,
            items: [Object]
        },
        data: ['me', 'hey', 'me', 'he']
    },
    {
        keyword: 'minItems',
        dataPath: '.tagNames',
        schemaPath: '#/properties/tagNames/minItems',
        params: { limit: 2 },
        message: 'should NOT have fewer than 2 items',
        schema: 2,
        parentSchema:
        {
            id: '/properties/tagNames',
            type: 'array',
            minItems: 2,
            maxItems: 3,
            uniqueItems: true,
            items: [Object]
        },
        data: ['me']
    },
    {
        keyword: 'format',
        dataPath: '.tags[0].email',
        schemaPath: '#/properties/tags/items/properties/email/format',
        params: { format: 'email' },
        message: 'should match format "email"',
        schema: 'email',
        parentSchema:
        {
            id: '/properties/email',
            type: 'string',
            maxLength: 50,
            minLength: 3,
            format: 'email'
        },
        data: 'me'
    },
    {
        keyword: 'maxProperties',
        dataPath: '.tags[0]',
        schemaPath: '#/properties/tags/items/maxProperties',
        params: { limit: 2 },
        message: 'should NOT have more than 2 properties',
        schema: 2,
        parentSchema: { type: 'object', properties: [Object], maxProperties: 2 },
        data: { email: 'm@m', name: 'x', age: 1 }
    },
    {
        keyword: 'minProperties',
        dataPath: '.tags[0]',
        schemaPath: '#/properties/tags/items/minProperties',
        params: { limit: 5 },
        message: 'should NOT have fewer than 5 properties',
        schema: 5,
        parentSchema: { type: 'object', properties: [Object], minProperties: 5 },
        data: { email: 'm@m', name: 'x', age: 1 }
    },
    {
        keyword: 'dependencies',
        dataPath: '.details',
        schemaPath: '#/properties/details/dependencies',
        params:
        {
            property: 'foo',
            missingProperty: 'bar',
            depsCount: 2,
            deps: 'bar, bz'
        },
        message: 'should have properties bar, bz when property foo is present',
        schema: { foo: [Array] },
        parentSchema: { dependencies: [Object] },
        data: { foo: 1 }
    },
    {
        keyword: 'enum',
        dataPath: '.color',
        schemaPath: '#/properties/color/enum',
        params: { allowedValues: [Array] },
        message: 'should be equal to one of the allowed values',
        schema: [1, 'x', [Object], [Array]],
        parentSchema: { enum: [Array] },
        data: 'm'
    },
    {
        keyword: 'not',
        dataPath: '.voterAge',
        schemaPath: '#/properties/voterAge/not',
        params: {},
        message: 'should NOT be valid',
        schema: { maximum: 18 },
        parentSchema: { not: [Object] },
        data: 18
    },
    {
        "keyword": "anyOf",
        "dataPath": "",
        "schemaPath": "#/anyOf",
        "params": {

        },
        "message": "should match some schema in anyOf",
        "schema": [
            {
                "maximum": 3
            },
            {
                "type": "integer"
            }
        ],
        "parentSchema": {
            "anyOf": [
                {
                    "maximum": 3
                },
                {
                    "type": "integer"
                }
            ]
        },
        "data": 5.5
    },
    {
        keyword: 'contains',
        dataPath: '',
        schemaPath: '#/contains',
        params: {},
        message: 'should contain a valid item',
        schema: { type: 'integer' },
        parentSchema: { contains: [Object] },
        data: []
    },
    {
        keyword: 'not',
        dataPath: '',
        schemaPath: '#/not',
        params: {},
        message: 'should NOT be valid',
        schema: { type: 'array', items: [Object] },
        parentSchema: { not: [Object] },
        data: []
    },
    {
        keyword: 'propertyNames',
        dataPath: '',
        schemaPath: '#/propertyNames',
        params: { propertyName: 'foo' },
        message: 'property name \'foo\' is invalid',
        schema: { format: 'email' },
        parentSchema: { propertyNames: [Object] },
        data: { foo: 1 }
    },
    {
        keyword: 'const',
        dataPath: '.bar',
        schemaPath: '#/properties/bar/const',
        params: { allowedValue: [Object] },
        message: 'should be equal to constant',
        schema: { '$data': '1/foo' },
        parentSchema: { const: [Object] },
        data: 2
    },
    {
        keyword: 'if',
        dataPath: '',
        schemaPath: '#/if',
        params: { failingKeyword: 'else' },
        message: 'should match "else" schema',
        schema: { properties: [Object] },
        parentSchema: { if: [Object], then: [Object], else: [Object] },
        data: { power: 4 }
    },
    {
        keyword: 'if',
        dataPath: '',
        schemaPath: '#/if',
        params: { failingKeyword: 'then' },
        message: 'should match "then" schema',
        schema: { properties: [Object] },
        parentSchema: { if: [Object], then: [Object], else: [Object] },
        data: { power: 40000 }
    }
    ]
    , { 
        json: false
        , delimiter:`
<br/>
<b>Message:</b>`
     })

console.log(errors)