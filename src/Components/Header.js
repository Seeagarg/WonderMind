import React,{useState} from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'
import { Sidebar } from 'primereact/sidebar';
import SideBarComponent from './SideBarComponent';
import logo from '../Assets/logo.png'


const Header = ({active = 1}) => {

  const [sidebar,setSidebar] = useState(false)

  return (
    <div className={classes.container}>
    <Link to='/' className={classes.logo}>
   <img src={logo} alt='...'  />
    </Link>
    {/* <div className={classes.tabs}>
    <Link to='/' className={`${classes.tab} ${active == 1 && classes.active}`}>
    Home
    </Link>
    <Link to='/category/Biology' className={`${classes.tab} ${active == 2 && classes.active}`}>
    Biology
    </Link>
    <Link to='/category/Ecology' className={`${classes.tab} ${active == 3 && classes.active}`}>
    Ecology
    </Link>
  
    <Link to='/category/Galaxy' className={`${classes.tab} ${active == 4 && classes.active}`}>
    Galaxy
    </Link>
    </div> */}

    <div className={classes.icon}>
    <i className='pi pi-sliders-h' style={{fontSize:'2rem'}} onClick={()=>setSidebar(!sidebar)}></i>
    </div>

    <Sidebar visible={sidebar} onHide={()=>setSidebar(!sidebar)} className={classes.sidebar}>
    <SideBarComponent/>
    </Sidebar>
   
    </div>
  )
} 

export default Header
