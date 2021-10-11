import React, {useContext} from 'react';
import * as firebase from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: {pathname: "/"}};
    /* if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    } */
    firebase.initializeApp(firebaseConfig);

    const handleGoogleSignIn = () => {
        var provider = new GoogleAuthProvider();
      
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const  {displayName, email} = credential.user;
            const signedInUser = {name: displayName, email: email}
            setLoggedInUser(signedInUser);
            history.replace(from);
            
        }).catch((error) => {
            
            const errorMessage = error.message;
            console.log(errorMessage);
           
        });

    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;