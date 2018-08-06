const {
  RESET,
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_PROFILE_CARD,
  HIDE_PROFILE_CARD,
  SHOW_SLIDE_PANEL,
  HIDE_SLIDE_PANEL,
  SWITCH_MENU_PANNEL,
  SET_LAST_DICE_TYPE,
  CHANGE_NETWORK_STATE,
  UPDATE_SOCKET_ID,
} = require('../constants');
const immutable = require('immutable');

const initialState = immutable.fromJS({
  showAlert: false,
  showAlertInfo: {},
  showLoading: false,
  showLoadingText: '加载中...',
  showModal: false,
  showModalBody: undefined,
  showToast: false,
  showToastText: '',
  showProfileCard: false,
  showProfileCardUUID: '',
  showSlidePanel: false,
  showSlidePanelInfo: {
    title: '',
    content: '',
  },
  menuIndex: 0,
  menuPannel: null,
  network: {
    isOnline: false,
    tryReconnect: false,
    msg: '',
  },
  socketId: '',
  lastDiceType: 'basicDice',
})

module.exports = function ui(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return state.set('showModal', false);
    case SHOW_ALERT: {
      let showAlertInfo = action.payload || {};
      return state.set('showAlert', true).set('showAlertInfo', immutable.fromJS(showAlertInfo));
    }
    case HIDE_ALERT:
      return state.set('showAlert', false).set('showAlertInfo', immutable.Map());
    case SHOW_LOADING:
      return state.set('showLoading', true).set('showLoadingText', action.text || '加载中...');
    case HIDE_LOADING:
      return state.set('showLoading', false);
    case SHOW_MODAL:
      return state.set('showModal', true).set('showModalBody', immutable.fromJS(action.payload));
    case HIDE_MODAL:
      return state.set('showModal', false).set('showModalBody', undefined);
    case SHOW_TOAST:
      return state.set('showToast', true).set('showToastText', action.text || '');
    case HIDE_TOAST:
      return state.set('showToast', false);
    case SHOW_PROFILE_CARD:
      return state.set('showProfileCard', true).set('showProfileCardUUID', action.uuid);
    case HIDE_PROFILE_CARD:
      return state.set('showProfileCard', false);
    case SHOW_SLIDE_PANEL:
      return state.set('showSlidePanel', true).set('showSlidePanelInfo', immutable.fromJS(action.payload));
    case HIDE_SLIDE_PANEL:
      return state.set('showSlidePanel', false);
    case SWITCH_MENU_PANNEL:
      return state
        .set('menuIndex', action.menuIndex)
        .set('menuPannel', action.payload);
    case SET_LAST_DICE_TYPE:
      return state
        .set('lastDiceType', action.payload);
    case CHANGE_NETWORK_STATE:
      return state.set('network', immutable.fromJS(action.payload));
    case UPDATE_SOCKET_ID:
      return state.set('socketId', action.socketId);
    default:
      return state;
  }
}