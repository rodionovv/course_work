function main() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/graph/info', true);
    var new_graph;
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            new_graph = JSON.parse(xhr.responseText);
            var graph = Viva.Graph.graph();
            for (var from in new_graph) {
                new_graph[from].forEach((to) => {
                    graph.addLink(from, to);
                    graph.addLink(to, from);
                });
            }
            var layout = Viva.Graph.Layout.forceDirected(graph, {
                springLength : 500
             });
             graph.forEachNode(function(node) {
                 layout.pinNode(node, true);
             });
            var graphics = Viva.Graph.View.webglGraphics();
            var renderer = Viva.Graph.View.renderer(graph, {
                graphics: graphics,
                layout: layout,
                renderLinks: true,
                prerender: true
            });
            renderer.run();
        }
    }
    
    xhr.send(null);
    
    console.log('end');
}
