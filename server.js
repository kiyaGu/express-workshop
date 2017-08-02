const express = require('express');
const app = express();
const formidable = require('express-formidable');
const fs = require('fs');
app.use(express.static('public'));
app.use(formidable());

app.post('/create-post', (req, res) => {
  let parsedFile = {};
  fs.readFile('data/posts.json', (error, file)=>{
    if (error) throw err
    //if the file is not empty
    if(file.toString() !== ""){
      parsedFile = JSON.parse(file);;
    }

    let timestamp = Date.now();
    //computed property [] as key
    let blogpost = { [timestamp] : req.fields.blogpost };
    let obj = {};
    //if there exsits an old post append thenew one to it
    if(parsedFile !== {}){
      obj = Object.assign(parsedFile, blogpost);
    } else{
      obj = blogpost;
    }
    fs.writeFile('data/posts.json', JSON.stringify(obj), function(error){
      if(error){
        console.log(error);
      }
    });
  });

});
app.get('/get-posts', (req, res) => {
  res.sendFile(__dirname +'/data/posts.json',function (err) {
  if (err){
    throw err;
  } else {
    console.log('Sent:', "posts.json");
  }
});
})
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
