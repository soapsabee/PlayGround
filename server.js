const express = require("express");
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'))

app.listen(process.env.PORT || 8000);