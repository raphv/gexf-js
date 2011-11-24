// Namespace

var GexfJS = {
    lensRadius : 200,
    lensGamma : 0.5,
    zoneGraphe : {
        largeur : 0,
        hauteur : 0,
    },
    oldZoneGraphe : {},
    params : {
        zoomLevel : 0,
        centreX : 400,
        centreY : 350,
        activeNode : -1,
        currentNode : -1,
        showEdges : true,
        useLens : false
    },
    oldParams : {},
    minZoom : -3,
    maxZoom : 10,
    overviewWidth : 200,
    overviewHeight : 175,
    baseWidth : 800,
    baseHeight : 700,
    overviewScale : .25,
    totalScroll : 0,
    autoCompletePosition : 0,
    i18n : {
        "fr" : {
            "search" : "Rechercher un n&oelig;ud",
            "nodeAttr" : "Attributs",
            "nodes" : "N&oelig;uds",
            "inLinks" : "Liens entrants depuis :",
            "outLinks" : "Liens sortants vers :",
            "undirLinks" : "Liens non-dirigés avec :",
            "lensOn" : "Activer le mode loupe",
            "lensOff" : "Désactiver le mode loupe",
            "edgeOn" : "Afficher les sommets",
            "edgeOff" : "Cacher les sommets",
            "zoomIn" : "S'approcher",
            "zoomOut" : "S'éloigner",
            "browserErr" : 'Votre navigateur n\'est malheureusement pas compatible avec les fonctionnalités de ce site<br />Nous vous suggérons d\'utiliser une version récente de <a href="http://www.mozilla.com/" target="_blank">Firefox</a> ou <a href="http://www.google.com/chrome/" target="_blank">Chrome</a>',
            "modularity_class" : "Classe de modularité",
            "degree" : "Degr&eacute;",
            "indegree" : "&frac12; degr&eacute; int&eacute;rieur",
            "outdegree" : "&frac12; degr&eacute; ext&eacute;rieur",
            "weighted degree" : "Degr&eacute; pond&eacute;r&eacute;",
            "weighted indegree" : "&frac12; degr&eacute; int&eacute;rieur pond&eacute;r&eacute;",
            "weighted outdegree" : "&frac12; degr&eacute; ext&eacute;rieur pond&eacute;r&eacute;",
            "closnesscentrality" : "Centralit&eacute; de proximit&eacute;",
            "betweenesscentrality" : "Centralit&eacute; d'interm&eacute;diarit&eacute;",
            "authority" : "Score d'autorit&eacute; (HITS)",
            "hub" : "Score de hub (HITS)",
            "pageranks" : "Score de PageRank"
        },
        "en" : {
            "search" : "Search nodes",
            "nodeAttr" : "Attributes",
            "nodes" : "Nodes",
            "inLinks" : "Inbound Links from :",
            "outLinks" : "Outbound Links to :",
            "undirLinks" : "Undirected links with :",
            "lensOn" : "Activate lens mode",
            "lensOff" : "Deactivate lens mode",
            "edgeOn" : "Show edges",
            "edgeOff" : "Hide edges",
            "zoomIn" : "Zoom In",
            "zoomOut" : "Zoom Out",
            "browserErr" : 'Your browser cannot properly display this page.<br />We recommend you use the latest <a href="http://www.mozilla.com/" target="_blank">Firefox</a> or <a href="http://www.google.com/chrome/" target="_blank">Chrome</a> version'
        }
    },
    lang : "en"
}

function strLang(_str) {
    var _l = GexfJS.i18n[GexfJS.lang];
    return ( _l[_str] ? _l[_str] : ( GexfJS.i18n["en"][_str] ? GexfJS.i18n["en"][_str] : _str.replace("_"," ") ) );
}

