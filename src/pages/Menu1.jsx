import React from 'react';
import "../styles/Menu1.css";
import { IconButton } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import logo from "../assets/logo5.png";
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import TimelineIcon from '@mui/icons-material/Timeline';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import { getAuth, signOut } from 'firebase/auth';
import { changeStatus } from '../provider/reducer/userSlice';
import { Link, redirect, useNavigate } from 'react-router-dom';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const name=useSelector(state=>state.user.displayName);
  const photo=useSelector(state=>state.user.photoURL);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    console.log("this is called");
  };
  const googleSignOut=e=>{
    const auth=getAuth();
    signOut(auth).then(()=>{
        dispatch(changeStatus());
    }).catch(error=>{
        console.log(error);
    })
  }
  const goToAddress=(e,id)=>{
    navigate(id);
  }

  return (
    <div className={`side-bar ${isCollapsed ? 'collapse' : ''}`}>
      <div className="logo-name-wrapper">
        <div className="logo-name">
          <img src={logo} className="logo" alt="logo app" srcSet="" />
          <span className="logo-name__name"></span>
        </div>
        <button className="logo-name__button">
          {isCollapsed ? <ArrowCircleRightIcon onClick={handleCollapse} /> : <ArrowCircleLeftIcon onClick={handleCollapse} />}
        </button>
      </div>
      <div className="message">
        <img src={photo} alt="user photo" className="message-icon" />
        <span className="message-text">{name}</span>
        <span className="tooltip">{name}</span>
      </div>
      <ul className="features-list">
        <li className="features-item inbox active">
          <HomeIcon className="features-item-icon inbox-icon" onClick={e=>goToAddress(e,"/")}/>
          <span className="features-item-text"><Link to={"/"} style={{textDecoration:"none"}}>Home</Link></span>
          <span className="tooltip">Home</span>
        </li>
        <li className="features-item draft">
          <PaidIcon className="features-item-icon" onClick={e=>goToAddress(e,"/transaction")} />
          <span className="features-item-text"><Link to={"/transaction"} style={{textDecoration:"none"}}>Transaction</Link></span>
          {/* <span className="inbox-number"></span> */}
          <span className="tooltip">Transaction</span>
        </li>
        <li className="features-item star">
          <CategoryIcon className="features-item-icon" onClick={e=>goToAddress(e,"/category")} />
          <span className="features-item-text"><Link to={"/category"} style={{textDecoration:"none"}}>Category</Link></span>
          <span className="tooltip">Category</span>
        </li>
        <li className="features-item sent">
          <TrackChangesIcon className="features-item-icon" onClick={e=>goToAddress(e,"/budget")} />
          <span className="features-item-text"><Link to={"/budget"} style={{textDecoration:"none"}}>Budget</Link></span>
          <span className="tooltip">Budget</span>
        </li>
        <li className="features-item spam">
          <InfoIcon className="features-item-icon" onClick={e=>goToAddress(e,"/about")}/>
          <span className="features-item-text"><Link to={"/about"} style={{textDecoration:"none"}}>About</Link></span>
          <span className="tooltip">About</span>
        </li>
        <li className="features-item spam">
          <SettingsIcon className="features-item-icon" onClick={e=>goToAddress(e,"/setting")}/>
          <span className="features-item-text"><Link to={"/setting"} style={{textDecoration:"none"}}>Setting</Link></span>
          <span className="tooltip">About</span>
        </li>
      </ul>
      
      {/* ... Rest of your code ... */}
      <ul>
        <li className="features-item spam">
          <LogoutIcon onClick={e=>googleSignOut(e)}/>
          <span className="features-item-text"  onClick={e=>googleSignOut(e)}>Log out</span>
          <span className="tooltip">About</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
