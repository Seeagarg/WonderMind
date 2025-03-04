import React,{useState,useEffect,useCallback} from 'react'
import classes from './Category.module.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import axios from 'axios'
import Videos from '../Components/Videos'
import { GetLikedVideos, RemoveLike } from '../Services/ApiFunction'
import SideBarComponent from '../Components/SideBarComponent'
import Lottie from 'lottie-react'
import loader from '../Animations/loader3.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Favorites = () => {


    const [videos,setVideos] = useState([])
        const [loading,setLoading] = useState(false)
    
        const fetchVideos = useCallback(
            async() => {
              setLoading(true);
              try{
                const ipResponse = await axios.get('https://api64.ipify.org?format=json');
                const userIp = ipResponse.data.ip;

                const data ={
                    user:userIp
                }

                const res = await GetLikedVideos(data);
                console.log(res)
                setVideos(res)

              }
              catch(err){
                console.log(err);
              }
              setLoading(false)
            },
            [],
          )


          const handleRemoveLike=async(id)=>{
            try{
              const ipResponse = await axios.get('https://api64.ipify.org?format=json');
            const userIp = ipResponse.data.ip;
          
            const data = {
              user:userIp,
              id:id
            }
          
            const res = await RemoveLike(data);
            console.log(res)
            toast.success(res.message)
            fetchVideos()
            // setLike(false)
            }
            catch(err){
              console.log(err)
            }
          }


        
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
<SideBarComponent />
</div>
<div className={classes.sub_container}>
    <div className={classes.title}>
    Your Favorites
    <div className={classes.break}></div>
    </div>

    <div>
   <Videos data={videos} handleRemove={handleRemoveLike}/>
    </div>
    </div>
    </div>
    <Footer/>
  </div>
     }
  </>
  )
}

export default Favorites
