import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>

        <LinkContainer to="/users">
          <Navbar.Brand style={{ fontWeight: "600", color: "#0d6efd" }}>
            CRUD APP
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center">

            {user && (
              <>
                <LinkContainer to="/users">
                  <Nav.Link className="mx-2 fw-semibold text-dark">
                    Users
                  </Nav.Link>
                </LinkContainer>

                {user.role === "admin" && (
                  <LinkContainer to="/create">
                    <Nav.Link className="mx-2 fw-semibold text-dark">
                      Create
                    </Nav.Link>
                  </LinkContainer>
                )}

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="ms-3 px-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;