function displayNode(_indiceNoeud, _recentre) {
    GexfJS.params.currentNode = _indiceNoeud;
    if (_indiceNoeud != -1) {
        var _d = GexfJS.graph.nodeList[_indiceNoeud],
            _b = _d.coords.base,
            _chaine = '',
            _cG = $("#colonnegauche");
            _cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
        _chaine += '<h3><div class="largepill" style="background: ' + _d.couleur.base +'"></div>' + _d.label + '</h3>';
        _chaine += '<h4>' + strLang("nodeAttr") + '</h4>';
        _chaine += '<ul><li><b>id</b> : ' + _d.id + '</li>';
        for (var i in _d.attributes) {
            _chaine += '<li><b>' + strLang(i) + '</b> : ' + _d.attributes[i] + '</li>';
        }
        _chaine += '</ul><h4>' + ( GexfJS.graph.directed ? strLang("inLinks") : strLang("undirLinks") ) + '</h4><ul>';
        for (var i in GexfJS.graph.edgeList) {
            var _e = GexfJS.graph.edgeList[i]
            if ( _e.target == _indiceNoeud ) {
                var _n = GexfJS.graph.nodeList[_e.source];
                _chaine += '<li><div class="smallpill" style="background: ' + _n.couleur.base +'"></div><a href="#" onmouseover="GexfJS.params.activeNode = ' + _e.source + '" onclick="displayNode(' + _e.source + ', true); return false;">' + _n.label + '</a></li>';
            }
        }
        if (GexfJS.graph.directed) _chaine += '</ul><h4>' + strLang("outLinks") + '</h4><ul>';
        for (var i in GexfJS.graph.edgeList) {
            var _e = GexfJS.graph.edgeList[i]
            if ( _e.source == _indiceNoeud ) {
                var _n = GexfJS.graph.nodeList[_e.target];
                _chaine += '<li><div class="smallpill" style="background: ' + _n.couleur.base +'"></div><a href="#" onmouseover="GexfJS.params.activeNode = ' + _e.target + '" onclick="displayNode(' + _e.target + ', true); return false;">' + _n.label + '</a></li>';
            }
        }
        _chaine += '</ul><p></p>';
        $("#leftcontent").html(_chaine);
        if (_recentre) {
            GexfJS.params.centreX = _b.x;
            GexfJS.params.centreY = _b.y;
        }
        $("#searchinput")
            .val(_d.label)
            .removeClass('inputgris');
    }
}

function updateSizes() {
    // fonction qui met à jour la taille de la zone de travail
    var _elZC = $("#zonecentre");
    var _top = {
        top : $("#titlebar").height() + "px"
    }
    _elZC.css(_top);
    // ajuste zoneCentre par rapport à la barre
    $("#colonnegauche").css(_top);
    GexfJS.zoneGraphe.largeur = _elZC.width();
    GexfJS.zoneGraphe.hauteur = _elZC.height();
    GexfJS.grapheIdentique = true;
    // vérifie si GexfJS.zoneGraphe a changé
    for (var i in GexfJS.zoneGraphe) {
        GexfJS.grapheIdentique = GexfJS.grapheIdentique && ( GexfJS.zoneGraphe[i] == GexfJS.oldZoneGraphe[i] );
    }
    if (!GexfJS.grapheIdentique) {
    // S'il y a eu du changement, on change également #carte
    $("#carte")
        .attr({
            width : GexfJS.zoneGraphe.largeur,
            height : GexfJS.zoneGraphe.hauteur
        })
        .css({
            width : GexfJS.zoneGraphe.largeur + "px",
            height : GexfJS.zoneGraphe.hauteur + "px"
        });
        // On remet en mémoire zoneGraphe dans oldZoneGraphe
        for (var i in GexfJS.zoneGraphe) {
            GexfJS.oldZoneGraphe[i] = GexfJS.zoneGraphe[i];
        }
    }
    // fin de la fonction updateSizes
}

function startMove(evt) {
    evt.preventDefault();
    GexfJS.dragOn = true;
    GexfJS.lastMouse = {
        x : evt.pageX,
        y : evt.pageY
    }
    GexfJS.sEstDeplace = false;
}

function endMove(evt) {
    document.body.style.cursor = "default";
    GexfJS.dragOn = false;
    GexfJS.sEstDeplace = false;
}

function clicGraphe(evt) {
    if (!GexfJS.sEstDeplace) {
        displayNode(GexfJS.params.activeNode);
    }
    endMove();
}

function deplaceCarte(evt, echelle) {
    document.body.style.cursor = "move";
    var _coord = {
        x : evt.pageX,
        y : evt.pageY
    };
    GexfJS.params.centreX += ( GexfJS.lastMouse.x - _coord.x ) / echelle;
    GexfJS.params.centreY += ( GexfJS.lastMouse.y - _coord.y ) / echelle;
    GexfJS.lastMouse = _coord;
}

