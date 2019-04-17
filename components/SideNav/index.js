import { Nav, NavItem, NavLink } from "reactstrap"

const SideNav = props => {
  if (props.system) {
    return (
      <Nav vertical style={{ backgroundColor: "black" }}>
        <NavItem>Add College</NavItem>
        <NavItem>College List</NavItem>
      </Nav>
    )
  } else {
    return (
      <Nav vertical style={{ backgroundColor: "black" }}>
        <NavItem>Add Faculty</NavItem>
        <NavItem>Faculty List</NavItem>
      </Nav>
    )
  }
}

export default SideNav
