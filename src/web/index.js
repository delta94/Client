require('moment').locale('zh_CN');
require('../utils/common');
const React = require('react');
const ReactDom = require('react-dom');
const { Provider } = require('react-redux');
const config = require('../../config/project.config.js');
const configureStore = require('../redux/configureStore');
const store = configureStore();
require('../utils/cacheHelper').attachStore(store);

const trpgApi = require('../api/trpg.api.js');
const api = trpgApi.getInstance();
trpgApi.bindEventFunc.call(api, store);

// 加载本地存储数据进行应用初始化
const rnStorage = require('../api/rnStorage.api.js');
(async () => {
  // token登录
  let uuid = await rnStorage.get('uuid');
  let token = await rnStorage.get('token');
  if(!!token && !!uuid) {
    store.dispatch(require('../redux/actions/user').loginWithToken(uuid, token));
  }

  // 系统设置
  store.dispatch(require('../redux/actions/settings').setNotificationPermission(Notification.permission));
  let systemSettings = await rnStorage.get('systemSettings') || config.defaultSettings.system;
  if(systemSettings) {
    store.dispatch(require('../redux/actions/settings').setSystemSettings(systemSettings));
  }

  // 个人设置
  let userSettings = await rnStorage.get('userSettings') || config.defaultSettings.user;
  if(userSettings) {
    store.dispatch(require('../redux/actions/settings').setUserSettings(userSettings));
  }
})();

// 检查版本, 网页版跳过检查
if(config.platform !== 'web') {
  const checkVersion = require('../utils/checkVersion.js');
  checkVersion(function(isLatest) {
    if(isLatest) {
      console.log('当前版本为最新版');
    }else {
      store.dispatch(require('../redux/actions/ui').showAlert({
        title: '检测到新版本',
        content: '检测到有新的版本, 是否现在获取',
        onConfirm: () => {
          window.open(config.github.projectUrl);
        }
      }));
    }
  })
}

const App = require('./containers/App');
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#app')
);