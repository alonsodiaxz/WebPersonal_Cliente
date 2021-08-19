import React from "react";
import { Row, Col, Button, notification, Form } from "antd";
import { deleteUser } from "../../../../API/user";
import "./DeleteUserForm.scss";

export default function DeleteUserForm(props) {
  const { setIsVisibleModal, setReloadUsers, accessToken, _id, email } = props;

  const deleteButton = () => {
    deleteUser(accessToken, _id).then((response) => {
      notification["success"]({
        message: response.message,
      });
      setReloadUsers(true);
      setIsVisibleModal(false);
    });
  };

  return (
    <Form className="delete-form">
      <Row>
        <h4> ¿Esta seguro de que quiere borrar al usuario {email}?</h4>
      </Row>
      <br />
      <Row gutter={24}>
        <Col span={12}>
          <Button
            className="delete-form__buttonleft"
            type="danger"
            onClick={() => {
              setIsVisibleModal(false);
            }}
          >
            Cancelar
          </Button>
        </Col>
        <Col span={12}>
          <Button
            className="delete-form__buttonright"
            type="primary"
            onClick={deleteButton}
          >
            Aceptar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
