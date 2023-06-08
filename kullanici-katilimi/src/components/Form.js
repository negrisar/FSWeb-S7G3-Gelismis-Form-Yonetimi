
import React, { useState } from 'react';
import * as Yup from "yup";
import { FormSchema } from '../validation/Yup';
import axios from 'axios';
import { useEffect } from "react";

/*const Form = () => {
        const [valid, setValid] =useState();
        const [errorData,setErrorData]= useState({
        name: "",
        email: "",
        password: "",
        terms: ""
        })
    

        const validation = (name,value) =>{
        Yup.reach(FormSchema,name)
        .validate(value)
        .then(()=> setErrorData({...errorData,[name]:""}))
        .catch((err)=> setErrorData({...errorData,[name]:err.errors[0]})) 
        
        }

    
        const [user,setUser]= useState({
            name: "",
            email: "",
            password: "",
            terms: false
        })

        const [users,setUsers]= useState([]);

        const formSubmit =(e)=>{
            e.preventDefault();

            if(valid){
                axios.post('https://reqres.in/api/users',user)
                .then((response)=>{
                    setUsers([...users,response.data])
                    setUser(

                    )
                }
                )
            }
        }
    
    const formChangeHandler=(e)=>{
        const{type,value,name,checked}=e.target;
            setUser({ ...user, [name]: value })

        if(type==="checkbox"){
            setUser({...user,[name]:checked})
            
            validation(name,checked,value)
        }
        else {

        }
    }
    */
   const Form = ()=>{
    const [user,setUser]= useState({
        name: "",
        email: "",
        password: "",
        terms: false
    })
    
    const [errorData,setErrorData]= useState({
        name: "",
        email: "",
        password: "",
        terms: ""
        })

    const [valid, setValid] =useState();

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post('https://reqres.in/api/users',user);
    }

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
    
        Yup.reach(FormSchema, name)
          .validate(value)
          .then((valid) => {
            setErrorData({ ...errorData, [name]: "" });
          })
          .catch((err) => {
            setErrorData({ ...errorData, [name]: err.errors[0] });
          });
    
        setUser({ ...user, [name]: value });
      };

      const inputCheckboxHandler = (e) => {
        const { name, checked } = e.target;
    
        setUser({ ...user, [name]: checked });
      };

      useEffect(() => {
        FormSchema.isValid(user).then((vld) => setValid(vld));
      }, [user]);
    
      useEffect(() => {
        console.log("errorData: ", errorData);
      }, [errorData]);


    return (
        <div>
        <form onSubmit={submitHandler}>
            <div className='input-row'>
                <label htmlFor="email">Full Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value = {user.name}
                        onChange={inputChangeHandler}
                    />
                {errorData.name && <div className='error'>Error: {errorData.name}</div>}
            </div>
            <br/>
            <div className='input-row'>
                <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="text"
                            value={user.email}
                            onChange={inputChangeHandler}
                        />
                    {errorData.email && <div className='error'>Error: {errorData.email}</div>}
            </div>
            <br/>
            <div className='input-row'>
            <label htmlFor="email">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="text"
                        value={user.password}
                        onChange={inputChangeHandler}
                    />
                {errorData.password && <div className='error'>Error: {errorData.password}</div>}
            </div>
            <br/>
            <div className='input-row'>
            <label htmlFor="email">Accept Terms and Conditions</label>
                    <input
                        id="term"
                        name="terms"
                        type="checkbox"
                        checked={user.terms}
                        onChange={inputCheckboxHandler}
                    />
                {errorData.terms&& <div className='error'>Error: {errorData.terms}</div>}
            </div>
            <br/>
            <div className='input-row'>
            <button type="submit" disabled={!valid} value="Submit">Send</button>
            </div>
        </form>
        </div>
    )
}
export default Form;