function moveGraph(evt) {
    evt.preventDefault();
    if (!GexfJS.graph) {
        return;
    }
    GexfJS.mousePosition = {
        x : evt.pageX - $(this).offset().left,
        y : evt.pageY - $(this).offset().top
    }
    if (GexfJS.dragOn) {
        deplaceCarte(evt,GexfJS.echelleGenerale);
        GexfJS.sEstDeplace = true;
    } else {
        GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
        document.body.style.cursor = ( GexfJS.params.activeNode != -1 ? "pointer" : "default" );
    }
}

function bougeMini(evt) {
    if (GexfJS.dragOn) {
        deplaceCarte(evt,-GexfJS.overviewScale);
    }
}

function scrollMap(evt, delta) {
    GexfJS.totalScroll += delta;
    if (Math.abs(GexfJS.totalScroll) >= 1) {
        if (GexfJS.totalScroll < 0) {
            if (GexfJS.params.zoomLevel > GexfJS.minZoom) {
                GexfJS.params.zoomLevel--;
                $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
            }
        } else {
            if (GexfJS.params.zoomLevel < GexfJS.maxZoom) {
                GexfJS.params.zoomLevel++;
                $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
            }
        }
        GexfJS.totalScroll = 0;
    }
}

function initializeMap() {
    clearInterval(GexfJS.timeRefresh);
    GexfJS.oldParams = {};
    GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.zoneGraphe.largeur, GexfJS.zoneGraphe.hauteur);
    $("#zoomSlider").slider({
        orientation: "vertical",
        value: GexfJS.params.zoomLevel,
        min: GexfJS.minZoom,
        max: GexfJS.maxZoom,
        range: "min",
        step: 1,
        slide: function( event, ui ) {
            GexfJS.params.zoomLevel = ui.value;
        }
    });
    $("#overviewzone").css({
        width : GexfJS.overviewWidth + "px",
        height : GexfJS.overviewHeight + "px"
    });
    $("#overview").attr({
        width : GexfJS.overviewWidth,
        height : GexfJS.overviewHeight
    });
    GexfJS.timeRefresh = setInterval(traceMap,60);
    if (!GexfJS.graph) {
        chargeGraphe();
    }
}

