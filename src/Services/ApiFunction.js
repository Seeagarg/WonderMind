import { check_user_like_video, check_user_watch_later_video, get_all_videos, get_categories, get_favorites, get_ongoing, get_recommended, get_video_by_id, get_videos_by_category, get_watch_later, like_video, post_ongoing, post_view, watch_later } from "./api"
import axios from 'axios'

export const GetCategories=async()=>{
    try{
        const response = await axios.get(get_categories)
        return response.data
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const GetVideos=async()=>{
    try{
        const response = await axios.get(get_all_videos)
        return response.data.videos
    }
    catch(err){
        console.log(err)
        throw err;
    }
}


export const GetVideosByCategory=async(category)=>{
    // console.log(category)
    try{
        const response = await axios.get(`${get_videos_by_category}/${category}`)
        return response.data.videos
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const GetVideoById=async(id)=>{
    try{
        const response = await axios.get(`${get_video_by_id}/${id}`)
        return response.data.video
    }
    catch(err){
        throw err
    }
}

export const LikeVideo =async(data)=>{
    try{
        const res = await axios.post(`${like_video}`,data);
        console.log(res)
        return res.data;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const RemoveLike=async(data)=>{
    try{
        const res = await axios.delete(`${like_video}`,{
            params: data
        });
        return res.data
    }
    catch(err){
        console.log(err);
        throw err;
    }
}


export const AddToWatchLater=async(data)=>{
    try{
        const res = await axios.post(watch_later,data)
        return res.data;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const addPostView=async(id)=>{
    try{
        const res = await axios.post(post_view,id);
        return res.data
    }
    catch(err){
        console.log(err);
        throw err;
    }
}


export const RemoveFromWatchLater=async(data)=>{
    try{
        const res = await axios.delete(watch_later,{
            params: data
        })
        return res.data;
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const CheckVideoLikeByUser=async(data)=>{
    try{
        const res = await axios.post(check_user_like_video,data);
        console.log(res.data)
        return res.data
    }
    catch(err){
        throw err;
    }
}

export const CheckVideoAddedToWatchLaterByUser=async(data)=>{
    try{
        const res = await axios.post(check_user_watch_later_video,data);
        console.log(res.data)
        return res.data
    }
    catch(err){
        throw err;
    }
}

export const GetLikedVideos=async(user)=>{
    try{
        const res = await axios.get(get_favorites,{
            params:user
        });
        console.log(res.data)
        return res.data
    }
    catch(err){
        throw err;
    }
}


export const GetWatchLaterVideos=async(user)=>{
    try{
        const res = await axios.get(get_watch_later,{
            params:user
        });
        console.log(res.data)
        return res.data
    }
    catch(err){
        throw err;
    }
}


export const addOngoingVideo=async(data)=>{
    try{
        const res = await axios.post(post_ongoing,data);
        return res.data
    }
    catch(err){
        console.log(err)
        throw err;
    }
}

export const deleteOngoing=async(data)=>{
    try{
        const res = await axios.delete(post_ongoing,{params:data});
        return res.data
    }   
    catch(err){
        throw err;
    }
}

export const getOngoingVideos = async(data)=>{
    try{
        const res  = await axios.get(get_ongoing,{
            params:data
        })
        return res.data
    }
    catch(err){
        throw err;
    }
}


export const getRecommendedVideos = async(data)=>{
    try{
        const res  = await axios.get(get_recommended)
        return res.data
    }
    catch(err){
        throw err;
    }
}