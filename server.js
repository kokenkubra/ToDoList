
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Blog from "./models/TodoTask.js"
// Set up MongoDB connection

dotenv.config();
mongoose
.connect(process.env.DB_CONNECT, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => console.log('DB connected!'))
.catch(err => console.error(err));

//console.log(err.message);
// Create a new Express application
const app = express();
//set css
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Set up EJS as the view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Use body-parser to parse form data sent via HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));

// Use body-parser to parse JSON data sent via HTTP POST
app.use(bodyParser.json());

// Set up a route to serve the homepage

app.get("/", (req, res) => {
  Blog.find({}, (err, tasks) => {
  res.render("todo.ejs", { todoTasks: tasks });
  });
  });

app.post('/',async (req, res) => {
    const todoTaskk = new Blog({
    content: req.body.content
    });
    try {
    await todoTaskk.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
});
app
.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
Blog.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
Blog.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});
// Start the server on port 3000
app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  Blog.findByIdAndRemove(id, err => {
  if (err) return res.send(500, err);
  res.redirect("/");
  });
  });
app.listen(3001, () => {
  console.log('MERN app listening on port 3001!');
});
