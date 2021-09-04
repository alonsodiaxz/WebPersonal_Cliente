import React from "react";
import { Row, Col } from "antd";
import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={3} />
        <Col lg={18}>
          <h2>
            Aprende nuevas <br /> tecnologías Web y movil.
          </h2>
          <h3>
            A través de cursos prácticos, concisos y actualizados, creador por
            <br /> profesionales con años de experiencia.
          </h3>
        </Col>
        <Col lg={3} />
      </Row>
    </div>
  );
}
