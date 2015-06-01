/** @jsx React.DOM */

var EditorGrid = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    onCellChange: React.PropTypes.func.isRequired,
    onAddField: React.PropTypes.func.isRequired
  },

  render: function () {
    var rows = this.props.data.map(function (row) {
      return <EditorGrid.Row data={row}
                             onCellChange={this.props.onCellChange}/>;
    }, this);

    return (
        <ul>
          {rows}
          <li>
            <button onClick={this.props.onAddField}>+ Add field</button>
          </li>
        </ul>
    );
  }
});

EditorGrid.Cell = {};

EditorGrid.Cell.Text = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange: function (evt) {
    this.props.onChange(this.props.name, evt.target.value);
  },

  render: function () {
    return <input type="text" placeholder={this.props.name}
                  value={this.props.data} onChange={this.handleChange}/>
  }
});

EditorGrid.Cell.Select = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange: function (evt) {
    this.props.onChange(this.props.name, evt.target.value);
  },

  render: function () {
    var types = ['Select type', 'string', 'number', 'integer', 'boolean',
      'object', 'array', 'null'];

    return (
        <select value={this.props.data} onChange={this.handleChange}>
          {types.map(function (type) {
            return <option value={type}>{type}</option>
          })}
        </select>
    );
  }
});

EditorGrid.Cell.Checkbox = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    data: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  /**
   * Don't forget, that checkbox toggles checked state instead of value.
   * @param evt
   */
  handleChange: function (evt) {
    this.props.onChange(this.props.name, evt.target.checked);
  },

  render: function () {
    return (
        <label>
          <input type="checkbox" checked={this.props.data}
                 onChange={this.handleChange}/> Required?
        </label>
    )
  }
});

EditorGrid.Row = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired,
    onCellChange: React.PropTypes.func.isRequired
  },

  /**
   * Handle input's value change and cache old object field name.
   * @param prop
   * @param val
   */
  handleChange: function (prop, val) {
    var data = _.assign({}, this.props.data);

    if (prop === 'name') {
      data.oldName = data.name;
    }

    data[prop] = val;
    this.props.onCellChange(data);
  },

  render: function () {
    return (
        <li>
          <EditorGrid.Cell.Text data={this.props.data.name} name="name"
                                onChange={this.handleChange}/>
          <EditorGrid.Cell.Text data={this.props.data.description}
                                name="description"
                                onChange={this.handleChange}/>
          <EditorGrid.Cell.Select data={this.props.data.type} name="type"
                                  onChange={this.handleChange}/>
          <EditorGrid.Cell.Checkbox data={this.props.data.required}
                                    name="required"
                                    onChange={this.handleChange}/>
        </li>
    );
  }
});
