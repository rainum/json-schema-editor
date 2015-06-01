/** @jsx React.DOM */

// Start schema template
var DEFAULT_SCHEMA = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "the user id"
    },
    "email": {
      "type": "string",
      "description": "the user email"
    },
    "bio": {
      "type": "string",
      "description": "the user bio"
    }
  },
  "required": [
    "id",
    "email"
  ]
};

React.render(
    <JsonSchemaEditor schema={DEFAULT_SCHEMA}/>,
    document.body
);