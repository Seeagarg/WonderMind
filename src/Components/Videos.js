import React from 'react'
import classes from './Videos.module.css'
import {useNavigate} from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const Videos = ({data,handleRemove}) => {


  const navigate = useNavigate()

    const handlePlay=(id)=>{
        navigate(`/video/${id}`)
    }

    

  return (
    <>
    {
      data.length>0 ?
      <div className={classes.container}>
    {
        data.length>0 && 
        data.map((item,idx)=>(
            <>
                <div className={classes.card}>
                <div className={classes.img_div} onClick={()=>handlePlay(item?.id)}  >
                <img src={item?.thumbnail_url} alt='...' className={classes.img} />
                
               
                </div>
                <div className={classes.btns}>
                <div className={classes.name}>{item?.name}</div>
              {/* <p><i className='pi pi-thumbs-up'></i> : {item?.like_count}</p>
              <p className={classes.views}><GroupIcon fontSize='small' /> : {item?.views}</p> */}
             
                {/* <button className={classes.button} onClick={()=>handlePlay(item?.id)}>Play</button> */}
                {/* <button className={`${classes.button} ${classes.remove}`} onClick={()=>handleRemove(item?.id)}>Remove</button> */}
                <DeleteForeverIcon className={`${classes.button} ${classes.remove}`} onClick={()=>handleRemove(item?.id)} />
              </div>
               

               
                </div>
            </>
        ))

        
    }
    </div>
      :
        <div className={classes.text}>
          <p >No Videos in Your List!!</p>
        </div>
    }
    </>
  )
}

export default Videos
