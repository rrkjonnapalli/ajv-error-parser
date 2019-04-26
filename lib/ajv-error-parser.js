'use strict';
const Error = {
    Type: 'type',
    Maximum: 'maximum',
    Minimum: 'minimum',
    ExclusiveMinimum: 'exclusiveMinimum',
    ExclusiveMaximum: 'exclusiveMaximum',
    MultipleOf: 'multipleOf',
    MinLength: 'minLength',
    MaxLength: 'maxLength',
    Pattern: 'pattern',
    Format: 'format',
    MaxItems: 'maxItems',
    MinItems: 'minItems',
    UniqueItems: 'uniqueItems',
    Contains: 'contains',
    MaxProperties: 'maxProperties',
    MinProperties: 'minProperties',
    Required: 'required',
    AdditionalProperties: 'additionalProperties',
    Dependencies: 'dependencies',
    PropertyNames: 'propertyNames',
    Enum: 'enum',
    Const: 'const',
    Not: 'not',
    OneOf: 'oneOf',
    AnyOf: 'anyOf',
    AllOf: 'allOf',
    If: 'if'
};

class AJVErrorParser {
    static getMessage({ keyword, message, params, dataPath }) {
        dataPath = dataPath.slice(1).replace(/\//g, '.')
        message = message.toLowerCase()
        let msg;
        switch (keyword) {
            case Error.AdditionalProperties:
                msg = `${message} '${params.additionalProperty}'`
                if (dataPath.trim()) {
                    msg = `${msg} in ${dataPath}`
                }
                return msg
            case Error.Not:
                msg = dataPath.trim()
                if (msg) msg = `${msg} is/are `
                return `${msg}not valid`
            case Error.OneOf:
            case Error.AnyOf:
                return message.slice(0, -9)
            default:
                if (!dataPath.trim()) {
                    return `${message}`
                }
                return `${dataPath} ${message}`
        }
    }
    static parseErrors(errors = [], { style }={}) {
        let messages = []
        for (let error of errors) {
            messages.push(this.getMessage(error))
        }
        if (!style) return messages
        let response = messages.join(`
<br/>
<b>Message:</b>`)
        return `
<b>Message:</b>${response}
<br/>`
    }
}

module.exports = AJVErrorParser;