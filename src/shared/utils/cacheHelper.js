import {
  getUserInfo,
  getGroupInfo,
  getTemplateInfo,
} from '../../redux/actions/cache';
import immutable from 'immutable';
import { isUserUUID } from './uuid';

let _store = null;
export const attachStore = function(store) {
  _store = store;
};

export const checkUser = function(uuid, type = 'user') {
  if (uuid.toString().substr(0, 4) === 'trpg') {
    // 不检测trpg开头的内置系统用户
    return;
  }

  if (!isUserUUID(uuid)) {
    console.warn('该UUID不是一个合法的UUID:', uuid);
    return;
  }

  let store = _store;
  if (!!store && !!store.dispatch) {
    if (type === 'user') {
      exports.getUserInfoCache(uuid);
    }
  } else {
    throw new Error('checkUser func should bind store');
  }
};

export const checkTemplate = function(uuid) {
  let store = _store;
  if (!!store && !!store.dispatch) {
    const state = store.getState();
    let info = state.getIn(['cache', 'template', uuid]);
    if (!info) {
      store.dispatch(getTemplateInfo(uuid));
    }
  } else {
    throw new Error('checkUser func should bind store');
  }
};

export const savecache = function() {
  // TODO
};

export const loadcache = function() {
  // TODO
};

// 更加优化的用户信息缓存获取
let isGettingUserInfoUUID = []; // 用于防止同时请求多个相同内容
export const getUserInfoCache = function(uuid) {
  if (uuid.toString().substr(0, 4) === 'trpg') {
    return immutable.Map(); // 不检测trpg开头的内置系统用户
  }

  let store = _store;
  if (!!store && !!store.dispatch) {
    const state = store.getState();
    let info = state.getIn(['cache', 'user', uuid]);
    if (!info) {
      if (isGettingUserInfoUUID.indexOf(uuid) === -1) {
        // 没有正在获取用户信息
        console.log('没有检测到该用户缓存记录, 自动获取', 'uuid:', uuid);
        store.dispatch(
          getUserInfo(uuid, () => {
            let index = isGettingUserInfoUUID.indexOf(uuid);
            if (index !== -1) {
              isGettingUserInfoUUID.splice(index, 1);
            }
          })
        );
        isGettingUserInfoUUID.push(uuid);
      }

      return immutable.Map();
    } else {
      return info;
    }
  } else {
    throw new Error('getUserInfoCache func should bind store');
  }
};

let isGettingGroupInfoUUID = []; // 用于防止同时请求多个相同内容
export const getGroupInfoCache = function(uuid) {
  let store = _store;
  if (!!store && !!store.dispatch) {
    const state = store.getState();
    let info = state.getIn(['cache', 'group', uuid]);
    if (!info) {
      if (isGettingGroupInfoUUID.indexOf(uuid) === -1) {
        // 没有正在获取团信息
        console.log('没有检测到该团的缓存记录, 自动获取', 'uuid:', uuid);
        store.dispatch(
          getGroupInfo(uuid, () => {
            let index = isGettingGroupInfoUUID.indexOf(uuid);
            if (index !== -1) {
              isGettingUserInfoUUID.splice(index, 1);
            }
          })
        );
        isGettingGroupInfoUUID.push(uuid);
      }

      return immutable.Map();
    } else {
      return info;
    }
  } else {
    throw new Error('getGroupInfoCache func should bind store');
  }
};
