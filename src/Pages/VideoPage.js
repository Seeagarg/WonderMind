import React,{useEffect,useState,useCallback,useRef} from 'react'
import ReactPlayer from 'react-player'
import classes from './VideoPage.module.css'
import Header from '../Components/Header'
import { addOngoingVideo, addPostView, AddToWatchLater, CheckVideoAddedToWatchLaterByUser, CheckVideoLikeByUser, deleteOngoing, GetVideoById, GetVideosByCategory, LikeVideo, RemoveFromWatchLater, RemoveLike } from '../Services/ApiFunction'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ShareButton from '../Components/ShareButton'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import Lottie from 'lottie-react'
import loader from '../Animations/loader3.json'
import { Skeleton } from 'primereact/skeleton';


const VideoPage = () => {
  const videoRef = useRef(null);

  const navigate = useNavigate()
  const {id} = useParams();

  const host = window.location.hostname;
  console.log(host)

  const url = `http://${host}:3000/video/${id}`

  const [video,setVideo] = useState([])
  const [loading,setLoading] = useState(false)
  const [similarLoading,setSimilarLoading] = useState(false)
  const [category,setCategory] = useState(null)
  const [videos,setVideos] = useState([])
  const [like,setLike] = useState();
  const [watchLater,setWatchLater] = useState()
  const [watchTime, setWatchTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchData=async()=>{
    setLoading(true)
    const res = await GetVideoById(id);
    setVideo(res[0]);
    setCategory(res[0].category)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [id])

  useEffect(()=>{
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: 'smooth', // Adds a smooth scrolling effect
    });
  },[id])




  const fetchVideoData=useCallback(
    async() => {
        try{
          setSimilarLoading(true)
            const res = await GetVideosByCategory(category);
            
                let filteredVideos = res;
                
                   filteredVideos = res.filter((video) => video?.id !== Number(id));
                    const shuffledVideos = filteredVideos.sort(() => 0.5 - Math.random());
                    const selectedVideos = shuffledVideos.slice(0, 10);

                    setVideos(selectedVideos); 
                    setSimilarLoading(false);
                    return;
            
           
        }
        catch(err){
            console.log(err);
        }
        setSimilarLoading(false);
    },
    [category,id],
)




useEffect(()=>{
  fetchVideoData()
},[fetchVideoData])

const [show,setShow] = useState(false)


const handleShare=()=>{
  setShow(!show)
}

const handleShareClose=()=>{
  setShow(false);
}

const handleLike=async()=>{

  try{
  const ipResponse = await axios.get('https://api64.ipify.org?format=json');
  const userIp = ipResponse.data.ip;

  const data = {
    user:userIp,
    id:id
  }

  const res = await LikeVideo(data);
  console.log(res)
  toast.success(res.message)
  setLike(true)
  setVideo((prev)=>{
    return {...prev,like_count:prev.like_count+1}
  })
  }
  catch(err){
    console.log(err)
  }
}

const handleRemoveLike=async()=>{
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
  setLike(false)
  setVideo((prev)=>{
    return {...prev,like_count:prev.like_count-1}
  })
  }
  catch(err){
    console.log(err)
  }
}

const VideoLiked=async()=>{
  try{
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
  const userIp = ipResponse.data.ip;

  const data = {
    user:userIp,
    id:id
  }

  const res = await CheckVideoLikeByUser(data);
  console.log(res);

  if(res.length>0){
    setLike(true)
  }
  else{
    setLike(false)
  }

  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  VideoLiked()
},[id])


const VideoAddedToWatchLater=async()=>{
  try{
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
  const userIp = ipResponse.data.ip;

  const data = {
    user:userIp,
    id:id
  }

  const res = await CheckVideoAddedToWatchLaterByUser(data);
  console.log(res);

  if(res.length>0){
    setWatchLater(true)
  }
  else{
    setWatchLater(false)
  }

  }
  catch(err){
    console.log(err)
  }
}

useEffect(()=>{
  VideoAddedToWatchLater()
},[id])



const handlePlay = () => {
  setIsPlaying(true);
  console.log(`Video Started: ${video?.name}`);
};

const handlePause = () => {
  setIsPlaying(false);
  console.log(`Video Paused at ${watchTime}s: ${video?.name}`);
};

const handleEnded = () => {
  console.log(`Video Finished: ${video?.name}`);
  try{
    const data={
      id:id
    }
    const res = addPostView(data)
    console.log(res)
    DeleteOngoinVideo()
  }
  catch(err){
    console.log(err)
  }
};




const handleAddToWatchLater=async()=>{
  try{
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
  const userIp = ipResponse.data.ip;

  const data = {
    user:userIp,
    id:id
  }

  const res = await AddToWatchLater(data);
  console.log(res)
  toast.success(res.message)
  setWatchLater(true)
  }
  catch(err){
    console.log(err)
  }
}


