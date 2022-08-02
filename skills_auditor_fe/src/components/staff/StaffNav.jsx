import Nav from 'react-bootstrap/Nav';
import './StaffNav.css';

function StaffNav() {
    
    return (
        <div >
        <Nav defaultActiveKey="/" className="Container" role="navigation" aria-label="Staff Navigation" >
          <Nav.Link href="/staff/my_details"  className="NavLinks" role="link">My Information</Nav.Link>
          <h3 className="Header">Skills</h3>
          <Nav.Link href="/staff/view_edit_skill" role="link">View/ Edit Skills</Nav.Link>
          <Nav.Link href="/staff/add_skill" role="link" >Add Skill</Nav.Link>
          <br></br>
         
        
          <Nav.Link href="/" className='LogOut'>Log out</Nav.Link>
        </Nav>
        </div>
      );
}

export default StaffNav;