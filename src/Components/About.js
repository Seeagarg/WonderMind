import React from 'react'
import classes from './About.module.css'
import { useNavigate } from 'react-router-dom'

const About = ({data}) => {
  const navigate = useNavigate();

  const handleButtonClick=(category)=>{
    navigate(`/category/${category}`)
  }
    
  return (
    <div className={classes.container}>
      <div className={classes.title}>
      Three Gateways to Knowledge: Biology, Ecology & the Galaxy

      <div className={classes.break}>
      </div>
      </div>
      <div className={classes.desc}>
      "Discover a world of knowledge through three fascinating categories: Biology, Ecology, and Galaxy. Dive into engaging videos about life, nature, and the mysteries of the universe—curiosity starts here!"
      </div>

      <div className={classes.main}>
      {
        data && 
        data.map((item,idx)=>(
            <>
            <div className={classes.card}>
                <div className={classes.img_div} ><img src={item.thumbnail_url} className={classes.cardImg}/></div>
                <div className={classes.cardDetails}>
                <p className={classes.cardTitle}>| {item?.category}</p>
                <p className={classes.cardDesc}>
                {item?.desc}
                 </p>
                 <button className={classes.btn} onClick={()=>handleButtonClick(item?.category)}>Explore More..</button>
                </div>
            </div>
            </>
        ))
      }
      </div>
    </div>
  )
}

export default About
