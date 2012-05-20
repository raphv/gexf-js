/*** USE THIS FILE TO SET OPTIONS ***/

setParams({
    graphFile : "miserables.gexf", // The GEXF file to show ! -- can be overriden by adding
                                   // a hash to the document location, e.g. index.html#celegans.gexf
	showEdges : true, // Default state of the "show edges" button -- user-modifiable
    useLens : false, // Default state of the "use lens" button -- user-modifiable
    zoomLevel : 0, // Default zoom level. At zoom = 0, the graph should fill a 800x700px zone
    curvedEdges : true, // False for curved edges, true for straight edges -- non-user-modifiable at the moment
    edgeWidthFactor : 1, // Change this parameter for wider or narrower edges -- non-user-modifiable at the moment
    nodeSizeFactor : 1, // Change this parameter for smaller or larger nodes -- non-user-modifiable at the moment
    replaceUrls : true, // Enable the replacement of Urls by Hyperlinks -- non-user-modifiable at the moment
    showEdgeWeight : true // Show the weight of edges in the list -- non-user-modifiable at the moment
});
