const {Router} = require('express');
const router = Router();



router.get('/*.txt', (req, res) => {
    //creategraph
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