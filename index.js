const fs = require('fs');
const express = require('express');
const uploadfiles = require('express-fileupload');

var file_dir = __dirname + '/files'

const app = express();
app.listen(9000, () => {
    if (!fs.existsSync(file_dir)) {
        fs.mkdirSync(file_dir);
    }
    console.log('Server is running on port 9000');
});

app.use(uploadfiles());
app.use('graph/', express.static('templates/graphpage/'));
app.use(express.static('templates/mainpage/'));

app.get('/', function (req, res) {
    console.log('get');
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync('templates/index.html'));
});


app.post('/', function(req, res) {
    if (req.files) {
        console.log(req.files);
        var file = req.files.file,
            filename = file.name;
        if (file.mimetype == 'text/plain') {
            var file_path = file_dir + '/' + filename;
            if (!fs.existsSync(file_path)) {
                file.mv(file_dir + '/' + filename, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
    }
});