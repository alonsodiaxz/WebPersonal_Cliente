import React, { useEffect, useState } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Row,
  Col,
  Form,
  Modal as Modalantd,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import "./ListUsers.scss";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import { getAvatar, activateUser, deleteUser } from "../../../../API/user";
import { getAccessToken } from "../../../../API/auth";
import DeleteUserForm from "../DeleteUserForm";
const { confirm } = Modalantd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  return (
    <div className="list-users">
      <div className="list-users__switch">
        <Switch
          defaultChecked
          onChange={() => setViewUsersActives(!viewUsersActives)}
        />
        <span>
          {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
        </span>
      </div>
      {viewUsersActives ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setReloadUsers={setReloadUsers}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      )}
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={() => setIsVisibleModal(!isVisibleModal)}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers,
  } = props;

  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "usuario"} ${
        user.lastname ? user.lastname : "anónimo"
      } `
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
}

function UserActive(props) {
  const {
    user,
    editUser,
    setReloadUsers,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;
  const { _id } = user;
  const [avatar, setAvatar] = useState(null);
  const accessToken = getAccessToken();

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactivateUser = async () => {
    const response = await activateUser(accessToken, _id, false);
    notification["success"]({ message: response.message });
    setReloadUsers(true);
  };

  /*const showDeleteConfirm = () => {
    confirm({
      title: "Eliminado usuario",
      content: `¿Estas seguro de que deseas eliminar ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUser(accessToken, _id)
          .then((response) => {
            notification["success"]({ message: response.message });
            setReloadUsers(true);
          })
          .catch((err) => notification["error"]({ message: err.message }));
      },
    });
  };*/

  const deleteUsers = () => {
    setIsVisibleModal(true);
    setModalTitle(
      <Form>
        <Row gutter={24}>
          <Col span={2}>
            <WarningOutlined style={{ color: "orange" }} />
          </Col>
          <Col span={22}>
            <h3> Eliminando usuario</h3>
          </Col>
        </Row>
      </Form>
    );
    setModalContent(
      <DeleteUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
        accessToken={accessToken}
        _id={_id}
        email={user.email}
      ></DeleteUserForm>
    );
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined />
        </Button>,
        <Button type="danger" onClick={deleteUsers}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."}
      ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const {
    usersInactive,
    setReloadUsers,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;
  return (
    <List
      className="user-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive
          user={user}
          setReloadUsers={setReloadUsers}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
        />
      )}
    />
  );
}

function UserInactive(props) {
  const {
    user,
    setReloadUsers,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
  } = props;
  const [avatar, setAvatar] = useState(null);
  const { _id } = user;
  const accessToken = getAccessToken();

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activateUsers = () => {
    activateUser(accessToken, _id, true)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  const deleteUsers = () => {
    setIsVisibleModal(true);
    setModalTitle(
      <Form>
        <Row gutter={24}>
          <Col span={2}>
            <WarningOutlined style={{ color: "orange" }} />
          </Col>
          <Col span={22}>
            <h3> Eliminando usuario</h3>
          </Col>
        </Row>
      </Form>
    );
    setModalContent(
      <DeleteUserForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadUsers={setReloadUsers}
        accessToken={accessToken}
        _id={_id}
        email={user.email}
      ></DeleteUserForm>
    );
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={activateUsers}>
          <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={deleteUsers}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."}
          ${user.lastname ? user.lastname : "..."}`}
        description={user.email}
      />
    </List.Item>
  );
}