const handleRemoveFromWatchLater=async()=>{
  try{
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
  const userIp = ipResponse.data.ip;

  const data = {
    user:userIp,
    id:id
  }

  const res = await RemoveFromWatchLater(data);
  console.log(res)
  toast.success(res.message)
  setWatchLater(false)
  }
  catch(err){
    console.log(err)
  }
}


const AddOngoingVideo=async()=>{
  try{

    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
    const userIp = ipResponse.data.ip;
  
    const data = {
      user:userIp,
      id:id,
      time:watchTime,
    }

    const res = await addOngoingVideo(data) 
    console.log(res)
  }
  catch(err){
    console.log(err)
  }
}


useEffect(()=>{
  return () => {
    if (watchTime !== 0) {
      AddOngoingVideo(); 
    }
  };
 
},[navigate])

const DeleteOngoinVideo=async()=>{
  try{
    const ipResponse = await axios.get('https://api64.ipify.org?format=json');
    const userIp = ipResponse.data.ip;
  
    const data = {
      user:userIp,
      id:id,
    }

    const res = await deleteOngoing(data)
    console.log(res.data)
  }
  catch(err){
    console.log(err)
  }
}





  


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
    <Header/>
   <div className={classes.main}>
   <div className={classes.left}>
   
   <div className={classes.videoPlayer}>
   <ReactPlayer
         ref={videoRef}
             url={video?.video_url}
             controls
         playing={true}
         width='100%'
         
        //  height="75%"
         loop={false}
         muted={true}
         playbackRate={1}
         config={{
           file: {
             attributes: {
               preload: 'auto',
               crossOrigin: 'anonymous',
               playsInline: true,
             },
           },
         }}
         className={classes.player}
         onProgress={({ playedSeconds }) => setWatchTime(playedSeconds)}
  onPlay={handlePlay}
  onPause={handlePause}
  onEnded={handleEnded}
           />
   </div>
   <div className={classes.title}>
   | {video?.name} - {category}
   </div>
   <div className={classes.desc_div}>
   <div className={classes.desc}>
   {video?.desc}
   </div>
   <div className={classes.rightt}>
   <div  className={classes.right_desc}>
  {
    like ?
    <div className={`${classes.like} ${classes.like_active}`} onClick={handleRemoveLike} > <i className={`pi pi-thumbs-up-fill`}></i> {video?.like_count} </div>
    :
    <div className={classes.like} onClick={handleLike} > <i className={`pi pi-thumbs-up`}></i> {video?.like_count} </div>
  }
   <div className={`${classes.share} ${show && classes.shareActive}`} onClick={handleShare}><i className='pi pi-share-alt'></i> share</div>
   <ShareButton  videoUrl={url} title={video?.name} showOptions = {show} handleShareClose={handleShareClose}/>
   
   {
    !watchLater ?
    <div className={classes.watchLater} onClick={handleAddToWatchLater}><i className='pi pi-plus' ></i> Add to WatchList</div>
    :
    <div className={`${classes.watchLater} ${classes.like_active} `} onClick={handleRemoveFromWatchLater}><i className='pi pi-minus' ></i> Remove from WatchList</div>
   }

   </div>
  
   

   </div>
   </div>
    </div>
    <div className={classes.right}>
    {
      similarLoading?
      <>
      {
        videos.map((item)=>(
        <div className={classes.card} >
        <div className={classes.img_div}>
        <Skeleton className="custom-skeleton" width="10rem" height="4rem"></Skeleton>

        </div>
        <div className={classes.details} style={{gap:'0.5rem'}}>
        <Skeleton className="custom-skeleton"  height="0.5rem" ></Skeleton>
        <Skeleton className="custom-skeleton" height="0.5rem"></Skeleton>

        </div>
        </div>
        ))
      }
      </>
      :
      
      
      videos && videos.map((item,idx)=>(
        <Link to={`/video/${item?.id}`} key={idx} className={classes.card}>
       <div className={classes.img_div}>
       <img src={item?.thumbnail_url} className={classes.img}
        // onLoad={handleImageLoad} 
       />
       <PlayArrowIcon className={classes.play_icon} fontSize='large'/>
       </div>
        <div className={classes.details}>
          <p className={classes.card_title}>{item?.name}</p>
         
          <div className={classes.card_like}>
            <p> <i className='pi pi-thumbs-up'></i> : {item?.like_count}</p>
            <p><i className='pi pi-eye'></i> : {item?.views}</p>
          </div>
        </div>
        </Link>
      ))
     
    }
  
    </div>
   </div>
   
    </div>
    }
</>
  )
}

export default VideoPage
