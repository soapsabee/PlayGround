const express = require("express");
var bodyParser = require('body-parser')
let date = require('date-and-time');
const axios = require('axios');
const app = express();


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => {

  axios.get('http://localhost:8080/api/alldetails')
  .then(function (response) {
    let product = [];
    response.data.map((posts)=>{

      product.push(posts);
    })
    res.render('pages/index',{posts: product});
    console.log("id1"+product[1].app);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
  
app.get('/show_apps',(req, res) =>{
 
  axios.get('http://localhost:8080/api/alldetails')
  .then(function (response) {
    let product = [];
    response.data.map((posts)=>{

      product.push(posts);
    })
    res.render('pages/show_apps', {posts : product});
   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
})


app.get('/review_app/:app',(req, res) =>{
 var apps = req.params.app;
  axios.get(`http://localhost:8080/api/findreviews/?app=${apps}`)
  .then(function (response) {
    let product = [];
    response.data.map((posts)=>{

      product.push(posts);
      
    })
    
    res.render('pages/review_app', {posts : product});
   
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
})

});



app.listen(process.env.PORT || 8000);

