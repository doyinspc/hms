/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed by{" "}
          
          . Powered by{" "}
          <a
            href=""
            target="_blank"
          >
            {process.env.REACT_APP_WEBSITE_NAME}
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
