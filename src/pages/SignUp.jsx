import React, { useState } from 'react';
import '../styles/SignUp.css'; // Import CSS file
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import firebaseApp from "../extra/firebaseApp";
import { useDispatch, useSelector } from "react-redux";
import { adduserCredentials, login } from "../provider/reducer/userSlice";
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

const SignUp = () => {
    const dispatch = useDispatch();
    const loggedInUser=useSelector(state=>state.user);
    const [signUpData, setSignUpData]=useState({name:"",email:"", password:""});
    const [signInData, setSignInData]=useState({email:"", password:""});
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
        setFile(e.target.files[0]);
        }
    };
    // Event listeners
    const handleSignUpClick = () => {
        const container = document.getElementById('container');
        container.classList.add('right-panel-active');
    };

    const handleSignInClick = () => {
        const container = document.getElementById('container');
        container.classList.remove('right-panel-active');
    };
    const handleGoogleSignIn = () => {
        const auth = getAuth(firebaseApp);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                dispatch(adduserCredentials(result));
                // IdP data available using getAdditionalUserInfo(result)
                console.log(user);
                return user;
                //dispatch(login(user.providerData[0]));
                // ...
            }).then(result => {
                console.log(result.providerData[0]);
                const obtainedData = result.providerData[0];
                if (!loggedInUser.loggedIn) {
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
    const handleSignUp=(e)=>{
        setSignUpData({...signUpData,[e.target.placeholder.toLowerCase()]:e.target.value});
    }
    const handleSignIn=(e)=>{
        setSignInData({...signInData,[e.target.placeholder.toLowerCase()]:e.target.value});
    }
    const googleSignIn=e=>{
        e.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, signInData.email, signInData.password)
        .then((userCredential) => {
            console.log(userCredential);
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            dispatch(adduserCredentials(userCredential));
            dispatch(login({displayName:user.displayName,email:user.email,photoURL:user.photoURL, loggedIn:true}));
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
        });
    }
    const createAccount=e=>{
        e.preventDefault();
        console.log(signUpData);
        if(signUpData.name=="" || signUpData.email=="" || signUpData.password==""){
            alert("Please fill up all the necessary fields");
            return;
        }
        /* if(!file){
            alert("you didn't select any user image");
            return;
        } */
        const auth=getAuth();
        
        createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            dispatch(adduserCredentials(userCredential));
            window.alert("your account has been created")
            setSignUpData({name:"",email:"", password:""});

            /* const storage=getStorage();
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
            }); */
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            alert(errorCode);
            // ..
        }); 
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
            const errorMessage = error.message;
            console.log(errorCode);
            // You can inform the user that something went wrong
        });

    }

    return (
        <div className='signup_form'>
            <div className="container" id="container">
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" value={signUpData.name} onChange={e=>handleSignUp(e)}/>
                        <input type="email" placeholder="Email" value={signUpData.email} onChange={e=>handleSignUp(e)} />
                        <input type="password" placeholder="Password" value={signUpData.password} onChange={e=>handleSignUp(e)} />
                        <button onClick={e=>createAccount(e)}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="">
                        <div className="social-container">
                            <GoogleButton onClick={handleGoogleSignIn} />
                        </div>
                        <span>or use your account</span>
                        <input type="email" placeholder="Email" onChange={e=>handleSignIn(e)}/>
                        <input type="password" placeholder="Password" onChange={e=>handleSignIn(e)}/>
                        <span className='forgot-password' onClick={e=>setForgotPassword(e)}>Forgot your password?</span>
                        <button onClick={e=>googleSignIn(e)}>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
