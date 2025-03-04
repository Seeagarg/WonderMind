import React, { useState,useEffect,useRef } from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  TelegramShareButton,
} from 'react-share';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import classes from './ShareButton.module.css'
import TelegramIcon from '@mui/icons-material/Telegram';

const ShareButton = ({ videoUrl, title,showOptions,handleShareClose }) => {
  // const [showOptions, setShowOptions] = useState(false);
  const websiteUrl = 'https://yourwebsite.com'; // Replace with your website URL
  const shareUrl = `${videoUrl}`;
  const dropdownRef = useRef(null); // Reference for the dropdown container



  useEffect(() => {

 const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      handleShareClose();
    }
  };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleShareClose]);


  const handleButtonClick = () => {
    handleShareClose(); // Close the dropdown when a button is clicked
  };


  return (
    <div className={classes.container}  ref={dropdownRef}>
     

      {showOptions && (
        <div  className={classes.dropdown}>
          {/* Facebook */}
          <FacebookShareButton	 url={shareUrl} quote={title} onClick={handleButtonClick}>
            <div className={`${classes.option} ${classes.facebook}`}>
              <FacebookIcon /> Facebook
            </div>
          </FacebookShareButton>

          {/* Twitter (X) */}
          <TwitterShareButton url={shareUrl} title={title} onClick={handleButtonClick}>
            <div className={`${classes.option} ${classes.twitter}`}>
              <TwitterIcon /> X (Twitter)
            </div>
          </TwitterShareButton>

          {/* WhatsApp */}
          <WhatsappShareButton url={shareUrl} title={title} onClick={handleButtonClick}>
            <div className={`${classes.option} ${classes.whatsapp}`}>
              <WhatsAppIcon /> WhatsApp
            </div>
          </WhatsappShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton url={shareUrl} title={title} onClick={handleButtonClick}>
            <div className={`${classes.option} ${classes.linkedin}`}>
              <LinkedInIcon /> LinkedIn
            </div>
          </LinkedinShareButton>

          {/* Email */}
          <TelegramShareButton url={shareUrl} title={title} onClick={handleButtonClick}>
            <div className={`${classes.option} ${classes.email}`}>
              <TelegramIcon /> Telegram
            </div>
          </TelegramShareButton>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
