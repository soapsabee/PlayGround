const express = require("express");
var bodyParser = require('body-parser')
let date = require('date-and-time');
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => res.render('pages/index'));
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM product_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.end();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  

  app.get('/db/:id',  async (req, res) => {
    var pid = req.params.id;
     try {
      const client = await pool.connect()
      const result = await client.query(`SELECT * FROM product_table where id = ${pid}`);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/edit_pd', results );
      client.end();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })

  app.post('/db/save/',  async (req, res) => {
    var pid = req.body.id;
    /*var title = req.body.title;
    var price = req.body.price;
    var date = req.body.create_at;*/


     try {
      const client = await pool.connect()
      const result = await client.query(`UPDATE product_table SET id = ${pid},title = 'test2',price = '150',create_at = '2018/10/13' where id = ${pid}`);
      //const results = { 'results': (result) ? result.rows : null};
      res.render('pages/save');
      client.end();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })


app.post('/complete_add', async (req, res) =>{

  var title = req.body.title;
  var price = req.body.price;
  let now = new Date();
  let datenow = date.format(now, 'MM/DD/YYYY');

  try {
    const client = await pool.connect()
    const result = await client.query(`insert into product_table(title,price,create_at) values ('${title}','${price}','${datenow}')`);
    res.render('pages/complete_add');
    console.log("OK");
    client.end();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.get('/db/complete_del/:id', async (req, res) =>{
  var pid = req.params.id;

  try {
    const client = await pool.connect()
    const result = await client.query(`delete from product_table values where id = ${pid}`);
    res.render('pages/complete_del');
    console.log("OK");
    client.end();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

//app.post('/db/complete_del',(req,res) => res.render('pages/complete_del'));  
app.get('/insert_pd',(req,res) => res.render('pages/insert_pd'));
app.get('/edit_pd',(req,res) => res.render('pages/edit_pd'));

app.listen(process.env.PORT || 8000);

