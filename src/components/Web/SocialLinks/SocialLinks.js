import React from "react";
import { InstagramOutlined, GithubOutlined } from "@ant-design/icons";
import { ReactComponent as Youtube } from "../../../assets/img/svg/youtube.svg";
import { ReactComponent as Linkedin } from "../../../assets/img/svg/linkedin.svg";
import { ReactComponent as Facebook } from "../../../assets/img/svg/facebook.svg";
import { ReactComponent as Twitter } from "../../../assets/img/svg/twitter.svg";

import "./SocialLinks.scss";

//////////////////////
/////////NOTA///////// --> El target="_blank" es para abrir un enlace en una pestaña nueva
//////////////////////

export default function SocialLinks() {
  return (
    <div className="social-links">
      <a
        href="https://www.youtube.com/watch?v=5hFd6zGkxLE"
        className="youtube"
        target="_blank"
        rel="noreferrer"
      >
        <Youtube />
      </a>
      <a
        href="https://twitter.com/alonsodiazsobri"
        className="twitter"
        target="_blank"
        rel="noreferrer"
      >
        <Twitter />
      </a>
      <a
        href="https://www.instagram.com/alonsodiaz6/"
        className="instagram"
        target="_blank"
        rel="noreferrer"
      >
        <InstagramOutlined />
      </a>
      <a
        href="https://github.com/alonsodiaxz"
        className="github"
        target="_blank"
        rel="noreferrer"
      >
        <GithubOutlined />
      </a>
    </div>
  );
}