function chargeGraphe() {
    
    $.ajax({
        url: ( document.location.hash.length > 1 ? document.location.hash.substr(1) : "default.gexf" ),
        dataType: "xml",
        success: function(data) {
            var _s = new Date();
            var _g = $(data).find("graph"),
                _nodes = _g.children().filter("nodes").children(),
                _edges = _g.children().filter("edges").children();
            GexfJS.graph = {
                directed : ( _g.attr("defaultedgetype") == "directed" ),
                source : data,
                nodeList : [],
                nodeIndexById : [],
                nodeIndexByLabel : [],
                edgeList : []
            }
            var _xmin = 1e9, _xmax = -1e9, _ymin = 1e9, _ymax = -1e9; _marge = 30;
            $(_nodes).each(function() {
                var _n = $(this),
                _pos = _n.find("viz\\:position,position"),
                _x = _pos.attr("x"),
                _y = _pos.attr("y");
                _xmin = Math.min(_x, _xmin);
                _xmax = Math.max(_x, _xmax);
                _ymin = Math.min(_y, _ymin);
                _ymax = Math.max(_y, _ymax);
            });
            
            var _echelle = Math.min( ( GexfJS.baseWidth - _marge ) / ( _xmax - _xmin ) , ( GexfJS.baseHeight - _marge ) / ( _ymax - _ymin ) );
            var _deltax = ( GexfJS.baseWidth - _echelle * ( _xmin + _xmax ) ) / 2;
            var _deltay = ( GexfJS.baseHeight - _echelle * ( _ymin + _ymax ) ) / 2;
            
            GexfJS.ctxMini.clearRect(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
            
            $(_nodes).each( function() {
                var _n = $(this),
                    _id = _n.attr("id"),
                    _label = _n.attr("label"),
                    _d = {
                        id: _id,
                        label: _label
                    },
                    _pos = _n.find("viz\\:position,position"),
                    _x = _pos.attr("x"),
                    _y = _pos.attr("y"),
                    _size = _n.find("viz\\:size,size").attr("value"),
                    _col = _n.find("viz\\:color,color"),
                    _r = _col.attr("r"),
                    _g = _col.attr("g"),
                    _b = _col.attr("b"),
                    _attr = _n.find("attvalue");
                _d.coords = {
                    base : {
                        x : _deltax + _echelle * _x,
                        y : _deltay - _echelle * _y,
                        r : _echelle * _size
                    }
                }
                _d.couleur = {
                    rgb : {
                        r : _r,
                        g : _g,
                        b : _b
                    },
                    base : "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                    gris : "rgba(" + Math.floor(84 + .33 * _r) + "," + Math.floor(84 + .33 * _g) + "," + Math.floor(84 + .33 * _b) + ",.5)"
                }
                _d.attributes = [];
                $(_attr).each(function() {
                    var _a = $(this),
                        _for = _a.attr("for");
                    _d.attributes[ _for ? _for : 'attribute_' + _a.attr("id") ] = _a.attr("value");
                });
                GexfJS.graph.nodeIndexById.push(_id);
                GexfJS.graph.nodeIndexByLabel.push(_label.toLowerCase());
                GexfJS.graph.nodeList.push(_d);
                GexfJS.ctxMini.fillStyle = _d.couleur.base;
                GexfJS.ctxMini.beginPath();
                GexfJS.ctxMini.arc( _d.coords.base.x * GexfJS.overviewScale , _d.coords.base.y * GexfJS.overviewScale , _d.coords.base.r * GexfJS.overviewScale + 1 , 0 , Math.PI*2 , true );
                GexfJS.ctxMini.closePath();
                GexfJS.ctxMini.fill();
            });
            
            $(_edges).each(function() {
                var _e = $(this),
                    _sid = _e.attr("source"),
                    _six = GexfJS.graph.nodeIndexById.indexOf(_sid);
                    _tid = _e.attr("target"),
                    _tix = GexfJS.graph.nodeIndexById.indexOf(_tid);
                    _w = _e.find('attvalue[for="weight"]').attr('value');
                    _col = _e.find("color");
                if (_col.length) {
                    var _r = _col.attr("r"),
                        _g = _col.attr("g"),
                        _b = _col.attr("b");
                } else {
                    var _scol = GexfJS.graph.nodeList[_six].couleur.rgb;
                    if (GexfJS.graph.directed) {
                        var _r = _scol.r,
                            _g = _scol.g,
                            _b = _scol.b;
                    } else {
                        var _tcol = GexfJS.graph.nodeList[_tix].couleur.rgb,
                            _r = Math.floor( .5 * _scol.r + .5 * _tcol.r ),
                            _g = Math.floor( .5 * _scol.g + .5 * _tcol.g ),
                            _b = Math.floor( .5 * _scol.b + .5 * _tcol.b );
                    }
                }
                GexfJS.graph.edgeList.push({
                    source : _six,
                    target : _tix,
                    width : ( _w ? _w : 1 ) * _echelle,
                    couleur : "rgba(" + _r + "," + _g + "," + _b + ",.7)"
                });
            });
            
            GexfJS.imageMini = GexfJS.ctxMini.getImageData(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
        
        //changeNiveau(0);
        }
    });
}

function getNodeFromPos( _coords ) {
    for (var i = GexfJS.graph.nodeList.length - 1; i >= 0; i--) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.dansCadre) {
            var _c = _d.coords.actuel;
                _r = Math.sqrt( Math.pow( _c.x - _coords.x , 2) + Math.pow( _c.y - _coords.y , 2 ) );
            if ( _r < _c.r ) {
                return i;
            }
        }
    }
    return -1;
}

function calcCoord(x, y, coord) {
    var _r = Math.sqrt( Math.pow( coord.x - x , 2 ) + Math.pow( coord.y - y , 2 ) );
    if ( _r < GexfJS.lensRadius ) {
        var _cos = ( coord.x - x ) / _r;
        var _sin = ( coord.y - y ) / _r;
        var _newr = GexfJS.lensRadius * Math.pow( _r / GexfJS.lensRadius, GexfJS.lensGamma );
        var _coeff = ( GexfJS.lensGamma * Math.pow( ( _r + 1 ) / GexfJS.lensRadius, GexfJS.lensGamma - 1 ) );
        return {
            "x" : x + _newr * _cos,
            "y" : y + _newr * _sin,
            "r" : _coeff * coord.r
        }
    }
    else {
        return coord;
    }
}

