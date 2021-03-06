import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Keyboard,
  EmitterSubscription,
  ListRenderItem,
} from 'react-native';
import MessageHandler from '@app/components/messageTypes/__all__';
import { shouleEmphasizeTime } from '@src/shared/utils/date-helper';
import styled from 'styled-components/native';
import _get from 'lodash/get';
import { getUserInfoCache } from '@src/shared/utils/cache-helper';
import appConfig from '@app/config.app';
import { MsgListType, MsgPayload } from '@src/shared/redux/types/chat';
import _isFunction from 'lodash/isFunction';
import { MsgListContextProvider } from '@shared/context/MsgListContext';

const MSG_INIT_NUM = 10;

const LoadmoreText = styled.Text`
  text-align: center;
  padding: 10px 0;
  font-size: 10px;
`;

type MsgFlatListType = FlatList<MsgPayload>;

interface Props {
  msgList: MsgListType;
  selfInfo: any;
  nomore: boolean;
  onTouchStart?: () => void;
  onRequestMoreChatLog: () => void;
}
class MsgList extends React.PureComponent<Props> {
  isSeekingLog = false; // 正在翻阅消息记录
  listRef = React.createRef<MsgFlatListType>();
  keyboardDidShowListener: EmitterSubscription;

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.scrollToBottom.bind(this)
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.isSeekingLog === true) {
      return;
    }

    if (
      _get(prevProps, 'msgList.length') !== _get(this.props, 'msgList.length')
    ) {
      this.scrollToBottom();
    }
  }

  /**
   * 滚动到底部
   */
  scrollToBottom() {
    setTimeout(() => {
      const msgList = this.props.msgList;

      this.listRef &&
        this.listRef.current &&
        msgList.length > 0 &&
        _isFunction(this.listRef.current.scrollToIndex) &&
        this.listRef.current.scrollToIndex({ index: 0 });

      // 因为使用了inverted属性因此滚到底部对于list的逻辑是滚到顶部
    }, 130);
  }

  /**
   * 处理滚动事件
   */
  handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset;
    if (offset.y < 10) {
      // 当触底时(预留10像素, 因为列表倒置所以列表的底部就是0)
      this.isSeekingLog = false;
    } else {
      this.isSeekingLog = true; // 如果滚动后不是在底部则视为正在查阅历史记录
    }
  };

  /**
   * 处理加载更多消息
   */
  handleGetMoreLog = () => {
    if (this.props.nomore === true) {
      // 如果没有更多数据了。则跳过
      return;
    }

    this.props.onRequestMoreChatLog();
    this.isSeekingLog = true;
  };

  renderMsgListFooter() {
    const { msgList, nomore } = this.props;

    if (msgList.length < MSG_INIT_NUM) {
      return null;
    }

    return nomore ? (
      <LoadmoreText>没有更多记录了</LoadmoreText>
    ) : (
      <TouchableOpacity onPress={this.handleGetMoreLog}>
        <LoadmoreText>上滑加载更多</LoadmoreText>
      </TouchableOpacity>
    );
  }

  renderItem: ListRenderItem<MsgPayload> = ({ item, index }) => {
    const msgList = this.props.msgList;

    // 因为列表是倒转的。所以第一条数据是最下面那条
    // UI中的上一条数据应为msgList的下一条
    const prevDate =
      index < msgList.length - 1 ? _get(msgList, [index + 1, 'date']) : 0;
    const isMe = item.sender_uuid === this.props.selfInfo.uuid;
    const senderInfo = isMe
      ? this.props.selfInfo
      : getUserInfoCache(item.sender_uuid);
    const name = senderInfo.nickname || senderInfo.username;
    const avatar = senderInfo.avatar;
    const defaultAvatar =
      item.sender_uuid === 'trpgsystem'
        ? appConfig.defaultImg.trpgsystem
        : appConfig.defaultImg.user;
    const date = item.date;

    const emphasizeTime = shouleEmphasizeTime(prevDate, date);

    return (
      <MessageHandler
        type={item.type}
        me={isMe}
        name={name}
        avatar={avatar || defaultAvatar}
        emphasizeTime={emphasizeTime}
        info={item}
      />
    );
  };

  render() {
    const { msgList, onTouchStart } = this.props;

    return (
      <MsgListContextProvider msgList={msgList}>
        <FlatList<MsgPayload>
          style={{ flex: 1 }}
          ref={this.listRef}
          data={msgList}
          inverted={true}
          keyExtractor={(item) => item.uuid}
          onTouchStart={onTouchStart}
          onScroll={this.handleScroll}
          onEndReached={this.handleGetMoreLog}
          onEndReachedThreshold={0.1}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderMsgListFooter()}
        />
      </MsgListContextProvider>
    );
  }
}

export default MsgList;
