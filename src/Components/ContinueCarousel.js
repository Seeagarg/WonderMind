import React,{useRef,useStatez,useCallback,useState,useEffect} from 'react'
import classes from './ContinueCarousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination,Autoplay} from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { getOngoingVideos } from '../Services/ApiFunction';
import axios from 'axios';



const ContinueCarousel = () => {

  const navigate = useNavigate()
    const swiperRef = useRef()

    const [data,setData] = useState([]) 
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

            const res = await getOngoingVideos(data);
            console.log(res)
            if (res && Array.isArray(res)) {
              setData(res);
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


  

    const handlePlayClick=(id)=>{
      navigate(`/video/${id}`)
    }

  return (
    <div className={classes.container}>
    {
      data.length>0 &&
      <div className={classes.title} >
    Continue Watching...
    </div>
    }
   
    <div className={classes.carousel}
    onMouseEnter={() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.stop(); // Stop autoplay on hover
        
      }
    }}
    onMouseLeave={() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start(); // Resume autoplay on mouse leave
        
      }
    }} 
    >
    <Swiper
    ref={swiperRef}
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
      autoplay={{
        delay: 2000, // Time in milliseconds between slides
        disableOnInteraction: false, // Keeps autoplay running even after interaction
      }}
    //   spaceBetween={10}
      className="mySwiper"
      breakpoints={{
    // Small devices (mobile phones, 640px and down)
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        // Medium devices (tablets, 768px and up)
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        // Large devices (desktops, 1024px and up)
        1024: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        // Extra large devices (1200px and up)
        1200: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
      }}
      modules={[Pagination,Autoplay]}
      onSwiper={(swiper) => (swiperRef.current = swiper)} 
      
    >
      {
        data && data?.map((video,idx)=>(

          <SwiperSlide className={classes.slide}>
        <img src={video?.thumbnail_url} alt="" className={classes.img} loading = "lazy" />
       {/* <div className={classes.desc}> */}
                       <div className={classes.name}>{video?.name}</div>
                         
                       {/* </div> */}
                       <div className={classes.btn_div}>
                       <button className={classes.button} onClick={()=>handlePlayClick(video?.id)}>Play</button>
                       </div>
      </SwiperSlide>
         
        ))
      }
      
    </Swiper>

    </div>
    </div>
  )
}

export default ContinueCarousel
