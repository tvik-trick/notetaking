import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function App() {
  const [title, setTitle] = useState(" ");
  const [content, setContent] = useState(" ");

  const [listofnotes, setListofnotes] = useState([]);
  const addnotes = () => {
    Axios.post("http://localhost:5000/addnotes", {
      title: title,
      content: content,
    })
      .then(() => {
        alert("yey it worked man");
        setListofnotes([...listofnotes, { title: title, content: content }]);
      })
      .catch(() => {
        alert("aww it didnt worked  man ");
      });
  };
  const updatenote = (id) => {
    const newtitle = prompt("enetr new title");
    const newcontent = prompt("enter new content");
    Axios.put("http://localhost:5000/update", {
      title: newtitle,
      content: newcontent,
      id: id,
    }).then(() => {
      setListofnotes(
        listofnotes.map((val) => {
          return val._id === id
            ? { _id: id, title: newtitle, content: newcontent }
            : val;
        })
      );
    });
  };
  const deletenote = (id) => {
    Axios.delete(`http://localhost:5000/delete/${id}`).then(() => {
      setListofnotes(
        listofnotes.filter((val) => {
          return val._id !== id;
        })
      );
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/read")
      .then((response) => {
        setListofnotes(response.data);
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);

  return (
    <div className="App">
      <div className="inputs">
        <input
          type="text"
          placeholder="title"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="content"
          onChange={(event) => {
            setContent(event.target.value);
          }}
        />
        <button onClick={addnotes}>ADD NOTES </button>
      </div>
      <div className="listofnotes">
        {listofnotes.map((val) => {
          return (
            <div className="notescontainer">
              <div className="notes">
                {" "}
                <h3> TITLE:{val.title}</h3>
                <h3> CONTENT:{val.content}</h3>
              </div>
              <button
                onClick={() => {
                  updatenote(val._id);
                }}
              >
                {" "}
                update
              </button>
              <button
                onClick={() => {
                  deletenote(val._id);
                }}
              >
                button
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
