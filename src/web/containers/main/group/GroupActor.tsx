import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { selectActor } from '@src/shared/redux/actions/actor';
import { showAlert, showModal } from '@src/shared/redux/actions/ui';
import {
  addGroupActor,
  removeGroupActor,
  requestUpdateGroupActorInfo,
} from '@src/shared/redux/actions/group';
import { TabsController, Tab } from '../../../components/Tabs';
import ActorSelect from '../../../components/modal/ActorSelect';
import { GroupActorCheck } from './modal/GroupActorCheck';
import { ActorType, ActorDataType } from '@src/shared/redux/types/actor';
import { GroupActorType, GroupInfo } from '@src/shared/redux/types/group';
import ActorEdit from '@src/web/components/modal/ActorEdit';
import { Tooltip } from 'antd';
import styled from 'styled-components';
import {
  getGroupActorInfo,
  getGroupActorField,
  getGroupActorTemplateUUID,
} from '@src/web/utils/data-helper';
import _get from 'lodash/get';
import { getAbsolutePath } from '@shared/utils/file-helper';
import { TRPGState } from '@redux/types/__all__';
import { isGroupManager } from '@shared/model/group';
import ActorInfo from '@web/components/modal/ActorInfo';

import './GroupActor.scss';

const GroupActorAction = styled.div`
  padding: 4px 10px;
`;

interface Props {
  selectedGroupUUID: string;
  showModal: any;
  showAlert: any;
  addGroupActor: any;
  removeGroupActor: any;
  groupInfo: GroupInfo;
  isGroupManager: boolean;
  templateCache: any;
  requestUpdateGroupActorInfo: (
    groupUUID: string,
    groupActorUUID: string,
    groupActorInfo: {}
  ) => void;
}
class GroupActor extends React.PureComponent<Props> {
  handleSendGroupActorCheck = () => {
    if (!this.props.selectedGroupUUID) {
      showAlert('请选择一个团来提交您的人物');
    }

    this.props.showModal(
      <ActorSelect
        onSelect={(actorUUID) => {
          this.props.addGroupActor(this.props.selectedGroupUUID, actorUUID);
        }}
      />
    );
  };

  // 查看人物卡
  handleShowActorProfile = (groupActor: GroupActorType) => {
    if (groupActor) {
      this.props.showModal(
        <ActorInfo
          data={getGroupActorInfo(groupActor)}
          templateUUID={getGroupActorTemplateUUID(groupActor)}
        />
      );
    } else {
      console.error('需要groupActor');
    }
  };

  /**
   * 处理团人物卡信息的编辑
   * @param groupActor 团人物卡
   */
  handleEditActorInfo(groupActor: GroupActorType) {
    const { showModal, groupInfo, requestUpdateGroupActorInfo } = this.props;
    const templateUUID = getGroupActorTemplateUUID(groupActor);

    showModal(
      <ActorEdit
        name={groupActor.name}
        avatar={groupActor.avatar}
        desc={groupActor.desc}
        data={getGroupActorInfo(groupActor)}
        templateUUID={templateUUID}
        onSave={(data) =>
          requestUpdateGroupActorInfo(groupInfo.uuid, groupActor.uuid, data)
        }
      />
    );
  }

  // 审批人物
  handleApprove(groupActorInfo: GroupActorType) {
    if (groupActorInfo) {
      this.props.showModal(
        <GroupActorCheck
          actorData={groupActorInfo.actor.info}
          templateUUID={groupActorInfo.actor.template_uuid}
          groupUUID={this.props.selectedGroupUUID}
          groupActorUUID={groupActorInfo.actor_uuid}
        />
      );
    } else {
      console.error('需要groupActor');
    }
  }

  // 移除团人物
  handleRemoveGroupActor(groupActorUUID) {
    this.props.showAlert({
      content: '你确定要删除该人物卡么？删除后无法找回',
      onConfirm: () =>
        this.props.removeGroupActor(
          this.props.selectedGroupUUID,
          groupActorUUID
        ),
    });
  }

