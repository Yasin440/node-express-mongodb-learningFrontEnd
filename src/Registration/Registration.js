import { createUserWithEmailAndPassword, getAuth } from '@firebase/auth';
import React from 'react';
import { useState } from 'react/cjs/react.development';



const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    const auth = getAuth();

    const handleEmail = event => {
        setEmail(event.target.value);
    }
    const handlePassword = event => {
        setPassword(event.target.value);
    }
    const handleRegister = event => {
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
    }
    


    return (
        <div className='container'>
            <h2 className="text-primary my-4 text-center">Please Register</h2>
            <form className="row g-3 mt-5 w-50 m-auto">
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input onBlur={handleEmail} type="email" className="form-control" id="inputEmail4" required />
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPassword4" className="form-label">Password</label>
                    <input onBlur={handlePassword} type="password" className="form-control" id="inputPassword4" required />
                </div>
                <div className="col-12">
                    <button onClick={handleRegister} type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Registration;