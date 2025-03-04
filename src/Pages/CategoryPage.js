import React,{useState,useEffect,useCallback} from 'react'
import classes from './Category.module.css'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { GetCategories, GetVideos, GetVideosByCategory } from '../Services/ApiFunction'
import VideoList from '../Components/VideoList'
import { useParams } from 'react-router-dom'
import Lottie from 'lottie-react'
import loader from '../Animations/loader3.json'

const CategoryPage = () => {

  const {cat} = useParams()

    
      const [loading,setLoading] = useState(false);
      const [recommended,setRecommended] = useState([])
      const [categories,setCategories] = useState([]);
      const [videos,setVideos] = useState([])
      const [category,setCategory] = useState([])
    
    
      const fetchVideos = useCallback(
        async() => {
          setLoading(true);
          try{
            const res = await GetVideosByCategory(cat);
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
        [cat],
      )
    
      useEffect(()=>{
        fetchVideos()
      },[fetchVideos])
    
    
    
      
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
        [cat],
      )
    
      useEffect(()=>{
        fetchCategories()
        
      },[fetchCategories])

      useEffect(()=>{
        const existing = categories.find((item)=>item.cat_name == cat)
        console.log(existing)
        setCategory(existing);
      },[categories])
    
    
    
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
      <Header active={cat == 'Biology' ? 2 : cat == 'Ecology' ? 3 : cat == 'Galaxy' ? 4 : ''} />
      <div className={classes.main}>
      <div className={classes.sub_container} >
      <div className={classes.title}>
      {cat}
      <div className={classes.break}></div>
      </div>

      <div className={classes.desc}>
     {category?.desc}
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

export default CategoryPage
