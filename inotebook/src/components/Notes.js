import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { Link, useNavigate } from 'react-router-dom'


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            //console.log(localStorage.getItem('token'))
            getNotes()
        }
        else {
            history("/login")
        }

        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        // console.log("Updating the note...", note)
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        e.preventDefault();
        props.showAlert("Note Updated successful", "success")

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            {/* <AddNote showAlert={props.showAlert}/> */}
            <Link className='btn btn-primary' to="/createNote" >New Note</Link>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" minLength={5} required id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea rows="4" cols="50" className="form-control" id="edescription" minLength={5} value={note.edescription} required name="edescription" onChange={onChange} />
                                       
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" minLength={5} required id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className="row my-3">
                <h2>You Notes</h2>
                <div className="container mx-2">
                    {notes.length === 0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes 