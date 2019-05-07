const AJVErrorParser = require('../');
const errors = [
    {
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
    }
];
const messages = AJVErrorParser.parseErrors(errors, {
    json: false
})
console.log(messages)
