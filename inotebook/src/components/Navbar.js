import React, {  useContext,useEffect, useState } from 'react'
import { Link, useLocation ,useNavigate } from "react-router-dom";
import NoteContext from "../context/notes/noteContext";




const Navbar = () => {
    const notesInitial = []
    const context = useContext(NoteContext);
   // const { notes, getUser , editNote } = context;


    const [user, setuser] = useState([])

    let history=useNavigate();

    const handleLogOut=()=>{
        localStorage.removeItem('token')
        history("/login")
    }

    const getUser = async () => {
        // API Call (fatch api)
        const response = await fetch("http://localhost:3001/api/auth/getuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
        console.log(json)
        setuser(json)
      }
    // Get all UserDetail
    useEffect(() => {
        if(localStorage.getItem('token')){
            console.log("hii")
            //console.log(localStorage.getItem('token'))
            getUser()

          
        }       
        else{
            history("/login")

        }
        
        // eslint-disable-next-line
    }, [])
    


   
  
    let location = useLocation();
    
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    {!localStorage.getItem('token')?
                        <form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" role="button" >Login</Link>
                            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                        </form>
                        : <div className='d-flex align-items-center'><a style={{color:"white",textDecoration:"none"}} className="mx-2">{user.name}</a><button className='btn btn-primary' onClick={handleLogOut}> LogOut</button></div>  }
                </div>
            </div>
        </nav>
    )
}

export default Navbar