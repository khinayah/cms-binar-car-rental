import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import iconhome from "../assets/img/fi_home.svg"
import iconcar from "../assets/img/fi_truck.svg"


const SideBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate()

  return (
//     <SideNav className="sidebar-nav">
      
//       <Toggle onClick={() => setIsVisible(!isVisible)} />
//       <div className="logo"></div>
//       <Nav defaultSelected="dashboard">
//         <NavItem eventKey="dashboard">
//           <NavIcon>
//             <div className="icon">
//             <img src={iconhome}  style={{width:"20px"}}/>
//             {/* <p className="font-icon">Dashboard</p> */}
//             </div>
//           </NavIcon>
//           {/* <NavText style={{background: "white"}}>DASHBOARD</NavText> */}
//         </NavItem>
//         <NavItem eventKey="cars">
//           <NavIcon>
//             {/* <i style={{fontSize: "1.75em" }}> */}
              
//               <img src={iconcar} alt="" />
//               {/* <p className="font-icon">Cars</p> */}
//             {/* </i> */}
//           </NavIcon>
//           {/* <NavText>CARS</NavText> */}
//         </NavItem>
//       </Nav>
//     </SideNav>
//   );
// };

        <Sidebar backgroundColor='#0D28A6' className='sidebar-nav'>
            <div className='logo mx-4 my-2'/>
                
            <Menu>
                {/* <SubMenu label="Dashboard"> */}
                    <MenuItem > <img src={iconhome}  style={{width:"20px"}}/> </MenuItem>
                {/* </SubMenu> */}
                {/* <SubMenu label="Cars"> */}
                    <MenuItem > <img src={iconcar} alt="" /></MenuItem>
                {/* </SubMenu> */}
            </Menu>
        </Sidebar>
    )
}

export default SideBar
