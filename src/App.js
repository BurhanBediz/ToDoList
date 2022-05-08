import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NoteForm from "./components/note-form";
import Notes from "./components/notes";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    axios("https://jsonplaceholder.typicode.com/posts").then((resp) =>
      setNotes(resp.data)
    );
  };

  const removeNote =(id)=>{
    if(!id) return;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //1. altenatif
    .then((resp)=>{
      const arr = notes.filter(item=>item.id!= id)
      setNotes(arr);

    /*2. alternatif
    loadNotes()
    */
      alert("Note was deleted")
      .catch(err=> {
        console.log(err);
        alert("An error occured");
      })
    });
  }

  const createNote = (note) => {
    axios.post("https://jsonplaceholder.typicode.com/posts",note)
    .then(resp=>{
      //const arr = notes.push(note); setNotes(arr); (uzun yöntem)
      setNotes([resp.data,...notes])//profesyonel bir yöntem
    })
  }
  return (
    <Container>
      <Row className="g-5">
        <Col md={3} note={notes}>
          <NoteForm createNote={createNote}/>
        </Col>
        <Col md={9}>
          <Notes data={notes} removeNote={removeNote}/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;