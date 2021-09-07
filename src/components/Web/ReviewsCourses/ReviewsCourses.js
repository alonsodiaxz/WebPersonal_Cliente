import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import Foto from "../../../assets/img/png/LATiger.png";
import "./ReviewsCourses.scss";

export default function ReviewsCourses() {
  return (
    <Row className="review-courses">
      <Row>
        <Col lg={3} />
        <Col lg={18} className="review-courses__title">
          <h2>
            Forma parte de los +35 mil alumnos que estan aprendiendo con los
            cursos.
          </h2>
        </Col>
        <Col lg={3} />
      </Row>
      <Row>
        <Col lg={3} />
        <Col lg={18}>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Alonso Díaz"
                subtitle="Usuario"
                avatar={Foto}
                review="Excelente página web, gran precisión en la utilización del css y muy rápida al renderizar."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="David Ramiro"
                subtitle="Usuario"
                avatar={Foto}
                review="Gran trabajo en la realización de este proyecto."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Valentina Rubio"
                subtitle="Usuario"
                avatar={Foto}
                review="Buen método para mostrar el curriculum, que mejor que practicando lo que mas te gusta."
              />
            </Col>
          </Row>
        </Col>
        <Col lg={3} />
      </Row>
    </Row>
  );
}

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className="review-courses__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      ></Meta>
    </Card>
  );
}
