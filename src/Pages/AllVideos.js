import React,{useEffect, useState,useCallback} from 'react'
import classes from './Category.module.css'
import { GetVideos } from '../Services/ApiFunction'
import VideoList from '../Components/VideoList'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import SideBarComponent from '../Components/SideBarComponent'
import Lottie from 'lottie-react'
import loader from '../Animations/loader3.json'

const AllVideos = () => {

    const [videos,setVideos] = useState([])
    const [loading,setLoading] = useState(false)

    const fetchVideos = useCallback(
        async() => {
          setLoading(true);
          try{
            const res = await GetVideos();
            console.log(res)
            if (res && Array.isArray(res)) {
              
              setVideos(res);
            }
          }
          catch(err){
            console.log(err);
          }
          setLoading(false)
        },
        [],
      )
    
      useEffect(()=>{
        fetchVideos()
      },[fetchVideos])

   

  return (
    <>
     {

loading ?
<div className={classes.lottie}>
  <Lottie animationData={loader}
    // height={"100vh"}
    className={classes.loader}
  />
</div>
:   
    <div className={classes.container}>
    <Header  />
    
   
    <div className={classes.main}>
    <div className={classes.sidebar}>
<SideBarComponent active={2}/>
</div>
<div className={classes.sub_container}>
    <div className={classes.title}>
    All Videos
    <div className={classes.break}></div>
    </div>

    
    <div>
    <VideoList data={videos} />
    </div>
    </div>
    </div>
    <Footer/>
  </div>
     }
  </>
  )
}

export default AllVideos
