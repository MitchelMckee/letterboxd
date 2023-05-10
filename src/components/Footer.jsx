import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer>
      <a href="https://github.com/MitchelMckee">
        <FontAwesomeIcon
          icon={faGithub}
          color="white"
          size="2x"
          className="github-logo"
        />
      </a>
    </footer>
  );
}

export default Footer;
