import React from "react";
import "./navigation.scss";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  return (
    <>
      <Navbar sticky="top" expand="sm" className="bg-body-tertiary, navigation">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <img
          src="https://st5.depositphotos.com/78668328/65648/v/600/depositphotos_656484306-stock-illustration-cinema-film-icon-film-reel.jpg"
          width="60"
          height="70"
          className="d-inline-block align-top"
          alt="logo"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            borderRadius: "35%",
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} to={"/popular" && "/"} ClassName="active">
              Popular Movies Now
            </Nav.Link>
            <Nav.Link as={NavLink} to="/upcomingMovies" ClassName="active">
              Upcoming Movies
            </Nav.Link>
            <Nav.Link as={NavLink} to="/topRated" ClassName="active">
              Top Rated
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
export default Navigation;
