import React, { useEffect, useRef, useState } from 'react';

const Home = () => {
    const [users, setUsers] = useState([]);
    const nameRef = useRef();
    const educationRef = useRef();
    const jobRef = useRef();

    //load data from my local database
    useEffect(() => {
        fetch('http://localhost:4000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    //upload or add data on my local database

    const handleAddData = event => {
        const name = (nameRef.current.value);
        const education = (educationRef.current.value);
        const job = (jobRef.current.value);
        const newUser = { userName: name, education: education, job: job }
        //send data to the server
        fetch('http://localhost:4000/users', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                // const addedUser = data;
                // const newUsers = [...users, addedUser];
                // setUsers(newUsers);
                if (data.insertedId) {
                    alert('Add Friend data successfully')
                    event.target.reset();
                    // nameRef.current.value = '';
                    // educationRef.current.value = '';
                    // jobRef.current.value = '';
                }
            })

        event.preventDefault();
    }

    //delete user from database
    const handleDeleteUser = id => {
        const confirm = window.confirm('Confirm to DELETE this user');
        if (confirm) {
            fetch(`http://localhost:4000/users/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('User DELETE successfully')
                        const remaining = users.filter(u => u._id !== id);
                        setUsers(remaining);
                    }
                })
        }
    }

    return (
        <div className='container'>
            <h1 className='pt-5 text-center text-primary'>This is My Home</h1>
            <div className='d-flex mt-5'>
                <form onSubmit={handleAddData} className="row g-3 w-50 m-auto">
                    <div className="col-md-12">
                        <label htmlFor="inputEmail4" className="form-label">Name</label>
                        <input ref={nameRef} type="text" className="form-control" id="inputEmail4" required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputPassword4" className="form-label">Education</label>
                        <input ref={educationRef} type="text" className="form-control" id="inputPassword4" required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="job22" className="form-label">Job</label>
                        <input ref={jobRef} type="text" className="form-control" id="job22" required />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Add User</button>
                    </div>
                </form>
                <ol>
                    {
                        users.map(user => <li key={user._id}>
                            <span className="text-danger">Name:</span> {user.userName},
                            <span className="text-danger">Edu:</span> {user.education},
                            <span className="text-danger">Job:</span> {user.job}
                            <i onClick={() => handleDeleteUser(user._id)} style={{ cursor: 'pointer' }} className="far fa-trash-alt ps-2 text-danger"></i>
                        </li>)
                    }
                </ol>
            </div>
        </div>
    );
};

export default Home;