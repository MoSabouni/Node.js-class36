const express = require('express')
const app = express();
app.use(express.json());
const fs = require("fs");

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World3')
})



app.post('/blogs', (req, res) => {
    // How to get the title and content from the request??
    const title = req.body.title;
    const content = req.body.content;
    console.log(title, content)
    fs.writeFileSync(title, content);
    res.end('ok')
})
 
app.put('/posts/:title', (req, res) => {
  // How to get the title and content from the request?
  const title = req.body.title;
    const content = req.body.content;
  // What if the request does not have a title and/or content?
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok')
  }
  else {
    res.end('This post does not exist!')
  }
});

app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title; 
  if (fs.existsSync(title)) { // Add condition here
    fs.unlinkSync(title);
    res.end('ok');
  } else {
   res.end("title does not exist.")
  }
});

app.get('/blogs/:title', (req, res) => {

  // How to get the title from the url parameters?
  const title = req.params.title
  // check if post exists
  
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.send(post)
  } else {
    res.send("file does not exist")
  }
  // send response
});


app.listen(3000)