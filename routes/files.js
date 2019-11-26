const {Router} = require('express');
const router = Router();
const files = require('../files');
const fs =require('fs');

router.get('/', (req, res) => res.json(files));

router.get('/:id', (req, res) => {
    const found = files.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(files.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No file with the id of ${req.params.id}` });
    }
});

router.post('/add', (req, res) => {
    var file_dir = __dirname + '/../files'
    if (req.files) {
        var file = req.files.path,
            filename = file.name;
        if (file.mimetype == 'text/plain') {
            var file_path = file_dir + '/' + filename;
            if (!fs.existsSync(file_path)) {
                file.mv(file_path, function (err) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
        }
        const newFile = {
            name: req.body.name ? req.body.name : filename,
            path: filename
        };
        files.push(newFile);
        res.redirect('/');
    } else {
        res.status(400).send("Add file");
    }
});

module.exports = router;
