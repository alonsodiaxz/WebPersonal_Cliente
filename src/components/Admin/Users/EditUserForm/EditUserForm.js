import React from "react";
import "./EditUserForm.scss";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import {} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useCallback } from "react";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect } from "react";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    role: user.role,
    avatar: user.avatar,
  });

  useEffect(() => {
    if (avatar) {
      setUserData({
        ...userData,
        avatar: avatar,
      });
    }
  }, [avatar]);

  const updateUser = (ev) => {
    ev.preventDefault();
    console.log(userData);
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
        <Avatar size={150} src={avatar ? avatar.preview : NoAvatar} />
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
              defaultValue={userData.name}
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
              defaultValue={userData.lastname}
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
              defaultValue={userData.email}
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
              defaultValue={userData.role}
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
