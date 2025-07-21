import Note from './components/Note'
import {useState, useEffect} from "react";
import axios from "axios";
import './App.css'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {  // when data arrives,
        console.log('promise fulfilled')  // event handler is called printing 'promise fulfilled'
        setNotes(response.data)  // stores data received from server into state `setNotes`
      })                         // call to state-updating func triggers re-rendering of component
  }, []);
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {  // create new object for the incoming note from component's newNote state
      content: newNote,  // value of 'newNote' will be passed here from user's input
      important: Math.random() < 0.5,  // 50% chance of being marked 'important'
      id: String(notes.length + 1),   // unique identifier generated based on total number of notes
    }

    setNotes(notes.concat(noteObject))  // add new note to list of notes -- creates new copy of
    // array
    setNewNote('')  // event handler resets value of controlled input
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
      ? notes
      : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input  value={newNote}
                onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default App
