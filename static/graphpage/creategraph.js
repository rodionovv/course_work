function main(s, level) {

    var graph = Viva.Graph.graph();
            // for (var from in new_graph) {
            //     new_graph[from].forEach((to) => {
            //         graph.addLink(from, to);
            //         graph.addLink(to, from);
            //     });
            // }
    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength : 500
    });
    graph.addNode(1, {side: "left"});
    graph.addNode(2, {side: "right"});
    graph.addLink(1, 2);

    var nodeSize = 300;
        

            // highlightRelatedNodes = function(nodeId, isOn) {
            //     console.log('here');
            //     var xhr_1 = new XMLHttpRequest();
            //     xhr_1.open('GET', '/', true);
            //     xhr_1.send(null);
            //     // just enumerate all realted nodes and update link color:
            //     // graph.forEachLinkedNode(nodeId, function(node, link){
            //     //     var linkUI = graphics.getLinkUI(link.id);
            //     //     if (linkUI) {
            //     //         // linkUI is a UI object created by graphics below
            //     //         linkUI.attr('stroke', isOn ? 'red' : 'gray');
            //     //     }
            //     // });
            //  };
        
    var graphics = Viva.Graph.View.svgGraphics();
    graphics.node((node) => {
    var ui =  Viva.Graph.svg('rect')
            .attr('width', nodeSize)
            .attr('height', nodeSize)
            .attr('fill', "#00a2e8")  
            .text(node.data.side);

        $(ui).dblclick(function (){
            var newLevel = parseInt(level) + 1
            window.location.href = "/graph/" + s + "/" + newLevel + "/" + ui.textContent;
        });
        return ui;
    }).placeNode((nodeUI, pos) => {
        nodeUI.attr('x', pos.x - nodeSize / 2).attr('y', pos.y - nodeSize / 2);
    });

    var renderer = Viva.Graph.View.renderer(graph, {
        graphics: graphics,
        layout: layout,
        renderLinks: true,
        prerender: true,
        container: document.getElementById('main'),
    });
    renderer.run();
}



    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', '/graph/' + s + "/" + level + "/data", true);
    // var new_graph;
    // xhr.onload = function (e) {
    //     if (xhr.readyState === 4) {
    //         new_graph = JSON.parse(xhr.responseText);
    //         console.log(new_graph);
            
    // }
    
    // xhr.send(null);
