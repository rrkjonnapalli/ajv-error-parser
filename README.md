# ajv-error-parser
An error message parser for ajv schema validator errors

## Methods
```javascript
parseErrors(errors, opts)
opts:
    json: boolean // default true
    delimiter: string // default '\n' used only if json=false
```



## Examples

```javascript
const AJVErrorParser = require('ajv-error-parser');
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
const messages = AJVErrorParser.parseErrors(errors)
console.log(messages)

// OUTPUT:
[
  'should not have additional properties \'k\' in foo',
  'should have required property \'foo\'' 
]
```

### json

```javascript
const messages = AJVErrorParser.parseErrors(errors, {json: false})
console.log(messages)

//OUTPUT:

should not have additional properties 'k' in foo
should have required property 'foo'
```


### delimiter
It is the string to join messages

>Syntax:
>
> {delimiter}{messages.join(delimiter)}

```javascript
const messages = AJVErrorParser.parseErrors(errors, {
    json: false,
    delimiter:'\n<br/><b>Message:</b>'
})
console.log(messages)

//OUTPUT:

<br/><b>Message:</b>should not have additional properties 'k' in foo
<br/><b>Message:</b>should have required property 'foo'
```