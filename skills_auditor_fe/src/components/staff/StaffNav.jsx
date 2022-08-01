import Nav from 'react-bootstrap/Nav';
import './StaffNav.css';

function StaffNav() {
    
    return (
        <div >
        <Nav defaultActiveKey="/" className="Container">
          <Nav.Link href="/my_details">My Information</Nav.Link>
          <h3 className="Header">Skills</h3>
          <Nav.Link href="/view_edit_skill">View/ Edit Skills</Nav.Link>
          <Nav.Link href="/add_skill">Add Skill</Nav.Link>
        </Nav>
        </div>
      );
}

export default StaffNav;