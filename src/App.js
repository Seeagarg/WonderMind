import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import VideoPage from './Pages/VideoPage';
import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CategoryPage from './Pages/CategoryPage';
import { ToastContainer } from "react-toastify";
import AllVideos from './Pages/AllVideos';
import Favorites from './Pages/Favorites';
import WatchLater from './Pages/WatchLater';





function App(){
  return (
    <>
      <Routes>
        <Route path='/'  element={<Home/>} />
        <Route path='/video/:id' element={<VideoPage/>} />
        <Route path='/category/:cat' element={<CategoryPage/>} />
        <Route path='/all-videos' element={<AllVideos/>} />
        <Route path='/favorites' element={<Favorites/>} />
        <Route path='/watch-later' element={<WatchLater/>} />
      </Routes>
    </>
  );
}

export default App;
