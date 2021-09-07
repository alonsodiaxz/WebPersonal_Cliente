import React from "react";
import Logo from "../../../../assets/img/png/LABM.png";
import SocialLinks from "../../SocialLinks/SocialLinks";
import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img alt="Alonso Díaz Sobrino" src={Logo} />
      <h4>
        Bienvenidos a mi web Personal, en la que os muestro un poco de mí.
      </h4>
      <SocialLinks />
    </div>
  );
}