function traceArc(contexte, source, target) {
    contexte.beginPath();
    contexte.moveTo(source.x, source.y);
    if ( ( source.x == target.x ) && ( source.y == target.y ) ) {
        var x3 = source.x + 2.8 * source.r;
        var y3 = source.y - source.r;
        var x4 = source.x;
        var y4 = source.y + 2.8 * source.r;
        contexte.bezierCurveTo(x3,y3,x4,y4,source.x + 1,source.y);
    } else {
        var x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
        var y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
        var x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
        var y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
        contexte.bezierCurveTo(x3,y3,x4,y4,target.x,target.y);
    }
    contexte.stroke();
}

function traceMap() {
    updateSizes();
    if (!GexfJS.graph) {
        return;
    }
    var _identique = GexfJS.grapheIdentique;
    GexfJS.params.mousePosition = ( GexfJS.params.useLens ? ( GexfJS.mousePosition ? ( GexfJS.mousePosition.x + "," + GexfJS.mousePosition.y ) : "out" ) : null );
    for (var i in GexfJS.params) {
        _identique = _identique && ( GexfJS.params[i] == GexfJS.oldParams[i] );
    }
    if (_identique) {
        return;
    } else {
        for (var i in GexfJS.params) {
            GexfJS.oldParams[i] = GexfJS.params[i];
        }
    }
    
    GexfJS.echelleGenerale = Math.pow( Math.sqrt(2), GexfJS.params.zoomLevel );
    GexfJS.decalageX = ( GexfJS.zoneGraphe.largeur / 2 ) - ( GexfJS.params.centreX * GexfJS.echelleGenerale );
    GexfJS.decalageY = ( GexfJS.zoneGraphe.hauteur / 2 ) - ( GexfJS.params.centreY * GexfJS.echelleGenerale );
    
    var _coefftaille = Math.pow(GexfJS.echelleGenerale, -.15),
        _coefftxt = 1,
        _limTxt = 9;
    
    GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.zoneGraphe.largeur, GexfJS.zoneGraphe.hauteur);
    
    if (GexfJS.params.useLens && GexfJS.mousePosition) {
        GexfJS.ctxGraphe.fillStyle = "rgba(220,220,250,0.4)";
        GexfJS.ctxGraphe.beginPath();
        GexfJS.ctxGraphe.arc( GexfJS.mousePosition.x , GexfJS.mousePosition.y , GexfJS.lensRadius , 0 , Math.PI*2 , true );
        GexfJS.ctxGraphe.closePath();
        GexfJS.ctxGraphe.fill();
    }
    
    var _noeudCentral = ( ( GexfJS.params.activeNode != -1 ) ? GexfJS.params.activeNode : GexfJS.params.currentNode );
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        _d.coords.actuel = {
            x : GexfJS.echelleGenerale * _d.coords.base.x + GexfJS.decalageX,
            y : GexfJS.echelleGenerale * _d.coords.base.y + GexfJS.decalageY,
            r : GexfJS.echelleGenerale * _d.coords.base.r * _coefftaille
        }
        _d.dansCadre = ( ( _d.coords.actuel.x + _d.coords.actuel.r > 0 ) && ( _d.coords.actuel.x - _d.coords.actuel.r < GexfJS.zoneGraphe.largeur ) && ( _d.coords.actuel.y + _d.coords.actuel.r > 0) && (_d.coords.actuel.y - _d.coords.actuel.r < GexfJS.zoneGraphe.hauteur) );
        _d.visible = ( GexfJS.params.currentNode == -1 || i == _noeudCentral || GexfJS.params.showEdges );
    }
    
    var _tagsMisEnValeur = [];
    
    if ( _noeudCentral != -1 ) {
        _tagsMisEnValeur = [ _noeudCentral ];
    }
    
    var _displayEdges = ( GexfJS.params.showEdges && GexfJS.params.currentNode == -1 );
    
    for (var i in GexfJS.graph.edgeList) {
        var _d = GexfJS.graph.edgeList[i],
            _six = _d.source,
            _tix = _d.target,
            _ds = GexfJS.graph.nodeList[_six],
            _dt = GexfJS.graph.nodeList[_tix];
        var _lie = false;
        if (_noeudCentral != -1) {
            if (_six == _noeudCentral) {
                _tagsMisEnValeur.push(_tix);
                _coulTag = _dt.couleur.base;
                _lie = true;
                _dt.visible = true;
            }
            if (_tix == _noeudCentral) {
                _tagsMisEnValeur.push(_six);
                _coulTag = _ds.couleur.base;
                _lie = true;
                _ds.visible = true;
            }
        }

        if ( ( _lie || _displayEdges ) && ( _ds.dansCadre || _dt.dansCadre ) &&  _ds.visible && _dt.visible ) {
            GexfJS.ctxGraphe.lineWidth = GexfJS.echelleGenerale * _coefftaille * _d.width;
            var _coords = ( ( GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _ds.coords.actuel ) : _ds.coords.actuel );
            _coordt = ( (GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dt.coords.actuel ) : _dt.coords.actuel );
            GexfJS.ctxGraphe.strokeStyle = ( _lie ? _d.couleur : "rgba(100,100,100,0.2)" );
            traceArc(GexfJS.ctxGraphe, _coords, _coordt);
        }
    }
    GexfJS.ctxGraphe.lineWidth = 4;
    GexfJS.ctxGraphe.strokeStyle = "rgba(0,100,0,0.8)";
    
    if (_noeudCentral != -1) {
        var _dnc = GexfJS.graph.nodeList[_noeudCentral];
        _dnc.coords.reel = ( (GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _dnc.coords.actuel ) : _dnc.coords.actuel );
    }
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.dansCadre) {
            if (i != _noeudCentral) {
                _d.coords.reel = ( ( GexfJS.params.useLens && GexfJS.mousePosition ) ? calcCoord( GexfJS.mousePosition.x , GexfJS.mousePosition.y , _d.coords.actuel ) : _d.coords.actuel );
                _d.isTag = ( _tagsMisEnValeur.indexOf(parseInt(i)) != -1 );
                GexfJS.ctxGraphe.beginPath();
                GexfJS.ctxGraphe.fillStyle = ( ( _tagsMisEnValeur.length && !_d.isTag ) ? _d.couleur.gris : _d.couleur.base );
                GexfJS.ctxGraphe.arc( _d.coords.reel.x , _d.coords.reel.y , _d.coords.reel.r , 0 , Math.PI*2 , true );
                GexfJS.ctxGraphe.closePath();
                GexfJS.ctxGraphe.fill();
            }
        }
    }
    
    for (var i in GexfJS.graph.nodeList) {
        var _d = GexfJS.graph.nodeList[i];
        if (_d.visible && _d.dansCadre) {
            if (i != _noeudCentral) {
                var _fs = _d.coords.reel.r * _coefftxt;
                if (_d.isTag) {
                    if (_noeudCentral != -1) {
                        var _dist = Math.sqrt( Math.pow( _d.coords.reel.x - _dnc.coords.reel.x, 2 ) + Math.pow( _d.coords.reel.y - _dnc.coords.reel.y, 2 ) );
                        if (_dist > 80) {
                            _fs = Math.max(_limTxt + 2, _fs);
                        }
                    } else {
                        _fs = Math.max(_limTxt + 2, _fs);
                    }
                }
                if (_fs > _limTxt) {
                    GexfJS.ctxGraphe.fillStyle = ( ( i != GexfJS.params.activeNode ) && _tagsMisEnValeur.length && ( ( !_d.isTag ) || ( _noeudCentral != -1 ) ) ? "rgba(60,60,60,0.7)" : "rgb(0,0,0)" );
                    GexfJS.ctxGraphe.font = Math.floor( _fs )+"px Arial";
                    GexfJS.ctxGraphe.textAlign = "center";
                    GexfJS.ctxGraphe.textBaseline = "middle";
                    GexfJS.ctxGraphe.fillText(_d.label, _d.coords.reel.x, _d.coords.reel.y);
                }
            }
        }
    }
    
    if (_noeudCentral != -1) {
        GexfJS.ctxGraphe.fillStyle = _dnc.couleur.base;
        GexfJS.ctxGraphe.beginPath();
        GexfJS.ctxGraphe.arc( _dnc.coords.reel.x , _dnc.coords.reel.y , _dnc.coords.reel.r , 0 , Math.PI*2 , true );
        GexfJS.ctxGraphe.closePath();
        GexfJS.ctxGraphe.fill();
        GexfJS.ctxGraphe.stroke();
        var _fs = Math.max(_limTxt + 2, _dnc.coords.reel.r * _coefftxt) + 2;
        GexfJS.ctxGraphe.font = "bold " + Math.floor( _fs )+"px Arial";
        GexfJS.ctxGraphe.textAlign = "center";
        GexfJS.ctxGraphe.textBaseline = "middle";
        GexfJS.ctxGraphe.fillStyle = "rgba(255,255,250,0.8)";
        GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.reel.x - 2, _dnc.coords.reel.y);
        GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.reel.x + 2, _dnc.coords.reel.y);
        GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.reel.x, _dnc.coords.reel.y - 2);
        GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.reel.x, _dnc.coords.reel.y + 2);
        GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
        GexfJS.ctxGraphe.fillText(_dnc.label, _dnc.coords.reel.x, _dnc.coords.reel.y);
    }
    
    GexfJS.ctxMini.putImageData(GexfJS.imageMini, 0, 0);
    var _r = GexfJS.overviewScale / GexfJS.echelleGenerale,
        _x = - _r * GexfJS.decalageX,
        _y = - _r * GexfJS.decalageY,
        _w = _r * GexfJS.zoneGraphe.largeur,
        _h = _r * GexfJS.zoneGraphe.hauteur;
    
    GexfJS.ctxMini.strokeStyle = "rgb(220,0,0)";
    GexfJS.ctxMini.lineWidth = 3;
    GexfJS.ctxMini.fillStyle = "rgba(120,120,120,0.2)";
    GexfJS.ctxMini.beginPath();
    GexfJS.ctxMini.fillRect( _x, _y, _w, _h );
    GexfJS.ctxMini.strokeRect( _x, _y, _w, _h );
}

