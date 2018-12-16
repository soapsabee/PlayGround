const express = require("express");
var bodyParser = require('body-parser')
let date = require('date-and-time');
const axios = require('axios');
const app = express();


app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  axios.all([
    axios.get(`http://localhost:8080/api/find_AppByInstall/?installs=5,000,000`), 
    axios.get(`http://localhost:8080/api/find_AppByNews`)
  ])
    .then(axios.spread((resone, restwo) => {
      let product = [];
      let product2 = [];
      resone.data.map((posts) => {

        product.push(posts);
      })
      restwo.data.map((posts2) => {

        product2.push(posts2);
      })
      res.render('pages/index', { posts2: product2 , posts: product });
    }))
      .catch((error) => {
        // handle error
        console.log(error);
      })

    })

    app.get('/appby_name', (req, res) => {
      var name = req.query.name;
      axios.get(`http://localhost:8080/api/find_AppByName/?name=${name}`)
        .then(function (response) {
          let product = [];
          response.data.map((posts) => {
    
            product.push(posts);
          })
          res.render('pages/show_apps', { posts: product });
    
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    
    })


app.get('/show_apps/:category', (req, res) => {
  var category = req.params.category;
  axios.get(`http://localhost:8080/api/find_AppByCategory/?category=${category}`)
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);
      })
      res.render('pages/show_apps', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})

app.get('/appnews', (req, res) => {

  axios.get(`http://localhost:8080/api/find_AppByNews`)
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);
      })
      res.render('pages/show_apps', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})



app.get('/appMostlyInst', (req, res) => {

  axios.get(`http://localhost:8080/api/find_AppByInstall/?installs=5,000,000`)
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);
      })
      res.render('pages/show_apps', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})

app.get('/appby_type/:type', (req, res) => {
  var type = req.params.type;
  axios.get(`http://localhost:8080/api/find_AppByType/?type=${type}`)
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);

      })

      res.render('pages/show_apps', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})


app.get('/appby_rate', (req, res) => {
  var rate = req.query.rate;
  axios.get(`http://localhost:8080/api/find_AppByRate/?rating=${rate}`)
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);

      })

      res.render('pages/show_apps', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})

app.get('/review_app/:app/:category', (req, res) => {
  var apps = req.params.app;
  var category = req.params.category;
  axios.all([
    axios.get(`http://localhost:8080/api/findreviews/?app=${apps}`), 
    axios.get(`http://localhost:8080/api/find_AppByName/?name=${apps}`),
    axios.get(`http://localhost:8080/api/find_AppByCategory/?category=${category}`)
  ])
    .then(function (response_1,response_2,response_3) {
      let product = [];
      response_1.data.map((posts) => {

        product.push(posts);
        console.log(product)
      })
     
      res.render('pages/detail_app', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})

app.get('/api/find_AppByPrice/:price1/:price2', (req, res) => {
  var price1 = req.params.price1;
  var price2 = req.params.price2;

  axios.get(`http://localhost:8080/api/find_AppByPrice/?price1=${price1}&price2=${price2}`)
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);

      })

      res.render('pages/show_apps', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

})

app.get('/detail_app', (req, res) => {

  res.render('pages/detail_app');

})

app.get('/test_star', (req, res) => {



  axios.get('http://localhost:8080/api/alldetails')
    .then(function (response) {
      let product = [];
      response.data.map((posts) => {

        product.push(posts);
      })
      res.render('pages/test_star', { posts: product });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
})



app.listen(process.env.PORT || 8000);

