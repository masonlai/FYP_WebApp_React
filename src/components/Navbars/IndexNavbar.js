
import React from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

import {
  Link,
  withRouter,
  useLocation
} from "react-router-dom";


function IndexNavbar() {
  let _state
  const myUseState = initialValue => {
    _state = _state === undefined ? initialValue : _state
    const setState = (newValue) => {
        _state = newValue
    }
    return [_state, setState]
}
  let [navbarColor, setNavbarColor] = [];
  const location = useLocation();
  if(location.pathname != '/index'){
    [navbarColor, setNavbarColor] = myUseState("");
  }else{
    [navbarColor, setNavbarColor] = myUseState("navbar-transparent");
  }
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            style={{ fontSize: '30px', border:'ridge',padding:'5px'}}
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by MasonLai"
          >
            R.I.P
          </NavbarBrand>

          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink
                data-placement="bottom"
                target="_blank"
                title="Home page"
              >
                <i className="fa fa-home" />
                <Link to="/index" style={location.pathname != '/index' ? {color:'#403D39','font-weight': '600'}:{color:'#FFFFFF','font-weight': '600'}}>Home</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                target="_blank"
                title="Know more about us"
              >
                <i className="fa fa-users" />
                <Link to="/about" style={location.pathname != '/index' ? {color:'#403D39','font-weight': '600'}:{color:'#FFFFFF','font-weight': '600'}}>About us</Link>
                <p className="d-lg-none">About us</p>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fa fa-comments" />
                <Link to="/contact" style={location.pathname != '/index' ? {color:'#403D39','font-weight': '600'}:{color:'#FFFFFF','font-weight': '600'}}>contact</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                data-placement="bottom"
                target="_blank"
                title="Searching the page"
              >
                <i className="fa fa-sign-in"/>
               <Link to="/sign_in" style={location.pathname != '/index' ? {color:'#403D39','font-weight': '600'}:{color:'#FFFFFF','font-weight': '600'}}>sign_in</Link>
              </NavLink>
            </NavItem>

          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default withRouter(IndexNavbar);
