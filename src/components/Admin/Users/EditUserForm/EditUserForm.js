import React from "react";
import "./EditUserForm.scss";
import { Avatar, Form, Input, Select, Button, Row, Col } from "antd";
import {} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useCallback } from "react";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });

  const updateUser = (ev) => {
    ev.preventDefault();
    console.log(userData);
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <h2> {user.email}</h2>
      <EditForm
        user={user}
        userData={userData}
        setUserData={setUserData}
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
  const { user, userData, setUserData } = props;
  const { Item } = Form;
  console.log(user);

  return (
    <Form className="edit-user-form">
      <Item>
        <Input
          type="name"
          name="name"
          placeholder="Nombre"
          className="edit-user-form__input"
          value={user.name}
        />
      </Item>
    </Form>
  );
}
