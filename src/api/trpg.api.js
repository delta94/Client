const io = require('socket.io-client');
const config = require('../../config/project.config.js');
const { RESET } = require('../redux/constants');

let api = null;
const platformSocketParam = {
  jsonp: false
}
function API() {
  this.serverUrl = `${config.io.protocol}://${config.io.host}:${config.io.port}`;
  this.socket = io(this.serverUrl, platformSocketParam);
  this.emit = (event, data, cb) => {
    if(this.socket.disconnected) {
      this.socket.connect();
    }
    return this.socket.emit(event, data, cb);
  }
  this.on = this.socket.on.bind(this.socket);
}

function getApiInstance() {
  if(!api) {
    api = new API();
    console.log('new socket client connect created!');
  }

  return api;
}

function bindEventFunc(store) {
  const { addMsg, updateMsg, switchConverse } = require('../redux/actions/chat');
  const { addFriendInvite, loginWithToken } = require('../redux/actions/user');
  const { updateGroupStatus } = require('../redux/actions/group');
  const { changeNetworkStatue, showAlert, switchMenuPannel, updateSocketId } = require('../redux/actions/ui');
  const { getUserInfoCache } = require('../utils/cacheHelper');

  if(!(this instanceof API)) {
    throw new Error('bindEventFunc shound a API object class');
  }
  let api = this;
  api.on('chat::message', function(data) {
    let converseUUID = data.converse_uuid || data.sender_uuid;
    store.dispatch(addMsg(converseUUID, data));

    // web||electron通知
    if(window.document && document.hidden) {
      let isNotify = store.getState().getIn(['settings', 'system', 'notification']);
      if(isNotify) {
        let userinfo = getUserInfoCache(data.sender_uuid);
        let username = userinfo.get('nickname') || userinfo.get('username');
        let uuid = userinfo.get('uuid');
        let notification = new Notification(`来自 ${username}:`, {
          body: data.message,
          icon: userinfo.get('avatar') || config.defaultImg.trpgsystem,
          tag: 'trpg-msg',
          renotify: true,
          data: {uuid}
        });

        notification.onclick = function() {
          window.focus();
          store.dispatch(switchMenuPannel(0));
          store.dispatch(switchConverse(this.data.uuid));
        }
      }
    }
  });

  api.on('chat::updateMessage', function(data) {
    let converseUUID = data.converseUUID;
    let payload = data.payload;
    store.dispatch(updateMsg(converseUUID, payload));
  });

  api.on('player::invite', function(data) {
    store.dispatch(addFriendInvite(data));
  })
  api.on('player::tick', function(data) {
    store.dispatch(showAlert(data.msg));
    store.dispatch({type: RESET});
  })
  api.on('group::updateGroupStatus', function(data) {
    store.dispatch(updateGroupStatus(data.groupUUID, data.groupStatus));
  })

  api.on('connect', function(data) {
    store.dispatch(changeNetworkStatue(true, '网络连接畅通'));
    store.dispatch(updateSocketId(api.socket.id));
    console.log('连接成功');
  });
  api.on('connecting', function(data) {
    store.dispatch(changeNetworkStatue(false, '正在连接...', true));
    console.log('正在连接');
  });
  api.on('reconnect', function(data) {
    store.dispatch(changeNetworkStatue(true, '网络连接畅通'));
    store.dispatch(updateSocketId(api.socket.id));
    console.log('重连成功');

    let isLogin = store.getState().getIn(['user', 'isLogin']);
    if(isLogin) {
      (async () => {
        const rnStorage = require('./rnStorage.api.js');
        let uuid = await rnStorage.get('uuid');
        let token = await rnStorage.get('token');
        console.log('正在尝试自动重新登录');
        store.dispatch(loginWithToken(uuid, token));
      })()
    }
  });
  api.on('reconnecting', function(data) {
    store.dispatch(changeNetworkStatue(false, '正在连接...', true));
    console.log('重连中...');
  });
  api.on('disconnect', function(data) {
    store.dispatch(changeNetworkStatue(false, '已断开连接'));
    console.log('已断开连接');
  });
  api.on('connect_failed', function(data) {
    store.dispatch(changeNetworkStatue(false, '连接失败'));
    console.log('连接失败');
  });
  api.on('error', function(data) {
    store.dispatch(changeNetworkStatue(false, '网络出现异常'));
    console.log('网络出现异常', data);
  });
}

exports.bindEventFunc = bindEventFunc;
exports.getInstance = getApiInstance;

exports.fileUrl = config.file.url + '/file';