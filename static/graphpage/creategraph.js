function main() {
    console.log('here');
    var graph = Viva.Graph.graph();
    graph.addLink(1, 2);
    var renderer = Viva.Graph.View.renderer(graph);
    renderer.run();
    console.log('end');
}