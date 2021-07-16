import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import {createCategory} from './helper/adminapicall'

export default function AddCategory() {
 
    const [name,setName]=useState("");
    const [error,setError]=useState("false");
    const [success,setSuccess]=useState("false");


     const {user,token}=isAutheticated();
     
 
     const goBack=()=>(
         <div className="mt-5">
             <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
         </div>
     )

     const hanleChange=event=>{
            setError("")
            setName(event.target.value)
     };
     
     const onSubmit=(event)=>{
       event.preventDefault();
       setError("");
       setSuccess(false);

       //backend request fired
       createCategory(user._id,token,{name})
       .then(data=>{
           if(data.error){
               setError(true);
           }else{
               setError("");
               setSuccess(true);
               setName("");
           }
       })
     }
     
     const successMessage=()=>{
          if(success===true){
              return <h4 className="text-success">Category Created Successfully</h4>
          }
     }
     const warningMessage=()=>{
        if(error===true){
            return <h4 className="text-success">Failed to Create Category  </h4>
        }
    }
     const myCategoryForm=()=>(
        <form>
            <div class="form-group">
                <p className="lead">Enter the Category</p>
                <input type="text" className="form-control my-3"
                onChange={hanleChange}
                value={name}
               autoFocus
                required
                placeholder="for ex:IIT JEE"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
     )


    return (
       <Base title="Create a category here" description="Add a new category for  books" 
       className="container bg-info p-4">
           <div className="row bg-white rounded">
               <div className="col-md-8 offset-md-2">
                   {successMessage()}
                   {warningMessage()}
               {myCategoryForm()}{goBack()}
               </div>
           </div>
       </Base>
    )
}
