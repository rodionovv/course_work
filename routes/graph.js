const {Router} = require('express');
const urlapi = require('url');
const fs = require('fs');


const rl = require('readline');
const router = Router();



router.get('/*.txt', (req, res) => {
    //creategraph

    const url = urlapi.parse(req.url);
    const file = url.pathname.split('/')[1]

    // var lines = fs.readFileSync(__dirname + '/../files/' + file, 'utf-8')
    //     .split('\n')
    //     .filter((line) => line[0] !== '#');
    //
    // console.log(lines);
    // var graph = new Map();


    // lineReader.on('line', (line) => {
    //     if (line[0] != '#') {
    //         var toFrom = line.split('\t');
    //         var from = toFrom[0];
    //         var to = toFrom[1];
    //         console.log(to + " " + from);
    //         if (graph.has(from)) {
    //             graph[from].push(to);
    //         } else {
    //             graph.set(from, [to]);
    //         }
    //         if (graph.has(to)) {
    //             graph[to].push(from);
    //         } else {
    //             graph.set(to, [from]);
    //         }
    //     }
    // });

    // console.log(graph)

    res.render('graph', {
        title: 'Graph Page',
        scripts: [
            {
                script: '../../graphpage/vivagraph.js'
            },
            {
                script: "../../graphpage/creategraph.js"
            }
        ],
        style: "../../graphpage/style.css"
    });
});


module.exports = router