function hoverAC() {
    $("#autocomplete li").removeClass("hover");
    $("#liac_"+GexfJS.autoCompletePosition).addClass("hover");
    GexfJS.params.activeNode = GexfJS.graph.nodeIndexByLabel.indexOf( $("#liac_"+GexfJS.autoCompletePosition).text().toLowerCase() );
}

function changePosAC(_n) {
    GexfJS.autoCompletePosition = _n;
    hoverAC();
}

function updateAutoComplete(_sender) {
    var _val = $(_sender).val().toLowerCase();
    var _ac = $("#autocomplete");
    if (_val != GexfJS.dernierAC || _ac.html() == "") {
        GexfJS.dernierAC = _val;
        var _chaineAC = "<div><h4>" + strLang("nodes") + "</h4><ul>";
        var _n = 0;
        for (var i in GexfJS.graph.nodeIndexByLabel) {
            var _l = GexfJS.graph.nodeIndexByLabel[i];
            if (_l.search(_val) != -1) {
                _chaineAC += '<li id="liac_' + _n + '" onmouseover="changePosAC(' + _n + ')"><a href="#" onclick="displayNode(\'' + i + '\', true); return false;"><span>' + GexfJS.graph.nodeList[i].label + '</span></a>';
                _n++;
            }
            if (_n >= 20) {
                break;
            }
        }
        GexfJS.autoCompletePosition = 0;
        _ac.html(_chaineAC + "</ul></div>");
    }
    hoverAC();
    _ac.show();
}

