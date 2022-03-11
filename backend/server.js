const express = require("express");
const app = express();
const mongoose = require("mongoose");
const noteModel = require("./models/notes");
const cors = require("cors");
app.use(cors());
app.use(express.json());

/// DATABASE CONNECTION
mongoose.connect(
  "  mongodb+srv://vinay:vinay123!@cluster0.jg7hr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority ",
  { useNewUrlParser: true }
);

app.post("/addnotes", async (req, res) => {
  const note = new noteModel({
    title: req.body.title,
    content: req.body.content,
  });
  await note.save();
  res.send("Inserted DATA");
});
app.get("/read", async (req, res) => {
  noteModel.find((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", async (req, res) => {
  const newtitle = req.body.title;
  const newcontent = req.body.content;
  const id = req.body.id;
  try {
    await noteModel.findById(id, (err, notetoupdate) => {
      notetoupdate.title = newtitle;
      notetoupdate.content = newcontent;
      notetoupdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated");
});
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  res.send("itemdeleted");
});

app.listen(5000, () => {
  console.log("You are connected!");
});
