import { useConverseDetail } from '@redux/hooks/chat';
import { useCallback, useEffect, useContext, useState, useRef } from 'react';
import { isUserUUID } from '@shared/utils/uuid';
import { sendStopWriting, sendStartWriting } from '@shared/api/event';
import { useTRPGDispatch } from '@shared/hooks/useTRPGSelector';
import { sendMsg as sendMsgAction } from '@redux/actions/chat';
import { MsgType } from '@redux/types/chat';
import { MsgDataManager } from '@shared/utils/msg-helper';
import _isNil from 'lodash/isNil';
import { useMsgContainerContext } from '@shared/context/MsgContainerContext';
import { useSelectedGroupActorInfo } from '@redux/hooks/group';
import { GroupInfoContext } from '@shared/context/GroupInfoContext';

/**
 * 消息输入相关事件
 * @param converseUUID 会话UUID
 */
export function useMsgSend(converseUUID: string) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<any>(null);
  const converse = useConverseDetail(converseUUID);
  const converseType = converse?.type;
  const dispatch = useTRPGDispatch();
  const { replyMsg, clearReplyMsg } = useMsgContainerContext();
  const groupInfo = useContext(GroupInfoContext);
  const currentGroupUUID = groupInfo?.uuid;

  // 获取选中团角色的信息 仅group类型会话有用
  const selectedGroupActorInfo = useSelectedGroupActorInfo(converseUUID);

  useEffect(() => {
    // 当当前会话发生变化时，清空回复消息
    clearReplyMsg();
  }, [converseUUID]);

  /**
   * 发送消息到远程服务器
   */
  const sendMsg = useCallback(
    (message: string, type: MsgType) => {
      if (converseType === 'user') {
        if (isUserUUID(converseUUID)) {
          // 通知服务器告知converseUUID当前用户停止输入
          sendStopWriting('user', converseUUID);
        }

        dispatch(
          sendMsgAction(converseUUID, {
            message,
            is_public: false,
            is_group: false,
            type,
          })
        );
      } else if (converseType === 'group' || converseType === 'channel') {
        sendStopWriting('group', converseUUID);

        const msgDataManager = new MsgDataManager();

        // 选中的角色
        if (!_isNil(selectedGroupActorInfo)) {
          msgDataManager.setGroupActorInfo(selectedGroupActorInfo);
        }

        // 回复消息
        if (!_isNil(replyMsg)) {
          msgDataManager.setReplyMsg(replyMsg);
          clearReplyMsg();
        }

        dispatch(
          sendMsgAction(null, {
            converse_uuid: converseUUID,
            group_uuid: currentGroupUUID,
            message,
            is_public: true,
            is_group: true,
            type,
            data: msgDataManager.toJS(),
          })
        );
      }
    },
    [
      converseUUID,
      converseType,
      selectedGroupActorInfo,
      replyMsg,
      clearReplyMsg,
      currentGroupUUID,
    ]
  );

  const handleSendMsg = useCallback(() => {
    const type = 'normal';
    if (!!message) {
      sendMsg(message, type);
      inputRef.current?.focus();
      setMessage('');
    }
  }, [message, sendMsg]);

  // 发送输入状态
  useEffect(() => {
    if (message === '') {
      sendStopWriting(converseType, converseUUID);
    } else {
      sendStartWriting(converseType, converseUUID, message);
    }
  }, [converseType, message]);

  return { message, setMessage, handleSendMsg, inputRef };
}
