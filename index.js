const fs = require('fs');
const express = require('express');
const uploadfiles = require('express-fileupload');
const exphbs = require('express-handlebars');
const files = require('./files');
const file_router = require('./routes/files');
const graph_router = require('./routes/graph');


const app = express();
const PORT = process.env.port || 9000;
var file_dir = __dirname + '/files'

var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        link: (path) =>  "graph/" + path,
    }
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(uploadfiles());
app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded( { extended: false }));


app.get('/', (req, res) => res.render('index', {
    title: 'Home Page',
    files,
}));


app.use('/files', file_router);
app.use('/graph', graph_router);

app.listen(PORT, () => {
    if (!fs.existsSync(file_dir)) {
        fs.mkdirSync(file_dir);
    }
    console.log('Server is running on port 9000');
});



