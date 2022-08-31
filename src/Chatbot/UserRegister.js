import { useState } from "react";
import "./UserRegister.css";
import { app, database } from "./firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";

function UserRegister(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  function handleInput(event) {
    //Each input has a name, match name and match corresponding value
    let inputs = { [event.target.name]: event.target.value };
    //Remember to save previous data along with current data
    setData({ ...data, ...inputs });
  }
  //Handle the sign-up by creating user
  function handleSubmit() {
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(response => {
      console.log(response.user)
    })
    .catch(err => {
      alert(err.message)
    })
    props.parentCall(data);
  }
  //Handle the sign-in by logging in user
  function handleSignIn() {
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(response => {
      console.log(response.user)
    })
    .catch(err => {
      alert(err.message)
    })
    props.parentCall(data);
  }
  function handleGoogleSignIn() {
    signInWithPopup(auth, googleProvider)
    .then(response => {
      console.log(response.user)
    })
    .catch(err => {
      alert(err.message)
    })
    props.parentCall(data);
  }
  //Pass data to formChatbot eventually to Post
  return (
    <div className="user-register">
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="input-fields"
        //Remember cant call handleInput(event)
        onChange={(event) => handleInput(event)}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="input-fields"
        //Remember cant call handleInput(event) must event => handleInput(event), DONT FORGET TO CALL EVENT
        onChange={(event) => handleInput(event)}
      />
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
      <button type="submit" onClick={handleSignIn}>
        Sign In
      </button>
      <button type="submit" onClick={handleGoogleSignIn}>
        Google Sign In
      </button>
    </div>
  );
}

export default UserRegister;
