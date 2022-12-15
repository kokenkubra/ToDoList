import mongoose from "mongoose";
const {Schema} = mongoose;
const todoTaskSchema = new Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
});

const Blog = mongoose.model('TodoTask', todoTaskSchema);
export default Blog;