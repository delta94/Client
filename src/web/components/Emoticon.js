const React = require('react');
const { emojify, getCodeList } = require('../../utils/emoji');

require('./Emoticon.scss');

class Emoticon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectGroup: 'people',
    }
    this.emoji = getCodeList();
  }

  getEmoticonItems() {
    let selectGroup = this.state.selectGroup;
    if(selectGroup && this.emoji[selectGroup]) {
      return this.emoji[selectGroup].map((item) => (
        <span
          key={'emoji-cell#'+item}
          className="emoji-cell"
          onClick={()=>this.props.onSelect(item)}
        >
          {emojify(item)}
        </span>
      ))
    }

    return null;
  }

  render() {
    return (
      <div
        className="emoticon"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="items">
          {this.getEmoticonItems()}
        </div>
        <div className="group">
          {Object.keys(this.emoji).map((groupName) => (
            <div
              key={'emoji-group#' + groupName}
              className={'group-selection' + (this.state.selectGroup===groupName?' active':'')}
              onClick={() => this.setState({selectGroup: groupName})}
            >
              {emojify(this.emoji[groupName][0])}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

module.exports = Emoticon;