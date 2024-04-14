import "../styles/Setting.css";
import Menu1 from "./Menu1.jsx";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { FormControlLabel, TextField, FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, Radio} from "@mui/material";
import { getStorage, getDownloadURL, uploadBytesResumable,ref } from "firebase/storage";

export default function Setting(){
    const user=useSelector(state=>state.user.loggedIn);
    const creds=useSelector(state=>state.user);
    const displayName=useSelector(state=>state.user.displayName);
    const c=useSelector(state=>state.posts.category);
    const t=useSelector(state=>state.posts.transaction);
    const b=useSelector(state=>state.posts.budget);
    const userParticulars=useSelector(state=>state.user);
    const [signUpData, setSignUpData]=useState({name:displayName,email:"", password:""});
    const [rValue, setRValue]=useState("out");
    const [rValue1, setRValue1]=useState("Budget");
    const [file, setFile] = useState(null);
    const [category1, setCategory1] = useState('');
    const [category, setCategory] = useState('');
    const [formOn, setFormOn]=useState(true);
    const [date1,setDate1]=useState('');
    const [date2,setDate2]=useState('');
    const [amount1,setAmount1]=useState('');
    const [remarks1,setRemarks1]=useState('');
    const [categoryOn, setCategoryOn]=useState(false);
    const [transactionOn, setTransactionOn]=useState(false);
    const [budgetOn, setBudgetOn]=useState(false);
    const [fileName, setFileName]=useState("Category");
    const navigate=useNavigate();

    useEffect(()=>{
        if(!user)navigate("/");
      },[user])
    const handleChange = (event) => {
    setCategory1(event.target.value);
    console.log(event.target.value);
    if(event.target.value=="Transaction"){
        setTransactionOn(true);
        setCategoryOn(false);
        setBudgetOn(false);
    }
    if(event.target.value=="Budget"){
        setTransactionOn(false);
        setCategoryOn(false);
        setBudgetOn(true);
    }
    if(event.target.value=="Category"){
        setTransactionOn(false);
        setCategoryOn(true);
        setBudgetOn(false);
    }
    console.log(transactionOn,categoryOn, budgetOn);
    };
    const handleChangeDate=(event)=>{
        console.log(event.target.value);
        if(event.target.id=="transaction-date1")setDate1(event.target.value);
        if(event.target.id=="transaction-date2")setDate2(event.target.value);
    }
    const handleChange3=(event)=>setRValue(event.target.value);
    const handleChange5=(event)=>{
        setRValue1(event.target.value);
        if(event.target.value=="Transaction"){
            setTransactionOn(true);
            setCategoryOn(false);
            setBudgetOn(false);
        }
        if(event.target.value=="Budget"){
            setTransactionOn(false);
            setCategoryOn(false);
            setBudgetOn(true);
        }
        if(event.target.value=="Category"){
            setTransactionOn(false);
            setCategoryOn(true);
            setBudgetOn(false);
        }
        console.log(transactionOn,categoryOn, budgetOn);
    }
    const setForgotPassword=e=>{
    console.log(e);
    const auth = getAuth();

    const email = window.prompt("please enter your email","user@example.com"); // The user's email address
    if (email == null || email == "") {
        return;
        } 

    sendPasswordResetEmail(auth, email)
    .then(() => {
        window.alert("a password reset email has been sent to your email, please check and follow the steps");
    })
    .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        console.log(errorCode);
        // You can inform the user that something went wrong
        //sudo scp -i moneymate-keypair-1.pem -r ../react/moneymate4/dist ubuntu@ec2-54-253-9-3.ap-southeast-2.compute.amazonaws.com:~/
        //sudo ssh -i moneymate-keypair-1.pem ubuntu@ec2-54-253-9-3.ap-southeast-2.compute.amazonaws.com
        //sudo cp -r dist/* /var/www/html/
    });
    }
    const handleSignUp=(e)=>{
        setSignUpData({...signUpData,[e.target.id.toLowerCase()]:e.target.value});
    }
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        if (e.target.files) {
        setFile(e.target.files[0]);
        }
    };
    const createAccount=e=>{
        e.preventDefault();
        console.log(signUpData);
        if(signUpData.name=="" || file==""){
            alert("Please fill up all the necessary fields");
            return;
        }
        if(!file){
            alert("you didn't select any user image");
            return;
        }
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const storage=getStorage();
            const storageRef=ref(storage,"img/"+file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(percentage);
            
            }, function error(err) {
                console.log(err);        
            
            },function complete() {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                
                updateProfile(user, { displayName: signUpData.name, photoURL:downloadURL });
                console.log("all complete");
                setSignUpData({name:"",email:"", password:""});
                setFile(null);
            });
            });
        } else {
            console.log("use is signed out");
        }
        });
    }
    const exportCsv=e=>{
        console.log(rValue1, e);
        if(rValue1=="Category"){
            setFileName("category");
            let category=Object.entries(c).map((item,i)=>[i+1,item[1].name]);
            category.unshift(["SN","Category Name"])
            console.log(category);
            let csv="";
            category.forEach(row => {
                csv += row.join(',') + '\n';
            });
            console.log(csv);
            const blob = new Blob([csv], { type: 'text/csv' });
            const encodedUri = encodeURI(window.URL.createObjectURL(blob));
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', "Category"+' on '+new Date().toLocaleDateString()+'.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }else if(rValue1=="Transaction"){
            if(date1=="" || date2 == ""){
                window.alert("please select date");return;
            }
            setFileName("transaction");
            let transaction=Object.entries(t).map((item,i)=>item[1]).filter(item=>item.date>=new Date(date1) && item.date<=new Date(date2)).filter(item=>{
                if(rValue=="in")return item.type=="in";
                else if(rValue=="out")return item.type=="out";
                else return true;
            }).map((item,i)=>[i+1,item.date.toLocaleDateString(), item.category,item.type,item.amount,item.remarks]);
            console.log(transaction);
            transaction.unshift(["SN","Date","Category Name","Type","Amount","Remarks"])
            console.log(transaction);
            let csv="";
            transaction.forEach(row => {
                csv += row.join(',') + '\n';
            });
            console.log(csv);
            const blob = new Blob([csv], { type: 'text/csv' });
            const encodedUri = encodeURI(window.URL.createObjectURL(blob));
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', "Transaction"+' from '+date1+" to "+date2+'.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }else if(rValue1=="Budget"){
            if(date1=="" || date2 == ""){
                window.alert("please select date");return;
            }
            setFileName("budget");
            let transaction=Object.entries(b).map((item,i)=>item[1]).filter(item=>item.date>=new Date(date1) && item.date<=new Date(date2)).map((item,i)=>[i+1,item.date.toLocaleDateString(), item.category,item.type,item.amount,item.remarks]);
            console.log(transaction);
            transaction.unshift(["SN","Date","Category Name","Type","Amount","Remarks"])
            console.log(transaction);
            let csv="";
            transaction.forEach(row => {
                csv += row.join(',') + '\n';
            });
            console.log(csv);
            const blob = new Blob([csv], { type: 'text/csv' });
            const encodedUri = encodeURI(window.URL.createObjectURL(blob));
            const link = document.createElement('a');
            link.setAttribute('href', encodedUri);
            link.setAttribute('download', "Budget"+' from '+date1+" to "+date2+'.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setDate1("");setDate2("");
    }
    const handleChange4=e=>{
        setFileName(e.target.value);
    }
    console.log(c,t, date1, date2);
    return <><Menu1/>
    <div className="setting">
        <Card sx={{ minWidth: 275 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {userParticulars.displayName}
            </Typography>
            <Typography variant="h5" component="div" style={{marginTop:"3vh"}}>
            {userParticulars.email}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={e=>setForgotPassword(e)}>Change password</Button>
        </CardActions>
        </Card>
        <Card style={{marginTop:"1em", paddingLeft:"20vw"}}>
            <CardContent>
            <Typography sx={{ fontSize: 20, marginBottom:"1em", fontWeight:"bold" }} variant="h5" component={"div"} color="text.primary" gutterBottom>
            Change user particulars
            </Typography>
            <TextField id="name" label="Name" variant="standard" value={signUpData.name} onChange={e=>handleSignUp(e)}/><br/>
            <Button
            style={{marginTop:"1em"}}
            variant="outlined"
            component="label"
            >
            Select Profile Picture
            <input
                type="file"
                hidden
                onChange={e=>handleFileChange(e)}
            />
            </Button>{" "+(file && file.name)}<br/>
            <Button variant="contained" color="success" style={{marginTop:"1em"}} onClick={e=>createAccount(e)}>Edit Name, Profile Picture</Button>
            </CardContent>
        </Card>
        <Card>
        <div className="export_form" style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1em"}}>
        <Typography sx={{ fontSize: 20, marginBottom:"1em", fontWeight:"bold", gridColumn:"1/span 2" }} variant="h5" component={"div"} color="text.primary" gutterBottom>
            Export Data as CSV
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <RadioGroup
            column
            aria-labelledby="data-name"
            name="data-name"
            value={rValue1}
            onChange={handleChange5}
            defaultValue="out"
            label="Data Name"
            style={{paddingLeft:"10vw"}}
        >
            <FormControlLabel value="Transaction" control={<Radio />} label="Transaction" />
            <FormControlLabel value="Category" control={<Radio />} label="Category" selected/>
            <FormControlLabel value="Budget" control={<Radio />} label="Budget"/>
        </RadioGroup>
        {transactionOn?<>
            <FormLabel>Starting date:</FormLabel>
            <TextField type="date" name="transaction-date1" id="transaction-date1" onChange={handleChangeDate}/>
            <FormLabel>Ending date:</FormLabel>
            <TextField type="date" name="transaction-date2" id="transaction-date2" onChange={handleChangeDate}/>
            <RadioGroup
                column
                aria-labelledby="transaction-type"
                name="transaction-type"
                value={rValue}
                onChange={handleChange3}
                defaultValue="out"
                style={{paddingLeft:"10vw"}}
            >
                <FormControlLabel value="in" control={<Radio />} label="in" />
                <FormControlLabel value="out" control={<Radio />} label="out"/>
                <FormControlLabel value="both" control={<Radio />} label="both" selected/>
            </RadioGroup>
        </>:null}
        {budgetOn?<>
        <FormLabel>Starting date:</FormLabel>
            <TextField type="date" name="transaction-date1" id="transaction-date1" onChange={handleChangeDate}/>
        <FormLabel>Ending date:</FormLabel>
            <TextField type="date" name="transaction-date2" id="transaction-date2" onChange={handleChangeDate}/>
        </>:null}
    </FormControl>
        
        <div>
            <Button variant="contained" style={{width:"fit-content", position:"relative",left:"50%",marginTop:"30%"}} onClick={e=>exportCsv(e)}>Export</Button>
        </div>
        </div>
        </Card>
        
    </div></>;
}