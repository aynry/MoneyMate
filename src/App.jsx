import './App.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import firebaseApp from './extra/firebaseApp';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Login1 from './pages/Login1';
import Home from './pages/Home';
;

function App() {
  const navigate=useNavigate();
  const user=useSelector(state=>state.user.loggedIn);

  console.log(user);
  if(!user){return <Login1/>;}

  return <Home/>;
}

export default App;
