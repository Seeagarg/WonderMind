import React from 'react'
import classes from './VideoList.module.css'
import {useNavigate} from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group';

const VideoList = ({data}) => {

    const navigate = useNavigate()

    const handlePlay=(id)=>{
        navigate(`/video/${id}`)
    }

  return (
    <div className={classes.container}>
    {
        data && 
        data.map((item,idx)=>(
            <>
                <div className={classes.card}>
                <div className={classes.img_div}  onClick={()=>handlePlay(item?.id)}>
                <img src={item?.thumbnail_url} alt='...' className={classes.img} loading='lazy' />
                
                <div className={classes.desc}>
                <div className={classes.name}>{item?.name}</div>
                    {/* loremdhafjgh sagvdbjn asdnxcgvhwbjdn sadjgwvhkj asmdvqwui
                    loremdhafjgh sagvdbjn asdnxcgvhwbjdn sadjgwvhkj asmdvqwui */}
                </div>
                <div className={classes.btn_div} >
                <button className={classes.button} onClick={()=>handlePlay(item?.id)}>Play</button>
                </div>
                </div>
                <div className={classes.like_view}>
                <p><i className='pi pi-thumbs-up'></i> : {item?.like_count}</p>
            <p className={classes.views}><i className='pi pi-eye' fontSize='small'></i> : {item?.views}</p>
                </div>
                </div>
            </>
        ))
    }
    </div>
  )
}

export default VideoList
