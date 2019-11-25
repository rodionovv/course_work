const fs = require('fs');
const express = require('express');
const uploadfiles = require('express-fileupload');

const app = express();
app.listen(9000, () => {
    console.log('Server is running on port 8000');
});

app.use(uploadfiles());
app.use(express.static('templates'));

app.get('/', function (req, res) {
    console.log('get');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('lsjfglkjfl;cvkjbsl;kbjsl;kfzl;kvbjs;klfdjbs;klftemplates/index.html'));
});


app.post('/addfile', function(req, res) {
    if (req.files) {
        var file = req.files.top,
            filename = file.name;
        file.mv(__dirname + '/files/' + filename, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.writeHead(200, {'Content-Type' : 'text/html'});
                res.end(fs.readFileSync('templates/graphpage/graphpage.html'));
            }
        })
    }
});