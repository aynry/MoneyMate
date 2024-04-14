import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "../styles/Category.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { getFirestore,collection, addDoc, getDocs, doc, deleteDoc,query, where } from "firebase/firestore";
import firebaseApp from '../extra/firebaseApp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Login from './Login';
import { useSelector, useDispatch } from 'react-redux';
import { weekDays } from '../extra/aid.jsx';
import Menu1 from './Menu1.jsx';
import { addBudget, deleteBudget } from '../provider/reducer/postReducer.jsx';
import {addCategory} from "../provider/reducer/transactionReducer.jsx";
import { FormControl, InputLabel, Select, MenuItem, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import { useNavigate } from 'react-router-dom';
export default function Budget(){
    const user=useSelector(state=>state.user.loggedIn);
    const userEmail=useSelector(state=>state.user.email);
    const [rValue,setRValue]=useState("out");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const category=useSelector(state=>state.posts.category);
    const budget=useSelector(state=>state.posts.budget);
    const transaction=useSelector(state=>state.posts.transaction);
    const [category1, setCategory1] = useState('');
    const [formOn, setFormOn]=useState(false);
    const [date1,setDate1]=useState('');
    const [date2,setDate2]=useState('');
    const [amount1,setAmount1]=useState('');
    const [remarks1,setRemarks1]=useState('');
    const [firstDayOfRange, setFirstDayOfRange]=useState(weekDays().firstday);
    const [lastDayOfRange, setLastDayOfRange]=useState(weekDays().lastday);

    useEffect(()=>{
      if(!user)navigate("/")  ;
    },[user])

    const getCategory=async ()=>{
      const db=getFirestore(firebaseApp);
      const querySnapshot = await getDocs(query(collection(db, "category"), where("userEmail", "==", userEmail)));
      let tempCategory=[];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempCategory.push(doc.data().name);
      });
      console.log(tempCategory);
      dispatch(addCategory(tempCategory));
  }
    const getBudget=async ()=>{
        const db=getFirestore(firebaseApp);
        const querySnapshot = await getDocs(query(collection(db, "budget"), where("userEmail", "==", userEmail)));
        let tempBudget={};
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let tempData=doc.data();
          try {
              tempData["start"]=new Date(tempData["start"]);
              tempData["end"]=new Date(tempData["end"]);
              tempBudget[doc.id]=tempData;
          } catch (error) {
            console.log(error);        
          }
        });
        console.log(tempBudget);
        //setCategoryList(tempCategory);
        dispatch(addBudget(tempBudget));
    }
    const handleChange=(event)=>{
      setCategory1(event.target.value);
    }
    const handleChange1=(event)=>{
      setDate1(event.target.value);
    }
    const handleChange2=(event)=>{
      setDate2(event.target.value);
    }
    const handleChange3=(event)=>{
      setAmount1(event.target.value);
    }
    const handleChange4=(event)=>{
      setRemarks1(event.target.value);
    }
    const submitForm=async e=>{
      e.preventDefault();
      console.log(user, userEmail, category, category1, date1,date2, amount1, remarks1, budget);
      if(category1=="" || rValue == "" || amount1=="" || date1=="" || date2==""){
        alert("please fill up all the required fields");
        return;
      }
      const db=getFirestore(firebaseApp);

      const newDoc = await addDoc(collection(db, "budget"), {
        category:category1,amount:amount1,remarks:remarks1, start:date1, end:date2, email:userEmail, delete:false
      });
      console.log(newDoc.id);
      console.log(user, userEmail, category, category1, new Date(date1), new Date(date2), amount1, remarks1, budget);
      window.alert("your budget has been added");
      setFormOn(false);
      dispatch(addBudget({[newDoc.id]:{
        category:category1,amount:amount1,remarks:remarks1, start:new Date(date1), end:new Date(date2), email:userEmail, delete:false
      }}));
  
    }
    const deleteBudget1=async id=>{
      console.log(id);
      if(!window.confirm("Do you want to delete this budget?"))return;
      const db=getFirestore(firebaseApp);
      const successfull = await deleteDoc(doc(db, "budget", ""+id));
      console.log(successfull);
      dispatch(deleteBudget(id));
  }
  console.log(budget);
      return <><Menu1/><div className="budget">
        <div className="budget-form" style={{padding:"5vh",display:formOn?"grid":"none", gridTemplateColumns:"1fr", alignItems:"center", justifyContent:"center", width:"40vw", boxShadow:"0px 1px 3px #AAA", gridRowGap:"3vh", position:"fixed", top:"15vh", left:"30vw", backdropFilter:"blur(10px)"}}>
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
          {Object.values(category).map(item=>item.name).map(item=><MenuItem value={item}>{item}</MenuItem>)}
        </Select>
      </FormControl>

      <span>Budget start:</span>
      <input type="date" name="budget-date-start" id="budget-date-start" onChange={handleChange1}/>
      <span>Budget end:</span>
      <input type="date" name="budget-date-end" id="budget-date-end" onChange={handleChange2}/>
      <TextField id="transaction-amount" label="Amount" variant="standard" onChange={handleChange3}/>
    <TextField id="transaction-remarks" label="Remarks" variant="standard" onChange={handleChange4}/>
    <Button variant="contained" style={{width:"fit-content"}} onClick={e=>submitForm(e)}>Add Budget</Button>
        </div>
  <TableContainer component={Paper} style={{width:"70vw", marginLeft:"25vw", marginTop:"5vh"}}>
      <Table sx={{ width: "fit-content" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial <Button variant='contained' onClick={e=>setFormOn(!formOn)}>{formOn?"-":"+"}</Button></TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Start date</TableCell>
            <TableCell align="right">End date</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Delete Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(budget).length>0?Object.entries(budget).map((row,i) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{row[1].category}</TableCell>
              <TableCell align="right">{row[1].start.toLocaleDateString()}</TableCell>
              <TableCell align="right">{row[1].end.toLocaleDateString()}</TableCell>
              <TableCell align="right">{row[1].amount}</TableCell>
              <TableCell align="right" style={{cursor:"pointer"}} onClick={e=>deleteBudget1(row[0])}><DeleteIcon/></TableCell>
            </TableRow>
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
}