  // 正式人物卡
  getGroupActorsList() {
    const { groupInfo } = this.props;
    const groupActors = this.props.groupInfo.group_actors;
    if (groupActors && groupActors.length > 0) {
      return groupActors
        .filter((item) => item.passed === true)
        .map((item) => {
          const groupActor: GroupActorType = item; // 团人物卡信息
          const originActor: ActorType = groupActor.actor;
          const groupActorUUID = groupActor.uuid;

          return (
            <div
              key={`group-actor#${groupActorUUID}`}
              className="group-actor-item"
            >
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${getAbsolutePath(
                    getGroupActorField(groupActor, 'avatar')
                  )})`,
                }}
              />
              <div className="info">
                {groupActorUUID ===
                _get(groupInfo, ['extra', 'selected_group_actor_uuid']) ? (
                  <div className="label">使用中</div>
                ) : null}
                <div className="name">
                  {getGroupActorField(groupActor, 'name')}
                </div>
                <div className="desc">
                  {getGroupActorField(groupActor, 'desc')}
                </div>
                <div className="action">
                  <Tooltip title="查询">
                    <button
                      onClick={() => this.handleShowActorProfile(groupActor)}
                    >
                      <i className="iconfont">&#xe61b;</i>
                    </button>
                  </Tooltip>
                  {this.props.isGroupManager && (
                    <Fragment>
                      <Tooltip title="编辑">
                        <button
                          onClick={() => this.handleEditActorInfo(groupActor)}
                        >
                          <i className="iconfont">&#xe612;</i>
                        </button>
                      </Tooltip>
                      <Tooltip title="删除">
                        <button
                          onClick={() =>
                            this.handleRemoveGroupActor(groupActorUUID)
                          }
                        >
                          <i className="iconfont">&#xe76b;</i>
                        </button>
                      </Tooltip>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          );
        });
    } else {
      return <div className="no-content">暂无卡片</div>;
    }
  }

  // 待审人物卡
  getGroupActorChecksList() {
    let groupActors = this.props.groupInfo.group_actors;
    if (groupActors && groupActors.length > 0) {
      return groupActors
        .filter((item) => item.passed === false)
        .map((item) => {
          const groupActor: GroupActorType = item; // 团人物卡信息
          return (
            <div
              key={'group-actor-check#' + groupActor.uuid}
              className="group-actor-check-item"
            >
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${getAbsolutePath(groupActor.avatar)})`,
                }}
              />
              <div className="info">
                <div className="name">{groupActor.name}</div>
                <div className="desc">{groupActor.desc}</div>
                <div className="action">
                  <Tooltip title="查询">
                    <button
                      onClick={() => this.handleShowActorProfile(groupActor)}
                    >
                      <i className="iconfont">&#xe61b;</i>
                    </button>
                  </Tooltip>
                  {this.props.isGroupManager && (
                    <Tooltip title="审批">
                      <button onClick={() => this.handleApprove(groupActor)}>
                        <i className="iconfont">&#xe83f;</i>
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          );
        });
    } else {
      return <div className="no-content">暂无卡片</div>;
    }
  }

  render() {
    return (
      <div className="group-actor">
        <TabsController>
          <Tab name="正式人物卡">
            <div className="formal-actor">
              <div className="group-actor-items">
                {this.getGroupActorsList()}
              </div>
            </div>
          </Tab>
          <Tab name="待审人物卡">
            <div className="reserve-actor">
              <div className="group-actor-check-items">
                {this.getGroupActorChecksList()}
              </div>
            </div>
            <GroupActorAction>
              <button onClick={this.handleSendGroupActorCheck}>
                <i className="iconfont">&#xe604;</i>申请审核
              </button>
            </GroupActorAction>
          </Tab>
        </TabsController>
      </div>
    );
  }
}

export default connect(
  (state: TRPGState) => {
    const selectedGroupUUID = state.group.selectedGroupUUID;
    const groupInfo = state.group.groups.find(
      (group) => group.uuid === selectedGroupUUID
    );
    const userUUID = state.user.info.uuid;
    return {
      selectedGroupUUID,
      groupInfo,
      isGroupManager: isGroupManager(groupInfo, userUUID),
    };
  },
  (dispatch: any, ownProps) => ({
    showAlert: (payload) => dispatch(showAlert(payload)),
    showModal: (body) => dispatch(showModal(body)),
    selectActor: (actorUUID: string) => dispatch(selectActor(actorUUID)),
    addGroupActor: (groupUUID: string, actorUUID: string) =>
      dispatch(addGroupActor(groupUUID, actorUUID)),
    removeGroupActor: (groupUUID: string, groupActorUUID: string) =>
      dispatch(removeGroupActor(groupUUID, groupActorUUID)),
    requestUpdateGroupActorInfo: (
      groupUUID: string,
      groupActorUUID: string,
      groupActorInfo: {}
    ) =>
      dispatch(
        requestUpdateGroupActorInfo(groupUUID, groupActorUUID, groupActorInfo)
      ),
  })
)(GroupActor);
