import React,{useEffect,useCallback,useState} from 'react'
import classes from './Home.module.css'
import img from '../Assets/img.jpg'
import Header from '../Components/Header'
import SideBarComponent from '../Components/SideBarComponent'
import Carousel from '../Components/Carousel'
import TopComponent from '../Components/TopComponent'
import { GetCategories, GetVideos } from '../Services/ApiFunction'
import ContinueCarousel from '../Components/ContinueCarousel'
import About from '../Components/About'
import Footer from '../Components/Footer'
import Lottie from 'lottie-react'
import loader from '../Animations/loader3.json'

const Home = () => {

  const [loading,setLoading] = useState(false);
  const [recommended,setRecommended] = useState([])
  const [categories,setCategories] = useState([]);
  const [videos,setVideos] = useState([])
  const [uniqueCategoryVideo,setUniqueCategoryVideo] = useState([])


  const fetchVideos = useCallback(
    async() => {
      setLoading(true);
      try{
        const res = await GetVideos();
        console.log(res)
        if (res && Array.isArray(res)) {
          const shuffledVideos = res.sort(() => Math.random() - 0.5);
          setRecommended(shuffledVideos)
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


  const getUniqueCategoryVideos = () => {
    const seen = new Set();
    
    // Filter unique categories
    const uniqueVideos = videos?.filter((video) => {
      if (!seen.has(video.category)) {
        seen.add(video.category);
        return true;
      }
      return false;
    });
  
    // Sort the filtered videos by category name
    const sortedVideos = uniqueVideos.sort((a, b) => a.category.localeCompare(b.category));
  
    setUniqueCategoryVideo(sortedVideos);
  };
  useEffect(()=>{
    getUniqueCategoryVideos()
  },[videos])





  
  const fetchCategories = useCallback(
    async() => {
      setLoading(true);
      try{
        const res = await GetCategories();
        if (res && Array.isArray(res.categories)) {
          setCategories(res.categories);
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
    fetchCategories()
  },[fetchCategories])


  useEffect(()=>{
    window.scrollTo({
      top: 0, // Scroll to the top
      behavior: 'smooth', // Adds a smooth scrolling effect
    });
  },[])



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
<Header active={1}/>

<div className={classes.main}>
<div className={classes.sidebar}>
<SideBarComponent  />
</div>
<div className={classes.sub_container}>
<div className={classes.sub_main}>
<div className={classes.carousel}>
<Carousel data={videos}/>
</div>
<div className={classes.continue_watching}>
<TopComponent data={recommended?.slice(0,6)}/>
</div>

</div>
<div className={classes.continueCarousel}>
<ContinueCarousel data={videos}/>
</div>
</div>
</div>

<div className={classes.curved_line}>

</div>

<div className={classes.Main2}>
<About data={uniqueCategoryVideo}/>
</div>

<>
  <Footer/>
</>

</div>
}
   </>
  )
}

export default Home
