import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import firebaseApp from "../extra/firebaseApp";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu1 from "./Menu1.jsx";
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { monthDays, weekDays } from "../extra/aid.jsx";
import { addTransaction, deleteTransaction, getTransaction } from "../provider/reducer/postReducer.jsx";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListIcon from '@mui/icons-material/List';
import "../styles/transaction.css";
import UploadIcon from '@mui/icons-material/Upload'; 

export default function Transaction(){
    const user=useSelector(state=>state.user.loggedIn);
    const userEmail=useSelector(state=>state.user.email);
    const [rValue,setRValue]=useState("out");
    const dispatch=useDispatch();
    const category=useSelector(state=>state.posts.category);
    const transaction=useSelector(state=>state.posts.transaction);
    const [t,setT]=useState({category:"",amount:"",date:new Date()});
    const [category1, setCategory1] = useState('');
    const [formOn, setFormOn]=useState(false);
    const [date1,setDate1]=useState('');
    const [amount1,setAmount1]=useState('');
    const [remarks1,setRemarks1]=useState('');
    const [firstDayOfRange, setFirstDayOfRange]=useState(weekDays().firstday);
    const [lastDayOfRange, setLastDayOfRange]=useState(weekDays().lastday);
    const [rangeSelected, setRangeSelected]=useState(1);
    const [csvOn, setCsvOn]=useState(false);
    const [csvTable,setCsvTable]=useState([]);
    const [csvTableFiltered, setCsvTableFiltered]=useState([]);
    const navigate=useNavigate();
    const [csvChecker, setCsvChecker]=useState(false);
    const [csvCheckerText, setCsvCheckerText]=useState("");

    useEffect(()=>{
      if(!user)navigate("/");
    },[user])

  const handleChange = (event) => {
    setCategory1(event.target.value);
  };
  const handleChange1=(event)=>setDate1(event.target.value);
  const handleChange2=(event)=>setAmount1(event.target.value);
  const handleChange3=(event)=>setRValue(event.target.value);
  const handleChange4=(event)=>setRemarks1(event.target.value);

    const submitForm=async (e)=>{
        e.preventDefault();
        if(category1=="" || rValue == "" || amount1=="" || date1==""){
            alert("please fill up all the required fields");
            return;
        }
        const db=getFirestore(firebaseApp);
    
        const newDoc = await addDoc(collection(db, "transaction"), {
          category:category1,type:rValue,amount:amount1,remarks:remarks1, date:date1, userEmail, delete:false
        });
        console.log(newDoc.id);
        window.alert("your transaction has been added");
        setFormOn(false);
        dispatch(addTransaction({[newDoc.id]:{
          category:category1,type:rValue,amount:amount1,remarks:remarks1, date:new Date(date1), userEmail, delete:false
        }}));
    }
    const setDateRange=id=>{
        setRangeSelected(id);
        if(id==0){
            let firstday=new Date();
            firstday.setHours(0);firstday.setMinutes(0);firstday.setSeconds(0);firstday.setMilliseconds(0);
            let lastday=new Date();
            lastday.setHours(11);lastday.setMinutes(59);lastday.setSeconds(59); lastday.setMilliseconds(999);
            setFirstDayOfRange(firstday);
            setLastDayOfRange(lastday);
        }else if(id==1){
            const week=weekDays();
            setFirstDayOfRange(week.firstday);
            setLastDayOfRange(week.lastday);
        }else if(id==2){
            const month=monthDays();
            setFirstDayOfRange(month.firstday);
            setLastDayOfRange(month.lastday);
        }
    }
    const deleteTransaction1=async id=>{
        console.log(id);
        if(!window.confirm("Do you want to delete this transaction?"))return;
        const db=getFirestore(firebaseApp);
        const successfull = await deleteDoc(doc(db, "transaction", ""+id));
        console.log(successfull);
        dispatch(deleteTransaction(id));
    }
    const csvInput=e=>{
      console.log(e);
      const file=e.target.files[0];
      
      const reader=new FileReader();
      reader.onprogress=e=>{
        console.log(e.loaded/file.size*100);
      }
      reader.onload=e=>{
        const csvData=e.target.result;
        const csvLines=csvData.split("\n");
        const  csvRows=csvLines.map(item=>item.split(","));
        console.log(csvRows);
        setCsvTable(csvRows);
        setCsvTableFiltered(csvRows);
      }
      reader.readAsText(file);
    }
    const filterCsvTable=i=>{
      if(!window.confirm("are you sure you want to delete this data column?"))return;
      console.log(i);
      const temp=csvTable.filter(item=>{
        item.splice(i,1);
        return item;
      })
      setCsvTableFiltered(temp);
    }
    const changeTableHead=(i,name)=>{
      console.log(i, name);
      let temp=[...csvTableFiltered];
      temp[0][i]=name;
      setCsvTableFiltered(temp);
    }
    const uploadCsv=i=>{
      console.log(i);
      let task1="Checking column header...\n";
      const header=csvTableFiltered[0].map(item=>item.toLowerCase());
      const allowedHeader=["amount","category","date","remarks","type"];
      const headerChecked=allowedHeader.map(item=>{return header.indexOf(item);}).map((item,i)=>(item==-1?allowedHeader[i]:item)).filter(item=>isNaN(item));
      console.log(headerChecked);
      task1+="Your data is missing some mandatory fields like "+headerChecked.toString();
      setCsvChecker(true);
      setCsvCheckerText(task1);
    }
    
    console.log(transaction, category,t);
    return <>
    <Menu1/>
    <div className="transaction">
        <div className="transaction-form" style={{padding:"5vh",display:formOn?"grid":"none", gridTemplateColumns:"1fr", alignItems:"center", justifyContent:"center", width:"40vw", boxShadow:"0px 1px 3px #AAA", gridRowGap:"3vh", position:"fixed", top:"15vh", left:"30vw", backdropFilter:"blur(10px)"}}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="transaction-category-label">Category</InputLabel>
        <Select
          labelId="transaction-category-label"
          id="transaction-category"
          value={category1}
          onChange={handleChange}
          autoWidth
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {category && Object.values(category).map(item=>item.name).map(item=><MenuItem key={item} value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>
      <input type="date" name="transaction-date" id="transaction-date" onChange={handleChange1}/>
      <TextField id="transaction-amount" label="Amount" variant="standard" onChange={handleChange2}/>
      <FormControl>
      <FormLabel id="transaction-type">Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="transaction-type"
        name="transaction-type"
        value={rValue}
      onChange={handleChange3}
      defaultValue="out"
      >
        <FormControlLabel value="in" control={<Radio />} label="in" />
        <FormControlLabel value="out" control={<Radio />} label="out" selected/>
      </RadioGroup>
    </FormControl>
    <TextField id="transaction-remarks" label="Remarks" variant="standard" onChange={handleChange4}/>
    <Button variant="contained" style={{width:"fit-content"}} onClick={e=>submitForm(e)}>Add Transaction</Button>
        </div>
        <div className="transaction-list" style={{marginTop:"5vh", marginLeft:"15vw", marginRight:"2vw"}}>
        {!csvOn?<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table">
        <TableHead>
            <TableRow>
                <TableCell colSpan={6}>
                    <Button variant="contained" style={{width:"fit-content"}} onClick={e=>setFormOn(!formOn)}>{formOn?"-":"+"}</Button>
                    <Button variant="outlined" onClick={e=>setDateRange(0)} style={{backgroundColor:(rangeSelected==0?"#DDDDDD":"white")}}>Today</Button>
                    <Button variant="outlined" onClick={e=>setDateRange(1)} style={{backgroundColor:(rangeSelected==1?"#DDDDDD":"white")}}>This Week({weekDays().firstday.toLocaleDateString()}-{weekDays().lastday.toLocaleDateString()})</Button>
                    <Button variant="outlined" onClick={e=>setDateRange(2)} style={{backgroundColor:(rangeSelected==2?"#DDDDDD":"white")}}>This Month</Button>
                    <Button variant="contained" onClick={e=>setCsvOn(true)}>Upload CSV</Button>
                </TableCell>
            </TableRow>
          <TableRow>
            <TableCell style={{textAlign:"right"}}>Sl</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction && Object.values(transaction).filter(item=>item.date>=firstDayOfRange&&item.date<=lastDayOfRange).sort((objA, objB) => -Number(objA.date) + Number(objB.date),).map((row,i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{textAlign:"right"}}>
                {i+1} <DeleteIcon onClick={e=>deleteTransaction1(Object.keys(transaction)[i])}/>
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.date.toLocaleDateString()}</TableCell>
              <TableCell align="right">{row.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>:
    <TableContainer component={Paper} style={{height:"90vh"}}>
    <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell colSpan={csvTable.length==0?1:csvTable[0].length}>
              <Button variant="contained" component="label"> + CSV<input onChange={e=>csvInput(e)} accept=".csv" type="file" hidden/></Button>
              <Button variant="contained" color="success" style={{marginLeft:"1em"}} onClick={e=>setCsvOn(false)}>Go back to <ListIcon/></Button>
              <Button variant="contained" color="success" style={{marginLeft:"1em"}} onClick={e=>uploadCsv(e)}>Click to <UploadIcon/></Button>
              <Card>
                <CardContent>
                This database table allows you to upload to column: amount, category, date, remarks, type. date must be in the format YYYY-MM-DD, type must be from (in, out), amount only in numbers. If you hover over the column head, the option will pop out, select one from them so that you can upload that data. The column having name as above will only be uploaded.
                </CardContent>
              </Card>
            </TableCell>
          </TableRow>
          {csvTableFiltered.length>0 && <TableRow>{csvTableFiltered[0].map((item,i)=><TableCell><Button variant="outlined" color="error" size="small" onClick={e=>filterCsvTable(i)}>x</Button>
          <div className="csv-dropdown">
            <span>{item}</span>
            <div className="csv-dropdown-content">
            {["amount","category","date","remarks","type"].map(item=><span onClick={e=>changeTableHead(i,item)}>{item}</span>)}
            </div>
          </div></TableCell>)}</TableRow>}
        </TableHead>
        <TableBody>
          {csvTableFiltered.length>1 && csvTableFiltered.slice(1).map(item=> (<TableRow>{csvTableFiltered[0].map((item1,index)=><TableCell>{item[index]}</TableCell>)}</TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>}
    {csvChecker?<div className="csv-checker"></div>:null}
        </div>
    </div></>
}