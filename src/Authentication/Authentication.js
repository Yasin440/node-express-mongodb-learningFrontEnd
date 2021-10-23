import React from 'react';
import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function Authentication() {

  // google sign in bbutton eventHandler
  const [user, setUser] = useState({});
  const auth = getAuth();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const loggedInUser = {
          name: displayName,
          email: email,
          img: photoURL
        }
        setUser(loggedInUser);
      })
  }

  // github sign in bbutton eventHandler
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const { photoURL } = result.user;
        const loggedInUser = {
          img: photoURL
        }
        setUser(loggedInUser);
      })
  }

  //sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
  }

  return (
    <div className="text-center">
      {
        !user.img ?
          <div>
            <button className='btn btn-warning' style={{ margin: "20px 9px" }} onClick={handleGoogleSignIn}>Google Sign In</button>
            <button className='btn btn-warning' style={{ margin: "20px 9px" }} onClick={handleGithubSignIn}>Github Sign In</button>
          </div>
          :
          <button className='btn btn-warning' style={{ margin: "20px 9px" }} onClick={handleSignOut}>Sign Out</button>
      }

      {
        user.img && <div>
          <img style={{ borderRadius: "50%" }} src={user.img} alt="img" />
          <h2>Name: {user.name}</h2>
          <h5>Email: {user.email}</h5>
        </div>
      }

    </div>
  );
}

export default Authentication;
