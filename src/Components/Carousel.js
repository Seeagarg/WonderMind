import React,{useRef,useState} from 'react'
import classes from './Carousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination,Autoplay } from 'swiper/modules';
import ReactPlayer from 'react-player';
import { handleBreakpoints, width } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const Carousel = ({data}) => {

  const [videoPlay,setVideoPlay] = useState(false)

  const swiperRef = useRef()
  const navigate = useNavigate()

  const handleVideoClick=(id)=>{
    console.log(id)
    navigate(`/video/${id}`)
  }


  return (
    <div
    className={classes.container}
    onMouseEnter={() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.stop(); // Stop autoplay on hover
        setVideoPlay(true)
      }
    }}
    onMouseLeave={() => {
      if (swiperRef.current) {
        swiperRef.current.autoplay.start(); // Resume autoplay on mouse leave
        setVideoPlay(false)
      }
    }} 
  >
  <Swiper
      spaceBetween={30}
      ref={swiperRef}
      navigation={false}
      pagination={{
        clickable: true,
      }}
      autoplay={{
      delay: 2000, 
      disableOnInteraction: false, 
    }}
    effect='fade'
      modules={[ Navigation,Autoplay]}
      className="mySwiper"
      onSwiper={(swiper) => (swiperRef.current = swiper)}  // Store Swiper instance

    >
    {
      data && 
      data?.map((item,idx)=>(
        
        <SwiperSlide className={classes.slider} key={idx}>
        <img src={item?.thumbnail_url} className={classes.img} loading = "lazy" />
        
        <div className={classes.details}>
        
        <div className={classes.title}>
       | {item?.name}
        </div>
        <div className={classes.desc}>
       {item?.desc}
       <div className={classes.section3} onClick={()=>handleVideoClick(item?.id)}>
      <div className={classes.watch}>
          <div className={classes.icon_div}>
          <PlayArrowIcon fontSize='large' className={classes.icon}/>
          </div>
        </div>
        <p className={classes.watch_text}>Watch Video</p>
      </div>
        </div>
        <div className={classes.img_div}>
       <div className={classes.img_tag}> {!videoPlay ?
        <img src={item?.thumbnail_url} alt='...' className={classes.img} />
        :
        <>
        <ReactPlayer
          url={item?.video_url}
         
          controls
      playing={true}
      width="100%"
      height="100%"
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
      onClick={()=>handleVideoClick(item?.id)}
        />
        </>
        }</div>
        </div>
        </div>
      </SwiperSlide>
        
      ))
    }
      
      
    </Swiper>
    </div>
  )
}

export default Carousel
