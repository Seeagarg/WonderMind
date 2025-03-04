import React,{useEffect,useState} from 'react'
import classes from './SidebarComponent.module.css'
import HomeIcon from '@mui/icons-material/Home';
import StreamIcon from '@mui/icons-material/Stream';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import RecyclingIcon from '@mui/icons-material/Recycling';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {Link, useLocation} from 'react-router-dom'
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import img from '../Assets/wondermind.jpeg'

const SideBarComponent = () => {

  const [active,setActive] = useState(1)
  const {pathname} = useLocation();
  console.log(pathname)


  useEffect(()=>{

    if(pathname == '/'){
      setActive(1)
    }
    else if(pathname == '/all-videos'){
      setActive(2)
    }
    else if(pathname == '/favorites'){
      setActive(3)
    }
    else if(pathname == '/category/Biology'){
      setActive(4)
    }
    else if(pathname == '/category/Ecology'){
      setActive(5)
    }
    else if(pathname == '/category/Galaxy'){
      setActive(6)
    }
    else if(pathname == '/watch-later'){
      setActive(7)
    }
    else{
      setActive(8)
    }
    

  },[pathname])



  return (
    <>
    <div className={classes.container}>
     <div className={classes.break}>
        </div>
      <Link to='/' className={`${classes.tab} ${active==1 && classes.active}`}>
      <HomeIcon className={`${classes.icon} ${active==1 && classes.active_icon}`}/> Home
      </Link>
      <Link to='/all-videos'  className={`${classes.tab} ${active==2 && classes.active}`}>
      <StreamIcon className={`${classes.icon} ${active==2 && classes.active_icon}`}/> All
      </Link>
      <Link to='/favorites'  className={`${classes.tab} ${active==3 && classes.active}`}>
      <StarPurple500Icon className={`${classes.icon} ${active==3 && classes.active_icon}`}/> Favorites
      </Link>
      {/* <div  className={`${classes.tab} ${active==4 && classes.active}`}>
      <PlayCircleFilledIcon className={classes.icon}/> Ongoing
      </div> */}
      <div className={classes.break}>
      </div>
      
    <Link to='/category/Biology' className={`${classes.tab} ${active==4 && classes.active}`}>
    <PsychologyIcon className={`${classes.icon} ${active==4 && classes.active_icon}`}/> Biology
    </Link>
    <Link to='/category/Ecology' className={`${classes.tab} ${active==5 && classes.active}`}>
      <RecyclingIcon className={`${classes.icon} ${active==5 && classes.active_icon}`}/> Ecology
    </Link>
    <Link to='/category/Galaxy' className={`${classes.tab} ${active==6 && classes.active}`}>
    <RocketLaunchIcon className={`${classes.icon} ${active==6 && classes.active_icon}`}/> Galaxy
    </Link>
    <div className={classes.break}>
      </div>
      <Link to='/watch-later'  className={`${classes.tab} ${active == 7 && classes.active}`}>
    <QueuePlayNextIcon className={`${classes.icon} ${active==7 && classes.active_icon}`}/> WatchList
    </Link>

      <div className={classes.top}>
      <img src={img} alt='....' className={classes.wm_img} />
      </div>
    </div>
    </>
  )
}

export default SideBarComponent
