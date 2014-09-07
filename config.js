/*** USE THIS FILE TO SET OPTIONS ***/

setParams({
    graphFile : "miserables.gexf",
        /*
            The GEXF file to show ! -- can be overriden by adding
            a hash to the document location, e.g. index.html#celegans.gexf
        */
	showEdges : true,
        /*
            Default state of the "show edges" button
        */
    useLens : false,
        /*
            Default state of the "use lens" button
        */
    zoomLevel : 0,
        /*
            Default zoom level. At zoom = 0, the graph should fill a 800x700px zone
         */
    ctlZoomPosition : "left",
        /*
            Defines the position of the Zoom Control Buttons : "left" or "right"
            this setting can't be changed from the User Interface
         */
    curvedEdges : true,
        /*
            False for curved edges, true for straight edges
            this setting can't be changed from the User Interface
        */
    edgeWidthFactor : 1,
        /*
            Change this parameter for wider or narrower edges
            this setting can't be changed from the User Interface
        */
    minEdgeWidth : 1,
    maxEdgeWidth : 50,
    textDisplayThreshold: 9,
    labelQuadraticFactor : 1,
        /*
            If more than 1, makes the big labels even bigger.
            If 1, nothing changes.
            If less than 1, makes the big labels smallers
            If 0, every label has the same size
           this setting can't be changed from the User Interface
        */    
    nodeSizeFactor : 1,
        /*
            Change this parameter for smaller or larger nodes
           this setting can't be changed from the User Interface
        */
    replaceUrls : true,
        /*
            Enable the replacement of Urls by Hyperlinks
            this setting can't be changed from the User Interface
        */
    showEdgeWeight : true,
        /*
            Show the weight of edges in the list
            this setting can't be changed from the User Interface
        */
    showEdgesWhileDragging : false,
        /*
            Show edges when dragging the graph. If False, the display is much quicker
            this setting can't be changed from the User Interface
        */
    language: false
        /*
            Set to an ISO language code to switch the interface to that language.
            Available languages are English [en], French [fr], Spanish [es],
            Italian [it], Finnish [fi], Turkish [tr] and Greek [el].
            If set to false, the language will be that of the user's browser.
        */
});
