const {Router} = require('express');
const urlapi = require('url');
const fs = require('fs');


const rl = require('readline');
const router = Router();
const hello_world = require('bindings')('hello_world');


var communities;


router.get('/*.txt/*/data', (req, res) => {
    const url = urlapi.parse(req.url);
    const file = url.pathname.split('/')[1];
    var communities = hello_world.sayHI('/home/vasya/WebstormProjects/course_work' + '/files/' + 'test.txt');
});




router.get('/*.txt/*/*', (req, res) => {

    const url = urlapi.parse(req.url);
    const splitURL = url.pathname.split('/');
    const level = splitURL[2];
    const file = splitURL[1];
    const side = splitURL[3];

    communities = hello_world.sayHI('/home/vasya/WebstormProjects/course_work' + '/files/' + 'test.txt');
    console.log(communities[side])

    var redirectPath = "/" + file + "/" + level;
    // var json = hello_world.sayHI('/home/vasya/WebstormProjects/course_work' + '/files/' + 'test.txt');
    res.redirect(redirectPath)
});


router.get('/*.txt/*', (req, res) => {

    const url = urlapi.parse(req.url);
    const splitURL = url.pathname.split('/');
    const level = splitURL[2];
    const file = splitURL[1];

    
    // var json = hello_world.sayHI('/home/vasya/WebstormProjects/course_work' + '/files/' + 'test.txt');
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
        file: file,
        level: level
    });
});


module.exports = router