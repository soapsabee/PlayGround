const express = require("express");
const app = express();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
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

app.post('add', async (req, res) =>{

  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM product_table');
    //const results = { 'results': (result) ? result.rows : null};
    res.render('pages/add');
    console.log("OK");
    client.end();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})


app.get('/add',(req,res) => res.render('pages/add'));
app.get('/insert_pd',(req,res) => res.render('pages/insert_pd'));
app.get('/edit_pd',(req,res) => res.render('pages/edit_pd'));

app.listen(process.env.PORT || 8000);

