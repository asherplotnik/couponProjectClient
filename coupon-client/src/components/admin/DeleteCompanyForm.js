import React from 'react';
import axios from 'axios';
import { useState } from "react";
import {localUrl} from '../helper';
function DeleteCompanyForm(props) {
    const token  = props.token;
    let [fetchedData,setFetchedData] = useState("");
    const deleteCompanyHandler = (e) =>{
        e.preventDefault();
        const formData = new FormData(document.querySelector("#deleteCompanyForm"));
        const id = parseInt(formData.get("id"));
        axios.delete(localUrl+':8080//api/admin/deleteCompany/'+id,{'headers':{'token':token}})
        .then(function (response) {
            setFetchedData(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        })
    
    }

    
    return (
        <div>
        <form id = "deleteCompanyForm" onSubmit={deleteCompanyHandler}>
            <label>ID to delete: </label><input name="id"/> <button type="submit">SUBMIT</button>
        </form>
        <div>
           <p>{fetchedData}</p> 
        </div>
        </div>
    );
}

export default DeleteCompanyForm;