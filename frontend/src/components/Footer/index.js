import "./css/Footer.css";
import "./css/screenSizing.css";
import "./css/themes.css";

import linkedinLogo from "../../assets/linkedinLogo.png";
import githubLogo from "../../assets/githubLogo.png";
import { useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState(localStorage.getItem("clientTheme"));

  return (
    <footer className={theme}>
      <h2>Created by: Krystina Bell</h2>
      <div className="githubLinkContainer" id={theme}>
        <h3>Github</h3>
        <a href="https://github.com/Lillith13" taget="_blank">
          <img src={githubLogo} className="githubLogo" />
        </a>
      </div>
      <div className="linkedInContainer" id={theme}>
        <h3>LinkedIn</h3>
        <a href="https://linkedin.com/in/krystina-bell-30523aab" taget="_blank">
          <img src={linkedinLogo} className="linkedInLogo" />
        </a>
      </div>
    </footer>
  );
}
