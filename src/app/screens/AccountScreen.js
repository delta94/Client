const React = require('react');
const { connect } = require('react-redux');
const {
  View,
  Text,
  Image,
} = require('react-native');
const { NavigationActions } = require('react-navigation');
const sb = require('react-native-style-block');
const appConfig = require('../config.app');
const { logout } = require('../../redux/actions/user');
const ListCell = require('../components/ListCell');
const { TButton } = require('../components/TComponent');

class AccountScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: '我',
    headerTitle: '我',
    tabBarIcon: ({ tintColor }) => (
      <Text style={{fontFamily:'iconfont', fontSize: 26, color: tintColor}}>&#xe60d;</Text>
    ),
  };

  _handleLogout() {
    this.props.dispatch(logout());
  }

  render() {
    let userInfo = this.props.userInfo;
    let avatar = userInfo.get('avatar') ? {uri: userInfo.get('avatar')} : appConfig.defaultImg.user;
    return (
      <View>
        <View style={styles.userInfo}>
          <Image source={avatar} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{userInfo.get('nickname') || userInfo.get('username')}</Text>
            <Text style={styles.userdesc}>{userInfo.get('sign')}</Text>
          </View>
        </View>

        <ListCell
          title="设置"
          icon="&#xe609;"
          color="gold"
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({ routeName: 'Settings' }));
          }}
        />
        <TButton
          type="error"
          style={styles.logoutBtn}
          textStyle={{color: 'white'}}
          onPress={() => this._handleLogout()}
        >退出</TButton>
      </View>
    )
  }
}

const styles = {
  logoutBtn: [
    sb.margin(10),
  ],
  userInfo: [
    sb.direction(),
    sb.bgColor(),
    sb.border('Top', 0.5, '#ccc'),
    sb.border('Bottom', 0.5, '#ccc'),
    sb.margin(14, 0),
    sb.padding(4, 8),
    sb.alignCenter(),
    {height: 80},
  ],
  avatar: [
    sb.size(60, 60),
    sb.radius(30),
    {marginRight: 10},
  ],
  username: [
    sb.font(18),
  ],
  userdesc: [
    sb.color('#999'),
  ],
}

module.exports = connect(
  state => ({
    userInfo: state.getIn(['user', 'info']),
  })
)(AccountScreen);