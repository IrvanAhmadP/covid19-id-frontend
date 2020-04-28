import React from "react";
// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

class FooterDefault extends React.Component {
  render() {
    return (
      <>
        <footer className=" footer">
          <Container>
            <hr />
            <Row className=" align-items-center justify-content-md-between">
              <Col md="12">
                <center>
                  <div className=" copyright">
                    © {new Date().getFullYear()}{" "}
                      Irvan Ahmad P.<br/>
                       Template oleh&nbsp;
                    <a
                      href="https://www.creative-tim.com?ref=adsr-footer"
                      target="_blank"
                      rel="noopener noreferrer">
                      Creative Tim
                    </a>
                </div>
                </center>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default FooterDefault;
