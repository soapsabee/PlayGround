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

app.post('/complete_del', async (req, res) =>{
  try {
    const client = await pool.connect()
    const result = await client.query(`delete from product_table values where id = 1`);
    res.render('pages/complete_del');
    console.log("OK");
    client.end();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

//app.post('/complete_del',(req,res) => res.render('pages/complete_del'));  
app.get('/insert_pd',(req,res) => res.render('pages/insert_pd'));
app.get('/edit_pd',(req,res) => res.render('pages/edit_pd'));

app.listen(process.env.PORT || 8000);

