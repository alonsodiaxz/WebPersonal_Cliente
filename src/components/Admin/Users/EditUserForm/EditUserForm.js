import React from "react";
import "./EditUserForm.scss";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useCallback } from "react";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { uploadUser, getAvatar, uploadAvatar } from "../../../../API/user";
import { getAccessToken } from "../../../../API/auth";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatar(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);
  useEffect(() => {
    if (avatar) {
      setUserData({
        ...userData,
        avatar: avatar.file,
      });
    }
  }, [avatar]);

  const updateUser = (ev) => {
    ev.preventDefault();
    const token = getAccessToken();
    let userUpdate = userData;

    if (userUpdate || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellidos y email son obligatorios.",
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatar(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        uploadUser(token, userData, user._id).then((resultado) => {
          notification["success"]({
            message: resultado.message,
          });
          window.location.reload();
        });
      });
    } else {
      uploadUser(token, userData, user._id).then((resultado) => {
        notification["success"]({
          message: resultado.message,
        });
        window.location.reload();
      });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <h2> {user.email}</h2>
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      ></EditForm>
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyBoard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Item } = Form;
  const { Option } = Select;

  return (
    <Form className="edit-user-form" onSubmitCapture={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nombre"
              className="edit-user-form__input"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Item>
        </Col>
        <Col span={12}>
          <Item>
            <Input
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Apellidos"
              className="edit-user-form__input"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Item>
            <Input
              prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Correo electrónico"
              className="edit-user-form__input"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Item>
        </Col>

        <Col span={12}>
          <Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={(ev) =>
                setUserData({
                  ...userData,
                  role: ev,
                })
              }
              value={userData.role}
            >
              <Option value="admin"> Administrador</Option>
              <Option value="editor"> Editor</Option>
              <Option value="reviewer"> Revisor</Option>
            </Select>
          </Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e.target.value,
                })
              }
            ></Input>
          </Item>
        </Col>
        <Col span={12}>
          <Item>
            <Input
              prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Repetir contraseña"
              onChange={(e) =>
                setUserData({
                  ...userData,
                  repeatPassword: e.target.value,
                })
              }
            ></Input>
          </Item>
        </Col>
      </Row>
      <Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar usuario
        </Button>
      </Item>
    </Form>
  );
}
