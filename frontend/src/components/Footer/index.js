import "./Footer.css";

import linkedinLogo from "../../assets/linkedinLogo.png";
import githubLogo from "../../assets/githubLogo.png";

export default function Footer() {
  return (
    <footer>
      <h2>Created by: Krystina Bell</h2>
      <div className="githubLinkContainer">
        <h3>Visit on Github:</h3>
        <a href="https://github.com/Lillith13" taget="_blank">
          <img src={githubLogo} className="githubLogo" />
        </a>
      </div>
      <div className="linkedInContainer">
        <h3>Visit on LinkedIn:</h3>
        <a href="https://linkedin.com/in/krystina-bell-30523aab" taget="_blank">
          <img src={linkedinLogo} className="linkedInLogo" />
        </a>
      </div>
    </footer>
  );
}
