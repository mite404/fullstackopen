import Note from './components/Note'
import {useState} from "react";
import './App.css'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


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
