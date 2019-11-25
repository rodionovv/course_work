const fs = require('fs');
const express = require('express');
const uploadfiles = require('express-fileupload');

const app = express();
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

app.use(uploadfiles());


app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('index.html'));
})


app.post('/addfile', function(req, res) {
    if (req.files) {
        var file = req.files.top,
            filename = file.name;
        file.mv(__dirname + '/files/' + filename, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send('done');
            }
        })
    }
});