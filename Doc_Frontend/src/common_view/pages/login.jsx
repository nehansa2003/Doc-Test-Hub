import React, { useState } from 'react';
import axios from 'axios';
import "./login.css";
import Header from '../components/Logo _title';
import FootSection from '../components/footer';

function Login(){
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');
  const[showReset,setShowReset]=useState(false);
  const[newPassword,setNewPassword]=useState('');
  const[resetMassege,setResetMessage]=useState('');
  const HandleLogin=async(e)=>{
    e.preventDefault();
    try{
      const response=await axios.post('http://127.0.0.1:8000/api/login/',{
        username:username,
        password:password,
      });
      localStorage.setItem('username',response.data.username);
      localStorage.setItem('user_type',response.data.user_type);
      localStorage.setItem('user_Id', response.data.user_Id);
      localStorage.setItem('name',response.data.name);
        //redirect to the homepage
    //     window.location.href='/home';
      //redirect to the homepage
      window.location.href='/home';
    }catch(err){
      setError(err.response?.data?.error||'Login faild!');
    }
    };
    const handlePasswordReset=async()=>{
      if (!username||!newPassword){
        setResetMessage('Username and new password are required.');
        return;
      }
      try{
        const response=await axios.post('http://127.0.0.1:8000/api/reset-password/',{
          username:username,
          new_password:newPassword,
        });
        setResetMessage(response.data.message||'Password updated successfully.');
           setTimeout(()=>setShowReset(false),2000);
      }catch(err){
        setResetMessage(err.response?.data?.error||'Password reset failed.');
      }
      }
    

return (
  <>
  <Header/>
  <div class="login_part">
    <div class="login-container">
      <h2>Login</h2>
      <form onSubmit={HandleLogin} class="login_form">
         <h5>Username:</h5>
         <input class="blanks" type="text" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}required/>
         <h5>Password:</h5>
         <input class="blanks"type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
         <br/>
         <button type="submit">Login</button>
    </form>
    {error &&<p style={{color:'red'}}>{error}</p>}

    {!showReset?(
      <p style={{cursor:'pointer',color:'blue'}} onClick={()=>setShowReset(true)}>Forget Psaaword?</p>
    ):(
      <div><h4>Reset password?</h4>
      <input class="blanks" type="text" name="username" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}required/>
      <input class="blanks"type ="password" placeholder="Enter new password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)}/>
      <br/>
      <button onClick={handlePasswordReset}>Reset</button>
      {resetMassege && <p style={{ color: resetMassege.includes('success') ? 'white' : 'red' }}>{resetMassege}</p>}
      </div>
    )}
  </div>
  </div>
  <FootSection/>
  </>
);
}

export default Login;