import '../styles/Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { weekDays, monthDays, toDay, getMonthBoundaries, getRandomColor } from '../extra/aid';
import store from '../provider/store.jsx';
import { fetchPosts } from '../provider/reducer/postReducer.jsx';
import { useNavigate } from 'react-router-dom';
import Menu1 from './Menu1.jsx';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button, Select } from '@mui/material';

function Home() {
  const [count, setCount]=useState(0);
  const user=useSelector(state=>state.user.loggedIn);
  const userEmail=useSelector(state=>state.user.email);
  const primaries=useSelector(state=>state.posts.posts);
  const t=useSelector(state=>state.posts.transaction);
  const c=useSelector(state=>state.posts.category);
  const b=useSelector(state=>state.posts.budget);
  const [localTransaction, setLocalTransaction]=useState({});
  const [localCategory, setLocalCategory]=useState({});
  const [localBudget, setLocalBudget]=useState({});
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const segment=["Today","This week", "This month"];
  const [segmentSelector,setSegmentSelector]=useState(0);
  const [chart1, setChart1]=useState([]);
  const [firstDayOfRange, setFirstDayOfRange]=useState(new Date());
  const [lastDayOfRange, setLastDayOfRange]=useState(new Date());
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const [timing,setTiming]=useState("Today");
  //const primary=useSelector(state=>state.tr.primary);

  useEffect(() => {
      let timerFunc = setTimeout(() => {
        dispatch(fetchPosts(userEmail));
        console.log("called after rendering");
      }, 1000);

      return () => clearTimeout(timerFunc);
  },[]);

  useEffect(()=>{
    google.charts.load('current', {'packages':['corechart']});
    let data=primaries.filter(item=>item!=undefined);
    console.log(data);
    data=data[0] || {};
    const tempCategory1 = data["tempCategory1"] || {};
    const tempCategory2 = data["tempCategory2"] || {};
    const tempCategory3 = data["tempCategory3"] || {};
    console.log(tempCategory1,tempCategory2,tempCategory3);
    let temp1={},temp2={},temp3={};
    for(let key in tempCategory1){
      const tempDate=tempCategory1[key]["date"];
      temp1[key]={...tempCategory1[key],"date":new Date(tempDate)};
    }
    for(let key in tempCategory2){
      const tempDate=tempCategory2[key]["date"];
      temp2[key]={...tempCategory2[key],"date":new Date(tempDate)};
    }
    for(let key in tempCategory3){
      const tempDate=tempCategory3[key]["date"];
      temp3[key]={...tempCategory3[key],"date":new Date(tempDate)};
    }
    console.log(temp1,temp2,temp3);
    setLocalTransaction(temp1);setLocalCategory(temp2);setLocalBudget(temp3);    
    
    console.log("this 2nd effect is called!");
    //google.charts.setOnLoadCallback(drawChart);
    drawChart(0);
    drawChart2();
  },[primaries]);

  
  const drawChart=id=> {
    google.charts.load('current', {'packages':['corechart']});
    console.log(id);
    if(id==undefined)id=0;
    const {firstday,lastday}=[toDay(),weekDays(), monthDays()][id];
    console.log(toDay);

    console.log(firstday, lastday);
    let tempTransaction=Object.values(t).filter(item=>item.date>=firstday&&item.date<=lastday).map(item=>{return {name:item.category,value:parseFloat(item.amount)};});
    const res = Array.from(tempTransaction.reduce(
      (m, {name, value}) => m.set(name, (m.get(name) || 0) + value), new Map
    ), ([name, value]) => ({name, value}));
    console.log(res);
    tempTransaction=res.map(item=>[item["name"],item["value"]]);
    console.log(tempTransaction);
    //setChart1(tempTransaction);

    var data = google.visualization.arrayToDataTable([
      ['Category', 'Amount'], ...tempTransaction
    ]);
    let tempDate=""
    if(id==0){
      tempDate=firstDayOfRange.toLocaleDateString();
    }else {
      tempDate=firstDayOfRange.toLocaleDateString()+"-"+lastDayOfRange.toLocaleDateString();
    }
    var options = {
      title: "Presentation of cost: "+segment[id]+":"+(id==0?firstday.toLocaleDateString():(firstday.toLocaleDateString()+"-"+lastday.toLocaleDateString())),
      is3D:true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('home-circle-center'));

    chart.draw(data, options);
    tempTransaction=Object.values(t).filter(item=>item.date>=firstday&&item.date<=lastday).map(item=>{return {type:item.type,value:parseFloat(item.amount)};});
    let outs=0;
    let ins=0;
    tempTransaction.forEach(item=>{
      if(item.type=="out")outs+=item.value;
      if(item.type=="in")ins+=item.value;
      //console.log(outs,ins);
    });
    console.log(tempTransaction, outs, ins);
    drawChart3(outs,ins);
  }
  const drawChart2=()=>{
    const monthBoundaries=getMonthBoundaries();
    const ins=Object.values(t).filter((obj) => obj.type === "in");
    const outs=Object.values(t).filter((obj) => obj.type === "out");
    console.log(monthBoundaries, ins, outs);
    let insFiltered=[];
    let outsFiltered=[];
    for (let index = 0; index <= new Date().getMonth(); index++) {
      const {firstdate,lastdate}=monthBoundaries[index];
      const tempIn=ins.filter(item=>item.date>=firstdate && item.date<=lastdate).map(item=>parseFloat(item.amount));
      let total = tempIn.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      insFiltered.push(total);
      const tempOut=outs.filter(item=>item.date>=firstdate && item.date<=lastdate).map(item=>parseFloat(item.amount));
      total = tempOut.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      outsFiltered.push(total);
    }
    console.log(insFiltered,outsFiltered);
    let tempData=Array.from({length: new Date().getMonth()+1 }, (v, k) => k).map(item=>[months[item],insFiltered[item],outsFiltered[item]]);
    tempData=[['Month', 'In', 'Out'],...tempData];
    console.log(tempData);
    if(google.visualization==undefined)return navigate("/");
    var data = google.visualization.arrayToDataTable(tempData);

    var options = {
      title: 'Comparative analysis of in and out',
      curveType: 'function',
      legend: { position: 'bottom' }
    };
    var chart = new google.visualization.LineChart(document.getElementById('home-graph-1'));
    chart.draw(data, options);

    tempData=Array.from({length: new Date().getMonth()+1 }, (v, k) => k).map(item=>[months[item],insFiltered[item],getRandomColor()]);
    tempData=[['Month', 'Amount', { role: 'style' }],...tempData];
    if(google.visualization==undefined)return navigate("/");
    var data1 = google.visualization.arrayToDataTable(tempData);
    var options1 = {
      title: 'Income by Months',
    };
    var chart1 = new google.visualization.ColumnChart(document.querySelector('.total_income'));
    chart1.draw(data1, options1);


    tempData=Array.from({length: new Date().getMonth()+1 }, (v, k) => k).map(item=>[months[item],outsFiltered[item],getRandomColor()]);
    tempData=[['Month', 'Amount', { role: 'style' }],...tempData];
    console.log(tempData);
    if(google.visualization==undefined)return navigate("/");
    var data2 = google.visualization.arrayToDataTable(tempData);
    var options2 = {
      title: 'Expenditure by Months',
    };
    var chart2 = new google.visualization.ColumnChart(document.querySelector('.total_spending'));
    chart2.draw(data2, options2);
  }
  const changeTiming=(event)=>{
    console.log(event.target.innerText);
    setTiming(event.target.innerText);
    if(event.target.innerText=="Today"){
      drawChart(0);
    }else if(event.target.innerText=="This week"){
      drawChart(1);
    }else if(event.target.innerText=="This month"){
      drawChart(2);
    }
  }
  const drawChart3=(outs,ins)=>{
    var data = google.visualization.arrayToDataTable([
      ['Type', 'Amount', { role: 'style' }, { role: 'annotation' } ],
      ['Income', ins, 'green', ins+"" ],
      ['Expenditure', outs, 'red', outs+"" ],
   ]);
  var options = {
    title: '',
    chartArea: {width: '80%'},
    hAxis: {
      title: 'Total Amount',
      textStyle: {
        bold: true,
        fontSize: 12,
        color: '#4d4d4d'
      },
      titleTextStyle: {
        bold: true,
        fontSize: 18,
        color: '#4d4d4d'
      }
    },
    vAxis: {
      title: 'Cost--Income',
      textStyle: {
        fontSize: 14,
        bold: true,
        color: '#848484'
      },
      titleTextStyle: {
        fontSize: 14,
        bold: true,
        color: '#848484'
      }
    }
  };
  var chart = new google.visualization.BarChart(document.querySelector('.today-info'));
  chart.draw(data, options);
  }
  console.log(t,timing);
  if(user==false) return navigate("/");

  return (<><Menu1/>
  <div className='home'>
    <div className="home-row-0">Home</div>
    <div className="home-row-0-0">
      <div className="csv-dropdown" style={{marginTop:"1em", float:"right", textAlign:"right", marginRight:"1em"}}>Filter by:
        <Button variant='contained'>{timing}</Button>
        <div className="csv-dropdown-content">
        {segment.map(item=><span onClick={e=>changeTiming(e)}>{item}</span>)}
        </div>
      </div>
    </div>
    <div className="home-row-1">
      <span className='today-info' style={{}}></span>
      <div id='home-circle-center'></div>
    </div>
    <div className="home-row-1">
      <span className='today-info' style={{}}></span>
      <div id='home-circle-center'></div>
      <div className="total_income item_1"></div>
      <div className="total_spending item_3"></div>
    </div>
    <div className="home-row-2">
      <div className="home-graph-1" id="home-graph-1" style={{width:"100%", height:"60vh"}}>

      </div>
      <div className="home-graph-2">
        <div id='home-circle-center'></div>
        {/* <div className="segment-selector">
          <span className="today button-89" onClick={()=>drawChart(0)}>Today</span>
          <span className="thisweek button-89" onClick={()=>drawChart(1)}>This Week</span>
          <span className="thismonth button-89" onClick={()=>drawChart(2)}>This Month</span>
        </div> */}
      </div>
    </div>
  </div>
  </>)
}

export default Home;
