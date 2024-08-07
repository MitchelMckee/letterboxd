import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <a href="https://github.com/MitchelMckee/letterboxd">
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
