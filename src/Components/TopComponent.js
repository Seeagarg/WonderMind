import React, { useState,useCallback,useEffect } from 'react';
import classes from './TopComponent.module.css';
import fire from '../Assets/fire.png';
import ReactPlayer from 'react-player';
import {useNavigate} from 'react-router-dom'
import { getRecommendedVideos } from '../Services/ApiFunction';
const TopComponent = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const handleClick=(id)=>{
    navigate(`/video/${id}`)
  }

  const [data,setData] = useState([]);

   const fetchVideos = useCallback(
      async() => {
        setLoading(true);
        try{
          const res = await getRecommendedVideos();
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



  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <img src={fire} alt="fire" style={{ height: '2rem' }} /> Recommended
      </div>
      <div className={classes.main}>
        {data &&
          data.map((item, idx) => 
            (

            <div
              key={idx}
              className={classes.img_div}
              onMouseEnter={() => setPlayingIndex(idx)}
              onMouseLeave={() => setPlayingIndex(null)}
              onClick={()=>handleClick(item?.id)}
            >
              {playingIndex == idx 
              ?
              
               (
                <ReactPlayer
                  url={item?.video_url}
                  playing={true}
                  muted={true}
                  loop
                  width="100%"
                  height="100%"
                  className={classes.player}
                  config={{
                    file: {
                      attributes: {
                        preload: 'auto',
                        playsInline: true,
                      },
                    },
                  }}
                />
              ) : (
                <img src={item.thumbnail_url} alt="thumbnail" className={classes.img} />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopComponent;
