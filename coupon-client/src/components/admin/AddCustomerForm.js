import React from 'react';
import axios from 'axios';
import { useState } from "react";

function AddCustomerForm(props) {
    const token  = props.token;
    let [fetchedData,setFetchedData] = useState("");
    const addCustomerHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData(document.querySelector("#addCustomerForm"));
        const lastName = formData.get("lastname");
        const firstName = formData.get("firstname");
        const email = formData.get("email");
        const password = formData.get("password");
    
        axios.post('http://localhost:8080//api/admin/addCustomer',{'id':0,'password':password,'email':email,'last_name':lastName,'first_name':firstName},{'headers':{'token':token}})
        .then(function (response) {
            setFetchedData(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        })
    
    
    
    }

    
    return (
        <div>
        <form id = "addCustomerForm" onSubmit={addCustomerHandler}>
            <label>First Name: </label><input name="firstname"/> <label>Last Name: </label><input name="lastname"/> <label>Email: </label><input name="email"/> <label>password: </label><input name = "password"/> <button type="submit">SUBMIT</button>
        </form>
        <div>
           <p>{fetchedData}</p> 
        </div>
        </div>
    );
}

export default AddCustomerForm;