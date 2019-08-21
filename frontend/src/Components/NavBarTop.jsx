import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar className="nav" light expand="sm" >
          <NavbarBrand href="/" style={{marginLeft:"10.5%", fontSize:"18px"}}>Udacity Readable API!</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
           
              
              <NavItem>
                <NavLink href="https://github.com/carlosbotto" target="_blanket"  style={{marginRight:"100px"}}>GitHub</NavLink>
              </NavItem>
              
            </Nav>
          </Collapse>
        </Navbar>
        
      </div>
    );
  }
}