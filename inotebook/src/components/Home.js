//import Notes from './Notes';
import React, { useContext } from 'react'
import Context from '../context/notes/noteContext'
import Notes from './Notes';
export const Home = (props) => {
const context=useContext(Context)
const{notes,setNotes}=context;
    return (
        <div>
            <div className="container my-3">
            
            <div>
                <Notes showAlert={props.showAlert}/>
            </div>
            </div>


        </div>
    )
}