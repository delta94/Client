const React = require('react');
const { connect } = require('react-redux');
const config = require('../../../../../config/project.config.js');
const { showModal, hideModal, showProfileCard } = require('../../../../redux/actions/ui');
const { sendMsg } = require('../../../../redux/actions/chat');
const { sendDiceRequest, sendDiceInvite, sendQuickDice } = require('../../../../redux/actions/dice');
const DiceRequest = require('../dice/DiceRequest');
const DiceInvite = require('../dice/DiceInvite');
const QuickDice = require('../dice/QuickDice');
const MsgContainer = require('../../../components/MsgContainer');
const MsgSendBox = require('../../../components/MsgSendBox');

require('./ConverseDetail.scss');

class ConverseDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleSendMsg(message, type) {
    console.log('send msg:', message, 'to', this.props.converseUserUUID, 'in converse', this.props.converseUUID);
    this.props.dispatch(sendMsg(this.props.converseUserUUID, {
      message,
      is_public: false,
      is_group: false,
      type,
    }));
  }

  // 发送投骰请求
  _handleSendDiceReq() {
    this.props.dispatch(showModal(
      <DiceRequest
        onSendDiceRequest={(diceReason, diceExp) => {
          this.props.dispatch(sendDiceRequest(this.props.converseUserUUID, false, diceExp, diceReason));
          this.props.dispatch(hideModal());
        }}
      />
    ))
  }

  // 发送投骰邀请
  _handleSendDiceInv() {
    let uuid = this.props.converseUUID;
    console.log('发送投骰邀请', uuid);
    let usercache = this.props.usercache;
    let name = usercache.getIn([uuid, 'nickname']) || usercache.getIn([uuid, 'username']);
    this.props.dispatch(showModal(
      <DiceInvite
        inviteList={[name]}
        onSendDiceInvite={(diceReason, diceExp) => {
          console.log('diceReason, diceExp',diceReason, diceExp);
          this.props.dispatch(sendDiceInvite(uuid, false, diceExp, diceReason, [uuid], [name]));
          this.props.dispatch(hideModal());
        }}
      />
    ))
  }

  // 发送自由投骰
  _handleQuickDice() {
    console.log('快速投骰');
    let uuid = this.props.converseUUID;
    this.props.dispatch(showModal(
      <QuickDice
        onSendQuickDice={(diceExp) => {
          this.props.dispatch(sendQuickDice(uuid, false, diceExp));
          this.props.dispatch(hideModal());
        }}
      />
    ))
  }

  getHeaderActions() {
    const actions = []
    if(this.props.usercache.get(this.props.converseUserUUID)) {
      actions.push({
        name: '个人信息',
        icon: '&#xe611;',
        click: () => {
          this.props.dispatch(showProfileCard(this.props.converseUserUUID))
        }
      })
    }

    return actions.map((item, index) => {
      return (
        <button
          key={'group-action-'+index}
          data-tip={item.name}
          onClick={(e) => {
            e.stopPropagation();
            item.click();
          }}
        >
          <i className="iconfont" dangerouslySetInnerHTML={{__html: item.icon}}></i>
        </button>
      )
    })
  }

  render() {
    const userUUID = this.props.converseUserUUID;
    const usercache = this.props.usercache;
    let name, avatar, desc;
    if (userUUID === 'trpgsystem') {
      name = '系统消息';
      desc = 'TRPG Engine 系统消息';
      avatar = config.defaultImg.trpgsystem;
    } else {
      name = usercache.getIn([userUUID, 'nickname']) || usercache.getIn([userUUID, 'username']);
      desc = usercache.getIn([userUUID, 'desc'])
      avatar = usercache.getIn([userUUID, 'avatar']) || config.defaultImg.user;
    }
    return (
      <div className="conv-detail">
        <div className="conv-header">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <div className="title">
            <div className="main-title">{name}</div>
            <div className="sub-title">{desc}</div>
          </div>
          <div className="actions">
            {this.getHeaderActions()}
          </div>
        </div>
        <MsgContainer className="conv-container" converseUUID={this.props.converseUUID} converseUserUUID={userUUID}  isGroup={false} />
        <MsgSendBox
          converseUUID={this.props.converseUUID}
          isGroup={false}
          onSendMsg={(message, type) => this._handleSendMsg(message, type)}
          onSendDiceReq={() => this._handleSendDiceReq()}
          onSendDiceInv={() => this._handleSendDiceInv()}
          onQuickDice={() => this._handleQuickDice()}
        />
      </div>
    )
  }
}

module.exports = connect(
  state => {
    let converseUUID = state.getIn(['chat', 'selectedConversesUUID']);
    return {
      userUUID: state.getIn(['user','info','uuid']),
      selfInfo: state.getIn(['user', 'info']),
      usercache: state.getIn(['cache', 'user']),
      converseUUID,
      converseUserUUID: state.getIn(['chat', 'selectedConversesUserUUID']),
    }
  }
)(ConverseDetail);