/** @jsx React.DOM */

var CodeEditor = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  getInitialState: function () {
    if (typeof this.props.value === 'object') {
      this.props.value = JSON.stringify(this.props.value, null,
          this.props.indent ? this.props.indent : 2)
    }

    return {isControlled: this.props.value != null}
  },

  propTypes: {
    className: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    mode: React.PropTypes.string,
    indent: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    style: React.PropTypes.object,
    value: React.PropTypes.node,
    matchBrackets: React.PropTypes.bool,
    autoCloseBrackets: React.PropTypes.bool,
    lineWrapping: React.PropTypes.bool
  },

  componentDidMount: function () {
    this.editor = CodeMirror.fromTextArea(this.refs.editor.getDOMNode(),
        this.props);
    this.editor.on('change', this.handleChange);
    this.editor.on('blur', this.handleBlur);
  },

  componentDidUpdate: function () {
    if (this.editor) {
      this.editor.setValue(this.props.defaultValue)
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (typeof nextProps.value === 'object') {
      nextProps.value = JSON.stringify(nextProps.value, null,
          nextProps.indent ? nextProps.indent : 2)
    }
  },

  refresh: function () {
    this.editor.refresh();
  },

  handleChange: function () {
    if (this.editor) {
      var value = this.editor.getValue();

      if (value !== this.props.value) {
        if (this.props.onChange) {
          this.props.onChange({target: {value: value}})
        }
        if (this.editor.getValue() !== this.props.value) {
          if (this.state.isControlled) {
            this.editor.setValue(this.props.value)
          } else {
            this.props.value = value
          }
        }
      }
    }
  },

  handleBlur: function () {
    if (this.editor) {
      this.props.onBlur({target: {value: this.editor.getValue()}})
    }
  },

  render: function () {
    return (
        <div style={this.props.style} className='sl-code-editor'>
        <textarea ref='editor' value={this.props.value}
                  readOnly={this.props.readOnly}
                  defaultValue={this.props.defaultValue}
                  onChange={this.props.onChange} onBlur={this.props.onChange}
                  style={this.props.style} className={this.props.className}>
        </textarea>
        </div>
    )
  }
});
