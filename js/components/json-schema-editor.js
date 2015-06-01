/** @jsx React.DOM */

var JsonSchemaEditor = React.createClass({
  getInitialState: function () {
    return {data: this.props.schema};
  },

  /**
   * Create rows array based on schema object's properties
   * for displaying in UI editor.
   *
   * Here can happen bug with object values reorder. Needs fix.
   * @returns {Array}
   */
  prepareUiEditorData: function () {
    var rows = [];
    var properties = this.state.data.properties || {};
    var requiredList = this.state.data.required || [];

    for (var field in properties) {
      var fVal = properties[field];
      var row = {
        name: field,
        description: fVal.description,
        type: fVal.type,
        required: requiredList.indexOf(field) !== -1
      };

      rows.push(row);
    }

    return rows;
  },

  /**
   * Cast schema's object to string for displaying in code editor.
   * @returns {String}
   */
  prepareCodeEditorData: function () {
    return JSON.stringify(this.state.data, null, 2)
  },

  /**
   * Assemble UI editor's data back to schema and update components
   * state on UI editor's cell value change.
   * @param data
   */
  handleCellChange: function (data) {
    var props = this.state.data.properties || {};
    var required = this.state.data.required || [];

    // In case of field rename
    if (data.oldName) {
      props[data.name] = props[data.oldName];
      delete props[data.oldName];
    }

    props[data.name].description = data.description;
    props[data.name].type = data.type;

    var reqIndex = required.indexOf(data.name);

    // Add field to required array if field is not found
    // and checkbox is checked
    if (data.required && reqIndex === -1) {
      required.push(data.name)
    }

    // Remove field from required array if field is found
    // and checkbox is unchecked
    if (!data.required && reqIndex !== -1) {
      required.splice(reqIndex, 1);
    }

    // Delete fields with no name
    for (var f in props) {
      if (!f) delete props[f];
    }

    // Cleanup required items
    this.state.data.required = required.filter(function (item) {
      return item.length && Object.keys(props).indexOf(item) !== -1
    });

    this.setState({data: this.state.data});
  },

  /**
   * Update schema with new code editor's value.
   * @param event
   */
  handleCodeChange: function (event) {
    this.setState({data: JSON.parse(event.target.value)})
  },

  /**
   * Add field to schema by UI editor
   */
  handleAddField: function () {
    var props = this.state.data.properties;

    props['field' + (Object.keys(props).length + 1)] = {};
    this.setState({data: this.state.data})
  },

  /**
   * Refresh codemirror's instance to force rendering after
   * hidding editor.
   *
   * http://codemirror.net/doc/manual.html#refresh
   */
  handleTabChange: function () {
    this.refs.editor.refresh();
  },

  render: function () {
    return (
        <div className="json-schema-editor">
          <Tabs onTabChange={this.handleTabChange}>
            <Tabs.Tab title="Editor">
              <EditorGrid data={this.prepareUiEditorData()}
                          onCellChange={this.handleCellChange}
                          onAddField={this.handleAddField}/>
            </Tabs.Tab>
            <Tabs.Tab title="Schema">
              <CodeEditor ref="editor"
                          defaultValue={this.prepareCodeEditorData()}
                          mode="application/ld+json" matchBrackets={true}
                          autoCloseBrackets={true} lineWrapping={true}
                          onBlur={this.handleCodeChange}/>
            </Tabs.Tab>
          </Tabs>
        </div>
    );
  }
});
