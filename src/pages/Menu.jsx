import * as React from 'react';
import "../styles/Menu.css";
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import TimelineIcon from '@mui/icons-material/Timeline';
import SummarizeIcon from '@mui/icons-material/Summarize';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react'; 
import { useSelector } from 'react-redux';


export default function Menu(){
    const navigate=useNavigate();
    const [menuOn, setMenuOn]=useState(false);
    const menuItem=["home","transaction","budget","report", "Category", "About", "setting"];
    const menuItemLink=["","transaction","budget","report", "Category", "About", "setting"];
    const [menuClass, setMenuClass]=useState("un");
    const image=useSelector(state=>state.user.photoURL);
    const [pos,setPos]=useState({top:"",width:"",pTop:"",pWidth:""});

    const menuIcon=[<HomeIcon className='menu-logo'/>, <PaidIcon className='menu-logo'/>, 
    <FlagCircleIcon className='menu-logo'/>, <TrackChangesIcon className='menu-logo'/>, <TimelineIcon className='menu-logo'/>, <SummarizeIcon className='menu-logo'/>, <CategoryIcon className='menu-logo'/>, <InfoIcon className='menu-logo'/>, <SettingsIcon className='menu-logo'/>];
    const goToPage=item=>{
        navigate("/"+item.toLowerCase());
    }
    const changeMenu=e=>{
        console.log(e);
        const rect=document.querySelector(".menu ul").getBoundingClientRect();
        const {top,width}=rect;
        console.log(top, width);
        setPos({pTop:pos.top, pWidth:pos.width, top,width});
        if(menuOn==true){
            setMenuOn(false);
            setMenuClass("ho");
        }else{
            setMenuOn(true);
            setMenuClass("un");
        }
    }
    console.log(menuOn);
    return <div className="menu">
        {menuOn==true?<KeyboardArrowRightIcon style={{position:"fixed",top:pos.pTop+"px",left:pos.pWidth+"px"}} className='menu-opener' onClick={e=>changeMenu(e)}/>:<KeyboardArrowLeftIcon style={{position:"fixed",top:pos.pTop+"px",left:pos.pWidth+"px"}} className='menu-opener' onClick={e=>changeMenu(e)}/>}
        <img src={image} alt="img" style={{width:"5vh", height:"5vh", borderRadius:"50%",position:"fixed",top:pos.pTop+"px",left:pos.pWidth/2.5+"px"}}/>
        <ul>
            {menuItem.map((item,i)=><li key={Math.random()+""} onClick={e=>navigate("/"+menuItemLink[i])}><span className={menuClass+"1"}>{menuIcon[i]}</span><span className={menuClass+"2"} onClick={e=>goToPage(item)}>{item}</span></li>)}
        </ul>
    </div>;
}