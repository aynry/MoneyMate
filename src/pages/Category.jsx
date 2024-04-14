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
import { useSelector } from 'react-redux';
import Menu1 from './Menu1.jsx';
export default function Category(){
    const user=useSelector(state=>state.user.loggedIn);
    const userEmail=useSelector(state=>state.user.email);
    const [categoryList, setCategoryList]=useState({});
    useEffect(()=>{
        getCategory();
    },[])
    const getCategory=async ()=>{
        const db=getFirestore(firebaseApp);
        const querySnapshot = await getDocs(query(collection(db, "category"), where("userEmail", "==", userEmail)));
        let tempCategory={};
        querySnapshot.forEach((doc) => {
          tempCategory[doc.id]=doc.data().name;
        });
        console.log(tempCategory);
        setCategoryList(tempCategory);
    }
    const addCategory=async value=>{
        if(value==null || value == ""){
            alert("Nothing written in the field");
            return;
        }
        if(Object.values(categoryList).map(item=>(item+"").toLowerCase()).indexOf(value.toLowerCase())>=0){
            alert("This category is already in the list");
            return;
        }
        const db=getFirestore(firebaseApp);
        const docRef = await addDoc(collection(db, "category"), {
            name: value,
            userEmail
        });
        console.log(value, "Document written with ID: ", docRef.id);
        getCategory();
    }
    const editCategory=id=>{
      console.log(id);
    }
    const deleteCategory=async id=>{
        if(!window.confirm("Do you want to delete this category"))return;
        const db=getFirestore(firebaseApp);
        const successfull = await deleteDoc(doc(db, "category", ""+id));
        console.log(successfull);
        getCategory();
    }
    console.log(user, userEmail);
    if(user==false)return <Login/>;
    return <><Menu1/><div className="category">
        <Stack spacing={2} direction="row">
            <TextField id="category-name" label="Filled" variant="filled" />
            <Button variant="contained" onClick={e=>addCategory(document.getElementById("category-name").value)}>Add Category</Button>
        </Stack>
  <TableContainer component={Paper} style={{width:"fit-content"}}>
      <Table sx={{ width: "fit-content" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Delete Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(categoryList).length>0?Object.entries(categoryList).map((row,i) => (
            <TableRow
              key={row[0]}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i+1}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right" style={{cursor:"pointer"}} onClick={e=>deleteCategory(row[0])}><DeleteIcon/></TableCell>
            </TableRow>
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
}