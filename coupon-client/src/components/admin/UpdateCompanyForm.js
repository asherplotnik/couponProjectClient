import React from 'react';
import axios from 'axios';
import { useState } from "react";

function UpdateCompanyForm(props) {
    const token  = props.token;
    let [fetchedCompany, setFetchedCompany ]= useState({'id':"",'password':"",'email':"",'name':""});
    let [fetchedData,setFetchedData] = useState("");
    const updateCompanyHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData(document.querySelector("#updateCompanyForm"));
        const companyId = parseInt(fetchedCompany.id);
        const email = formData.get("email");
        const password = formData.get("password");
        const name = document.querySelector("#companyName").value;
        axios.post('http://localhost:8080//api/admin/updateCompany',{'id':companyId,'password':password,'email':email,'name':name},{'headers':{'token':token}})
        .then(function (response) {
            setFetchedData(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    const fetchCompanyByIdHandler = (e) =>{
        e.preventDefault();
        const companyId = parseInt(document.querySelector("#companyId").value);
        axios.get('http://localhost:8080//api/admin/getCompany/'+companyId,{'headers':{'token':token}})
        .then(function (response) {
            setFetchedCompany(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    }


    
    return (
        <div>
        <form id = "updateCompanyForm" onSubmit={updateCompanyHandler}>
            <label> ID: </label><input id="companyId" name="companyId"/> 
            <button id="fetch" onClick={fetchCompanyByIdHandler}> FETCH </button>
            <label> name: </label><input disabled = {true} id="companyName" name="companyName" defaultValue={fetchedCompany.name}/> 
            <label> Email: </label><input name="email" defaultValue={fetchedCompany.email}/> 
            <label> password: </label><input name = "password" defaultValue={fetchedCompany.password}/> 
            <button type="submit">SUBMIT</button>
        </form>
        <div>
           <p>{fetchedData}</p> 
        </div>
        </div>
    );
}

export default UpdateCompanyForm;