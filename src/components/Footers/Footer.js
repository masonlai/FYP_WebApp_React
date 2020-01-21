import React from "react";

import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a
                  href="http://masonlai.com/"
                  target="_blank"
                >
                  Mason Lai
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <span>
              © {new Date().getFullYear()}
                &nbsp;by Mason Lai
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
