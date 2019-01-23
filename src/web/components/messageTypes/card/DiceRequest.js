const BaseCard = require('./BaseCard');
const { connect } = require('react-redux');
const { acceptDiceRequest } = require('../../../../redux/actions/dice');

// 投骰请求
class DiceRequest extends BaseCard {
  getCardBtn() {
    let info = this.props.info;
    let data = info.data;
    let uuid = info.uuid;
    let is_accept = data.is_accept;
    let allow_accept_list = data.allow_accept_list;

    if (is_accept) {
      return [
        {
          label: '已通过',
        },
      ];
    } else {
      let canAccept = allow_accept_list.includes(this.props.selfUUID);

      return canAccept
        ? [
            {
              label: '接受',
              onClick: () => this.props.dispatch(acceptDiceRequest(uuid)),
            },
          ]
        : [
            {
              label: this.props.me ? '等待对方处理' : '等待处理',
            },
          ];
    }
  }
}

module.exports = connect((state) => ({
  selfUUID: state.getIn(['user', 'info', 'uuid']),
}))(DiceRequest);