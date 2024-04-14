import { useEffect, useState } from "react";
import "../styles/Login1.css";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import firebaseApp from "../extra/firebaseApp";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../provider/reducer/userSlice";
import SignUp from "./SignUp";
import logo from "../assets/logo5.png";

export default function Login1(){
    const [textData, setTextData]=useState(["if you’re on Wollongong campus and feel at risk or unsafe while you are returning to your car,", "Allah is almighty", "walking to a bus stop, or on Northfields Avenue.", "Use the Help button in the SafeZone app or call 02 4221 4555", "While I appreciate the information provided via email", "if you’re on Wollongong campus and feel at risk or unsafe while you are returning to your car,", "Allah is almighty", "walking to a bus stop, or on Northfields Avenue.", "Use the Help button in the SafeZone app or call 02 4221 4555", "While I appreciate the information provided via email"]);
    const [typedText, setTypedText] = useState('');
    const [typedText1, setTypedText1] = useState('');
    const [textOrder1, setTextOrder1]=useState(0);
    const [textOrder2, setTextOrder2]=useState(3);
    const loggedInUser=useSelector(state=>state.user);
    const dispatch=useDispatch();
   

    useEffect(() => {
        google.charts.load('current', {'packages':['corechart']});
        const interval = setInterval(() => {
          drawChart([
            ['Task', 'Hours per Day'],
            ['Work',     Math.floor(Math.random()*9)],
            ['Eat',      Math.floor(Math.random()*9)],
            ['Commute',  Math.floor(Math.random()*9)],
            ['Watch TV', Math.floor(Math.random()*9)],
            ['Sleep',    Math.floor(Math.random()*9)]
          ]);
          drawChart1([
            ['Year', 'Sales', 'Expenses'],
            ['2004',  Math.floor(Math.random()*1000),      Math.floor(Math.random()*1000)],
            ['2005',  Math.floor(Math.random()*1000),      Math.floor(Math.random()*1000)],
            ['2006',  Math.floor(Math.random()*1000),      Math.floor(Math.random()*1000)],
            ['2007',  Math.floor(Math.random()*1000),      Math.floor(Math.random()*1000)]
          ]);
        //drawChart2();
        }, 3000); // Adjust typing speed here (in milliseconds)

        return () => clearInterval(interval);
      }, []);
      useEffect(() => {
            const interval1 = setInterval(() => {
            const length = typedText1.length;
            if (length < textData[textOrder2].length) {
              setTypedText1((prevTypedText) => prevTypedText + textData[textOrder2].charAt(length));
            } else {
              clearInterval(interval1);
              setTypedText1("");
              setTextOrder2(Math.floor(Math.random()*9));
              
            }
          }, 400); // Adjust typing speed here (in milliseconds)
    
        return () => clearInterval(interval1);
      }, [textData, typedText, typedText1]);
      function drawChart(arr) {

        var data = google.visualization.arrayToDataTable(arr);

        var options = {
          title: 'My Daily Activities',
          animation:{
            duration: 1000,
            easing: 'out',
          },
        };

        var chart = new google.visualization.PieChart(document.querySelector('.graph1'));

        chart.draw(data, options);
        /* chart = new google.visualization.PieChart(document.querySelector('.screen'));

        chart.draw(data, options); */
      }
      function drawChart1(arr) {
        var data = google.visualization.arrayToDataTable(arr);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.querySelector('.graph2'));

        chart.draw(data, options);
      }
      function drawChart2() {
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
          ['2004/05',  165,      938,         522,             998,           450,      614.6],
          ['2005/06',  135,      1120,        599,             1268,          288,      682],
          ['2006/07',  157,      1167,        587,             807,           397,      623],
          ['2007/08',  139,      1110,        615,             968,           215,      609.4],
          ['2008/09',  136,      691,         629,             1026,          366,      569.6]
        ]);

        var options = {
          title : 'Monthly Coffee Production by Country',
          vAxis: {title: 'Cups'},
          hAxis: {title: 'Month'},
          seriesType: 'bars',
          series: {5: {type: 'line'}}
        };

        var chart = new google.visualization.ComboChart(document.querySelector('.graph3'));
        chart.draw(data, options);
      }
      const handleGoogleSignIn= ()=>{
        const auth=getAuth(firebaseApp);
        const provider=new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            console.log(user);
            return user;
            //dispatch(login(user.providerData[0]));
            // ...
        }).then(result=>{
            console.log(result.providerData[0]);
            const obtainedData=result.providerData[0];
            if(!loggedInUser.loggedIn){
                console.log("funcction is called!");
                dispatch(login(obtainedData));
            }
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

return <div className="login1">
    <div className="left1">
        <div className="graph1"></div>
        <div className="graph2"></div>
    </div>
    <div className="right">
        <SignUp/>
        <img src={logo} alt="logo" className="logo"/>
    </div>
</div>
}