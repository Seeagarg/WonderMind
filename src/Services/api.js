// const base_url = 'http://localhost:5151'
const base_url = `https://wondermind.in`
// const base_url = `http://84.247.182.44:5151`
export {base_url}


const get_categories = `${base_url}/api/get-category`
export {get_categories}

const get_videos_by_category = `${base_url}/api/get-videos`
export {get_videos_by_category}

const get_all_videos = `${base_url}/api/videos`
export {get_all_videos};

const get_video_by_id = `${base_url}/api/get-video`
export {get_video_by_id};

const like_video = `${base_url}/post/like`
export {like_video}


const watch_later = `${base_url}/post/watch_later`
export {watch_later}


const post_view = `${base_url}/post/view`
export {post_view}


const check_user_like_video = `${base_url}/check/user-like`
export {check_user_like_video}

const check_user_watch_later_video = `${base_url}/check/user-watch-later`
export {check_user_watch_later_video}

const get_favorites = `${base_url}/get/liked-videos`
export {get_favorites}

const get_watch_later = `${base_url}/get/watch-later`
export {get_watch_later}


const post_ongoing = `${base_url}/post/ongoing`
export {post_ongoing}

const get_ongoing = `${base_url}/get/ongoing`
export {get_ongoing}

const get_recommended = `${base_url}/get/recommended`
export {get_recommended}
