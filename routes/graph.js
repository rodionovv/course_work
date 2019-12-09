const {Router} = require('express');
const urlapi = require('url');
const fs = require('fs');


const rl = require('readline');
const router = Router();
const hello_world = require('bindings')('hello_world');

router.get('/info', (req, res) => {
    const url = urlapi.parse(req.url);
    const file = url.pathname.split('/')[1];
    console.log(file);
    res.json(hello_world.sayHI('/home/vasya/WebstormProjects/course_work' + '/files/' + 'email-Eu-core.txt'));
});



router.get('/*.txt', (req, res) => {
    //creategraph

    const url = urlapi.parse(req.url);
    const file = url.pathname.split('/')[2];

    res.render('graph', {
        title: 'Graph Page',
        scripts: [
            {
                script: "../../graphpage/vivagraph.js"
            },
            {
                script: "../../graphpage/creategraph.js"
            }
        ],
        style: "../../graphpage/style.css",
    });
});


module.exports = router