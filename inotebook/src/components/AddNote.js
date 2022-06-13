import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import { useNavigate } from 'react-router-dom'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    let history = useNavigate();

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Updated successful", "success")
        history("/")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" minLength={5} required name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea  rows="4" cols="50"  className="form-control" id="description" minLength={5} value={note.description} required name="description" onChange={onChange} />
                </div>
               
                {/* <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" minLength={5} value={note.description} required name="description" onChange={onChange} />
                </div> */}
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" minLength={5} value={note.tag} required onChange={onChange} />
                </div>

                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote