import React from "react";
import { Row, Col, Card, Icon } from "antd";
import { ClockCircleOutlined, KeyOutlined } from "@ant-design/icons";
import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
        <h2> ¿Cómo funcionan mis cursos?</h2>
        <h3>
          Cada curso cuenta con contenido bajo la web de udemy, activa las 24
          horas al día los 365 días del año.
        </h3>
      </Col>
      <Col lg={3}> </Col>
      <Col lg={18}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon="clock-circle"
              title="Cursos y clases"
              subtitle="Cursos de entre 10  y 30 horas."
            ></CardInfo>
          </Col>
          <Col md={8}>
            <CardInfo
              icon="key"
              title="Acceso 24/7"
              subtitle="Accede a los cursos en cualquier momento, sin importar el lugar."
            ></CardInfo>
          </Col>
          <Col md={8}>
            <CardInfo
              icon="message"
              title="Aprendizaje colaborativo"
              subtitle="Aprende de los demás con los videos y los comentarios de estos para resolver dudas."
            ></CardInfo>
          </Col>
        </Row>
      </Col>
      <Col lg={3}> </Col>
    </Row>
  );
}

function CardInfo(props) {
  const { icon, title, subtitle } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      <Icon type={icon} />
      <Meta title={title} description={subtitle} />
    </Card>
  );
}
