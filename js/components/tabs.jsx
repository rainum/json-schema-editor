/** @jsx React.DOM */

var Tabs = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onTabChange: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {active: 0};
  },

  /**
   * Fire callback on tab switcher click after
   * state change is completed.
   * @param index
   */
  switchTab: function (index) {
    this.setState({active: index}, this.props.onTabChange);
  },

  render: function () {
    return (
        <div>
          <div className="tab-switchers">
            {this.props.children.map(function (tab, i) {
              return (
                  <button disabled={this.state.active === i ? 'active' : ''}
                          onClick={this.switchTab.bind(this, i)}>
                    {tab.props.title}
                  </button>
              )
            }, this)}
          </div>
          <div className="tabs-contents">
            {this.props.children.map(function (tab, i) {
              return (
                  <div className={this.state.active === i ? 'active' : ''}>
                    {tab.props.children}
                  </div>
              )
            }, this)}
          </div>
        </div>
    )
  }
});
