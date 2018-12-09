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
app.get('/product_list', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM product_table ORDER BY id ASC');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/product_list', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  


  app.get('/product_list/:id',  async (req, res) => {
    var pid = req.params.id;
     try {
      const client = await pool.connect()
      const result = await client.query(`SELECT * FROM product_table where id = ${pid}`);
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/edit_pd', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })


app.listen(process.env.PORT || 8000);

