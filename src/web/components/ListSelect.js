const React = require('react');
const ModalPanel = require('./ModalPanel');

require('./ListSelect.scss');

class ListSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }

  _handleSelect(index) {
    let _index = this.state.selected.indexOf(index);
    if(_index >= 0) {
      this.setState({selected: this.state.selected.filter((i) => i !== index)});
    }else {
      this.setState({selected: [...this.state.selected, index]});
    }
  }

  _handleSubmit() {
    if(this.props.onListSelect) {
      this.props.onListSelect(this.state.selected.sort());
    }
  }

  render() {
    let actions = (
      <button onClick={() => this._handleSubmit()}>
        确认
      </button>
    )
    return (
      <ModalPanel title="请选择..." actions={actions}>
        <div className="list-select">
          {
            this.props.list.map((item, index) => {
              return (
                <div
                  key={'list-select#'+index}
                  className={'list-select-cell' + (this.state.selected.indexOf(index) >= 0 ? ' active':'')}
                  onClick={() => this._handleSelect(index)}
                >{item}</div>
              )
            })
          }
        </div>
      </ModalPanel>
    )
  }
}

ListSelect.defaultProps = {
  list: [],
}

module.exports = ListSelect;