function updateButtonStates() {
    $("#lensButton").attr("class",GexfJS.params.useLens?"":"off")
        .attr("title", strLang( GexfJS.params.showEdges ? "lensOff" : "lensOn" ) );

    $("#edgesButton").attr("class",GexfJS.params.showEdges?"":"off")
        .attr("title", strLang( GexfJS.params.showEdges ? "edgeOff" : "edgeOn" ) );
}

$(document).ready(function() {
    
    var lang = ( navigator.language ? navigator.language.substr(0,2).toLowerCase() : ( navigator.userLanguage ? navigator.userLanguage.substr(0,2).toLowerCase() : "en" ) );
    GexfJS.lang = (GexfJS.i18n[lang] ? lang : "en");
    
    if ( !document.createElement('canvas').getContext ) {
        $("#bulle").html('<p><b>' + strLang("browserErr") + '</b></p>');
        return;
    }
    
    updateButtonStates();
    
    GexfJS.ctxGraphe = document.getElementById('carte').getContext('2d');
    GexfJS.ctxMini = document.getElementById('overview').getContext('2d');
    updateSizes();
    
    initializeMap();
    
    $("#searchinput")
        .focus(function() {
            if ( $(this).is('.inputgris') ) {
                $(this).val('').removeClass('inputgris');
            }
        })
        .keyup(function(evt) {
            updateAutoComplete(this);
        }).keydown(function(evt){
            var _l = $("#autocomplete li").length;
            switch (evt.keyCode) {
                case 40 :
                    if (GexfJS.autoCompletePosition < _l - 1) {
                        GexfJS.autoCompletePosition++;
                    } else {
                        GexfJS.autoCompletePosition = 0;
                    }
                break;
                case 38 :
                    if (GexfJS.autoCompletePosition > 0) {
                        GexfJS.autoCompletePosition--;
                    } else {
                        GexfJS.autoCompletePosition = _l - 1;
                    }
                break;
                case 27 :
                    $("#autocomplete").slideUp();
                break;
                case 13 :
                    if ($("#autocomplete").is(":visible")) {
                        var _liac = $("#liac_"+GexfJS.autoCompletePosition);
                        if (_liac.length) {
                            $(this).val(_liac.find("span").text());
                        }
                    }
                break;
                default :
                    GexfJS.autoCompletePosition = 0;
                break;
            }
            updateAutoComplete(this);
            if (evt.keyCode == 38 || evt.keyCode == 40) {
                return false;
            }
        });
    $("#recherche").submit(function() {
        if (GexfJS.graph) {
            displayNode( GexfJS.graph.nodeIndexByLabel.indexOf($("#searchinput").val().toLowerCase()), true);
        }
        return false;
    });
    $("#carte")
        .mousemove(moveGraph)
        .click(clicGraphe)
        .mousedown(startMove)
        .mouseout(function() {
            GexfJS.mousePosition = null;
            endMove();
        })
        .mousewheel(scrollMap);
    $("#overview")
        .mousemove(bougeMini)
        .mousedown(startMove)
        .mouseup(endMove)
        .mouseout(endMove)
        .mousewheel(scrollMap);
    $("#zoomMinusButton").click(function() {
        GexfJS.params.zoomLevel = Math.max( GexfJS.minZoom, GexfJS.params.zoomLevel - 1);
        $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
        return false;
    })
        .attr("title", strLang("zoomOut"));
    $("#zoomPlusButton").click(function() {
        GexfJS.params.zoomLevel = Math.min( GexfJS.maxZoom, GexfJS.params.zoomLevel + 1);
        $("#zoomSlider").slider("value",GexfJS.params.zoomLevel);
        return false;
    })
        .attr("title", strLang("zoomIn"));
    $(document).click(function(evt) {
        $("#autocomplete").slideUp();
    });
    $("#autocomplete").css({
        top: ( $("#searchinput").offset().top + $("#searchinput").outerHeight() ) + "px",
        left: $("#searchinput").offset().left + "px"
    });
    $("#lensButton").click(function () {
        GexfJS.params.useLens = !GexfJS.params.useLens;
        return false;
    });
    $("#edgesButton").click(function () {
        GexfJS.params.showEdges = !GexfJS.params.showEdges;
        return false;
    });
    $("#aUnfold").click(function() {
        var _cG = $("#colonnegauche");
        if (_cG.offset().left < 0) {
            _cG.animate({
                "left" : "0px"
            }, function() {
                $("#aUnfold").attr("class","leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
        } else {
            _cG.animate({
                "left" : "-" + _cG.width() + "px"
            }, function() {
                $("#aUnfold").attr("class","rightarrow");
                $("#zonecentre").css({
                    left: "0"
                });
            });
        }
        return false;
    });
});