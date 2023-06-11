
import React, { useState } from 'react';
import * as Yup from "yup";
import { FormSchema } from '../validation/Yup';
import axios from 'axios';
import { useEffect } from "react";



const Form = () => {
    
    const [valid, setValid] = useState(false);
    const [users, setUsers] = useState([]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    })


    const [errorData, setErrorData] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    })

    const validation = (name,value) => {
        
        Yup.reach(FormSchema,name)
        .validate(value)
        .then(()=>setErrorData({...errorData,[name]:""}))
        .catch((err)=>setErrorData({...errorData,[name]:err.errors[0]}))
            
      };

      const submitHandler=(e)=>{
        e.preventDefault();
        
        if(valid){
        axios.post('https://reqres.in/api/users',user)

            .then((response)=>{
                setUsers([...users,response.data])
                setUser({
                    name:"",
                    email:"",
                    password:"",
                    terms:false
                })
                setValid(false)
            }
            )
        }
    }


    /*const submitHandler = (e) => {
        e.preventDefault();
        console.log("user: ", user);
        if (valid) {
            axios.post('https://reqres.in/api/users', user)
                .then((response) => {
                    setUsers([...users, response.data])
                    setUser(

                    )
                }
                )
        }
    
        }
        */
       /* const inputChangeHandler = (e) => {
            const { name, value } = e.target;

            Yup.reach(FormSchema, name)
                .validate(value)
                .then((valid) => {
                    setErrorData({ ...errorData, [name]: "" });
                })
                .catch((err) => {
                    setErrorData({ ...errorData, [name]: err.errors[0] });
                });

            setUser({ ...user, [name]:value });
        };

        const inputCheckboxHandler = (e) => {
            const { name, checked } = e.target;

            setUser({ ...user, [name]: checked });
        };

        useEffect(() => {
            FormSchema.isValid(user).then((vld) => setValid(vld));
        }, [user]);
        */
        const inputChangeHandler=(e)=>{
            const {type,value,name,checked}=e.target;
             
    
            if(type==="checkbox"){
                setUser({...user,[name]:checked})
                 validation(name,checked)
            }
            else{
                setUser({...user,[name]:value})
                validation(name,value)
            }
        
        }

        useEffect(()=>{
            FormSchema
                .isValid(user)
                .then((rest)=>setValid(rest))
                .catch((rest)=>setValid(!rest))
        },[user])

        return (
            <div>
                <form onSubmit={submitHandler}>
                    <div className='input-row'>
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={user.name}
                            data-cy= "name-input"
                            onChange={inputChangeHandler}
                        />
                        {errorData.name && <div className='error'>Error: {errorData.name}</div>}
                    </div>
                    <br />
                    <div className='input-row'>
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={user.email}
                            data-cy= "email-input"
                            onChange={inputChangeHandler}
                        />
                        {errorData.email && <div className='error'>Error: {errorData.email}</div>}
                    </div>
                    <br />
                    <div className='input-row'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="text"
                            value={user.password}
                            data-cy= "password-input"
                            onChange={inputChangeHandler}
                        />
                        {errorData.password && <div className='error'>Error: {errorData.password}</div>}
                    </div>
                    <br />
                    <div className='input-row'>
                        <label htmlFor="terms">Accept Terms and Conditions</label>
                        <input
                            id="term"
                            name="terms"
                            type="checkbox"
                            checked={user.terms}
                            data-cy= "terms-input"
                            onChange={inputChangeHandler}
                            value={user.terms}

                        />
                        {errorData.terms && <div className='error'>Error: {errorData.terms}</div>}
                    </div>
                    <br />
                    <div className='input-row'>
                        <button type="submit" disabled={!valid} value="Submit">Send</button>
                    </div>
                </form>

                {users.map((item)=>(
            <p>{item.name}</p>
        ))}


            </div>
        )
    }

    export default Form