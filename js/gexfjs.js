/* Lead developer: Raphaël Velt
 * Other developers: Jakko Salonen, Tobias Bora, Jan de Mooij
 *
 * Licensed under the MIT License
 * Translations by:
 *    Vicenzo Cosenza (Italian)
 *    Eduardo Ramos Ibáñez (Spanish)
 *    Jaakko Salonen (Finnish)
 *    Zeynep Akata (Turkish)
 *    Σωτήρης Φραγκίσκος (Greek)
 *    Martin Eckert (German)
 *    Jan de Mooij (Dutch)
 *    Bruna Delazeri (Brazilian Portuguese)
 *    Adil Aliyev (Azerbaijani)
 * */

(function() {

    var GexfJS = {
        lensRadius: 200,
        lensGamma: 0.5,
        graphZone: {
            width: 0,
            height: 0
        },
        oldGraphZone: {},
        params: {
            centreX: 400,
            centreY: 350,
            activeNode: -1,
            currentNode: -1,
            isMoving: false
        },
        oldParams: {},
        minZoom: -3,
        maxZoom: 10,
        overviewWidth: 200,
        overviewHeight: 175,
        baseWidth: 800,
        baseHeight: 700,
        overviewScale: .25,
        totalScroll: 0,
        autoCompletePosition: 0,
        i18n: {
            "az": {
                "search": "Təpələri axtar",
                "nodeAttr": "Attributlar",
                "nodes": "Təpə nöqtələri",
                "inLinks": "Daxil olan əlaqələr:",
                "outLinks": "Çıxan əlaqələr:",
                "undirLinks": "İstiqamətsiz əlaqələr:",
                "lensOn": "Linza rejiminə keç",
                "lensOff": "Linza rejimindən çıx",
                "edgeOn": "Tilləri göstər",
                "edgeOff": "Tilləri gizlət",
                "zoomIn": "Yaxınlaşdır",
                "zoomOut": "Uzaqlaşdır",
                "modularity_class": "Modullaşma sinfi",
                "degree": "Dərəcə"
            },
            "de": {
                "search": "Suche Knoten",
                "nodeAttr": "Attribute",
                "nodes": "Knoten",
                "inLinks": "Ankommende Verknüpfung von",
                "outLinks": "Ausgehende Verknüpfung zu",
                "undirLinks": "Ungerichtete Verknüpfung mit",
                "lensOn": "Vergrößerungsmodus an",
                "lensOff": "Vergrößerungsmodus aus",
                "edgeOn": "Kanten anzeigen",
                "edgeOff": "Kanten verstecken",
                "zoomIn": "Vergrößern",
                "zoomOut": "Verkleinern",
            },
            "el": {
                "search": "Αναζήτηση Κόμβων",
                "nodeAttr": "Χαρακτηριστικά",
                "nodes": "Κόμβοι",
                "inLinks": "Εισερχόμενοι δεσμοί από",
                "outLinks": "Εξερχόμενοι δεσμοί προς",
                "undirLinks": "Ακατεύθυντοι δεσμοί με",
                "lensOn": "Ενεργοποίηση φακού",
                "lensOff": "Απενεργοποίηση φακού",
                "edgeOn": "Εμφάνιση ακμών",
                "edgeOff": "Απόκρυψη ακμών",
                "zoomIn": "Μεγέθυνση",
                "zoomOut": "Σμίκρυνση",
            },
            "en": {
                "search": "Search nodes",
                "nodeAttr": "Attributes",
                "nodes": "Nodes",
                "inLinks": "Inbound Links from:",
                "outLinks": "Outbound Links to:",
                "undirLinks": "Undirected links with:",
                "lensOn": "Activate lens mode",
                "lensOff": "Deactivate lens mode",
                "edgeOn": "Show edges",
                "edgeOff": "Hide edges",
                "zoomIn": "Zoom In",
                "zoomOut": "Zoom Out",
            },
            "es": {
                "search": "Buscar un nodo",
                "nodeAttr": "Atributos",
                "nodes": "Nodos",
                "inLinks": "Aristas entrantes desde :",
                "outLinks": "Aristas salientes hacia :",
                "undirLinks": "Aristas no dirigidas con :",
                "lensOn": "Activar el modo lupa",
                "lensOff": "Desactivar el modo lupa",
                "edgeOn": "Mostrar aristas",
                "edgeOff": "Ocultar aristas",
                "zoomIn": "Acercar",
                "zoomOut": "Alejar",
                "modularity_class": "Clase de modularidad",
                "degree": "Grado",
                "indegree": "Grado de entrada",
                "outdegree": "Grado de salida",
                "weighted degree": "Grado ponderado",
                "weighted indegree": "Grado de entrada ponderado",
                "weighted outdegree": "Grado de salida ponderado",
                "closnesscentrality": "Cercanía",
                "betweenesscentrality": "Intermediación",
                "authority": "Puntuación de autoridad (HITS)",
                "hub": "Puntuación de hub (HITS)",
                "pageranks": "Puntuación de PageRank"
            },
            "fi": {
                "search": "Etsi solmuja",
                "nodeAttr": "Attribuutit",
                "nodes": "Solmut",
                "inLinks": "Lähtevät yhteydet :",
                "outLinks": "Tulevat yhteydet :",
                "undirLinks": "Yhteydet :",
                "lensOn": "Ota linssitila käyttöön",
                "lensOff": "Poista linssitila käytöstä",
                "edgeOn": "Näytä kaikki yhteydet",
                "edgeOff": "Näytä vain valitun solmun yhteydet",
                "zoomIn": "Suurenna",
                "zoomOut": "Pienennä",
            },
            "fr": {
                "search": "Rechercher un nœud",
                "nodeAttr": "Attributs",
                "nodes": "Nœuds",
                "inLinks": "Liens entrants depuis :",
                "outLinks": "Liens sortants vers :",
                "undirLinks": "Liens non-dirigés avec :",
                "lensOn": "Activer le mode loupe",
                "lensOff": "Désactiver le mode loupe",
                "edgeOn": "Afficher les sommets",
                "edgeOff": "Cacher les sommets",
                "zoomIn": "S'approcher",
                "zoomOut": "S'éloigner",
                "modularity_class": "Classe de modularité",
                "degree": "Degré",
                "indegree": "Demi-degré intérieur",
                "outdegree": "Demi-degré extérieur",
                "weighted degree": "Degré pondéré",
                "weighted indegree": "Demi-degré intérieur pondéré",
                "weighted outdegree": "Demi-degré extérieur pondéré",
                "closnesscentrality": "Centralité de proximité",
                "betweenesscentrality": "Centralité d’intermédiarité",
                "authority": "Score d’autorité (HITS)",
                "hub": "Score de hub (HITS)",
                "pageranks": "Score de PageRank"
            },
            "it": {
                "search": "Cerca i nodi",
                "nodeAttr": "Attributi",
                "nodes": "Nodi",
                "inLinks": "Link in entrata da :",
                "outLinks": "Link in uscita verso :",
                "undirLinks": "Link non direzionati con :",
                "lensOn": "Attiva la lente d’ingrandimento",
                "lensOff": "Disattiva la lente d’ingrandimento",
                "edgeOn": "Mostra gli spigoli",
                "edgeOff": "Nascondi gli spigoli",
                "zoomIn": "Zoom in avanti",
                "zoomOut": "Zoom indietro",
            },
            "tr": {
                "search": "Düğüm ara",
                "nodeAttr": "Özellikler",
                "nodes": "Düğümler",
                "inLinks": "Gelen bağlantılar",
                "outLinks": "Giden bağlantılar",
                "undirLinks": "Yönsüz bağlantılar",
                "lensOn": "Merceği etkinleştir",
                "lensOff": "Merceği etkisizleştir",
                "edgeOn": "Kenar çizgilerini göster",
                "edgeOff": "Kenar çizgilerini gizle",
                "zoomIn": "Yaklaştır",
                "zoomOut": "Uzaklaştır",
            },
            "nl": {
                "search": "Knooppunten doorzoeken",
                "nodeAttr": "Attributen",
                "nodes": "Knooppunten",
                "inLinks": "Binnenkomende verbindingen van :",
                "outLinks": "Uitgaande verbindingen naar :",
                "undirLinks": "Ongerichtte verbindingen met:",
                "lensOn": "Loepmodus activeren",
                "lensOff": "Loepmodus deactiveren",
                "edgeOn": "Kanten tonen",
                "edgeOff": "Kanten verbergen",
                "zoomIn": "Inzoomen",
                "zoomOut": "Uitzoomen",
            },
            "pt": {
                "search": "Pesquisar nós",
                "nodeAttr": "Atributos",
                "nodes": "Nós",
                "inLinks": "Ligações de entrada",
                "outLinks": "Ligações de saída",
                "undirLinks": "Ligações sem direção",
                "lensOn": "Ativar modo lente",
                "lensOff": "Ativar modo lente",
                "edgeOn": "Mostrar arestas",
                "edgeOff": "Esconder arestas",
                "zoomIn": "Aumentar zoom",
                "zoomOut": "Diminuir zoom",
            }
        },
        lang: "en"
    };

    var timedict = {}
    function measureTime(key) {
        if (timedict[key]) {
            console.log(key + " took " + (Date.now() - timedict[key])/1000 + "s");
            delete timedict[key]
        } else {
            timedict[key] = Date.now()
        }
    }

    var movingTO = null;

    function onStartMoving() {
        window.clearTimeout(movingTO);
        GexfJS.params.isMoving = true;
    }

    function onEndMoving() {
        movingTO = window.setTimeout(function () {
            GexfJS.params.isMoving = false;
        }, 200);
    }

    function strLang(_str) {
        var _l = GexfJS.i18n[GexfJS.lang];
        return (_l[_str] ? _l[_str] : (GexfJS.i18n["en"][_str] ? GexfJS.i18n["en"][_str] : _str.replace("_", " ")));
    }

    function replaceURLWithHyperlinks(text) {
        if (GexfJS.params.replaceUrls) {
            var _urlExp = /(\b(?:https?:\/\/)?[-A-Z0-9]+\.[-A-Z0-9.:]+(?:\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)?)/ig,
                _protocolExp = /^https?:\/\//i,
                _res = text.split(_urlExp);
            return _res.map(function (_txt) {
                if (_txt.match(_urlExp)) {
                    return $('<a>').attr({
                        href: (_protocolExp.test(_txt) ? '' : 'http://') + _txt,
                        target: "_blank"
                    }).text(_txt.replace(_protocolExp, ''));
                } else {
                    return $('<span>').text(_txt);
                }
            });
        }
        return $("<span>").text(text);
    }

    function displayNode(_nodeIndex, _recentre) {
        GexfJS.params.currentNode = _nodeIndex;
        if (_nodeIndex != -1) {
            var _d = GexfJS.graph.nodeList[_nodeIndex],
                _html = $('<div>'),
                _ul = $('<ul>'),
                _cG = $("#leftcolumn");
            _cG.animate({
                "left": "0px"
            }, function () {
                $("#aUnfold").attr("class", "leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
            $('<h3>')
                .append($('<div>').addClass('largepill').css('background', _d.B))
                .append($('<span>').text(_d.l))
                .appendTo(_html);
            $('<h4>').text(strLang("nodeAttr")).appendTo(_html);
            _ul.appendTo(_html);
            if (GexfJS.params.showId) {
                var _li = $("<li>");
                $("<b>").text("id: ").appendTo(_li);
                $("<span>").text(_d.id).appendTo(_li);
                _li.appendTo(_ul);
            }
            for (var i = 0, l = _d.a.length; i < l; i++) {
                var attr = _d.a[i];
                var _li = $("<li>");
                var attrkey = GexfJS.graph.attributes[attr[0]];
                $("<b>").text(strLang(attrkey) + ": ").appendTo(_li);
                if (attrkey === 'image') {
                    $('<br>').appendTo(_li);
                    $('<img>').attr("src", attr[1]).appendTo(_li).addClass("attrimg");
                } else {
                    _li.append(replaceURLWithHyperlinks(attr[1]));
                }
                _li.appendTo(_ul);
            }
            var _str_in = [],
                _str_out = [],
                _str_undir = [];
            GexfJS.graph.edgeList.forEach(function (_e) {
                if (_e.t == _nodeIndex) {
                    var _n = GexfJS.graph.nodeList[_e.s];
                    var _li = $("<li>");
                    $("<div>").addClass("smallpill").css("background", _n.B).appendTo(_li);
                    $("<a>")
                        .text(_n.l)
                        .attr("href", "#")
                        .mouseover(function () {
                            GexfJS.params.activeNode = _e.s;
                        })
                        .click(function () {
                            displayNode(_e.s, true);
                            return false;
                        })
                        .appendTo(_li);
                    if (GexfJS.params.showEdgeLabel) {
                        $('<span>').text(" – " + _e.l).appendTo(_li);
                    }
                    if (GexfJS.params.showEdgeWeight) {
                        $('<span>').text(" (" + _e.w + ")").appendTo(_li);
                    }
                    if (_e.d) {
                        _str_in.push(_li);
                    } else {
                        _str_undir.push(_li);
                    }
                }
                if (_e.s == _nodeIndex) {
                    var _n = GexfJS.graph.nodeList[_e.t];
                    var _li = $("<li>");
                    $("<div>").addClass("smallpill").css("background", _n.B).appendTo(_li);
                    $("<a>")
                        .text(_n.l)
                        .attr("href", "#")
                        .mouseover(function () {
                            GexfJS.params.activeNode = _e.t;
                        })
                        .click(function () {
                            displayNode(_e.t, true);
                            return false;
                        })
                        .appendTo(_li);
                    if (GexfJS.params.showEdgeLabel) {
                        $('<span>').text(" – " + _e.l).appendTo(_li);
                    }
                    if (GexfJS.params.showEdgeWeight) {
                        $('<span>').text(" (" + _e.w + ")").appendTo(_li);
                    }
                    if (_e.d) {
                        _str_out.push(_li);
                    } else {
                        _str_undir.push(_li);
                    }
                }
            });
            if (_str_in.length) {
                $('<h4>').text(strLang("inLinks")).appendTo(_html);
                $('<ul>').html(_str_in).appendTo(_html);
            }
            if (_str_out.length) {
                $('<h4>').text(strLang("outLinks")).appendTo(_html);
                $('<ul>').html(_str_out).appendTo(_html);
            }
            if (_str_undir.length) {
                $('<h4>').text(strLang("undirLinks")).appendTo(_html);
                $('<ul>').html(_str_undir).appendTo(_html);
            }
            $("#leftcontent").html(_html);
            if (_recentre) {
                GexfJS.params.centreX = _d.x;
                GexfJS.params.centreY = _d.y;
            }
            $("#searchinput")
                .val(_d.l)
                .removeClass('grey');
        }
    }

    function updateWorkspaceBounds() {

        var _elZC = $("#zonecentre");
        var _top = {
            top: $("#titlebar").height() + "px"
        };
        _elZC.css(_top);

        $("#leftcolumn").css(_top);
        GexfJS.graphZone.width = _elZC.width();
        GexfJS.graphZone.height = _elZC.height();
        GexfJS.areParamsIdentical = true;

        for (var i in GexfJS.graphZone) {
            GexfJS.areParamsIdentical = GexfJS.areParamsIdentical && (GexfJS.graphZone[i] == GexfJS.oldGraphZone[i]);
        }
        if (!GexfJS.areParamsIdentical) {

            $("#carte")
                .attr({
                    width: GexfJS.graphZone.width,
                    height: GexfJS.graphZone.height
                })
                .css({
                    width: GexfJS.graphZone.width + "px",
                    height: GexfJS.graphZone.height + "px"
                });
            for (var i in GexfJS.graphZone) {
                GexfJS.oldGraphZone[i] = GexfJS.graphZone[i];
            }
        }
    }

    function onTouchStart(evt) {

        var coords = evt.originalEvent.targetTouches[0];
        if (evt.originalEvent.targetTouches.length == 1) {
            GexfJS.lastMouse = {
                x: coords.pageX,
                y: coords.pageY
            }
            GexfJS.dragOn = true;
            GexfJS.mouseHasMoved = false;
        } else {
            GexfJS.lastPinch = getPinchDistance(evt);
            GexfJS.pinchOn = true;
        }
        onStartMoving();

    }

    function startMove(evt) {
        evt.preventDefault();
        GexfJS.dragOn = true;
        GexfJS.lastMouse = {
            x: evt.pageX,
            y: evt.pageY
        };
        GexfJS.mouseHasMoved = false;
        onStartMoving();
    }

    function onTouchEnd(evt) {
        GexfJS.dragOn = false;
        GexfJS.pinchOn = false;
        GexfJS.mouseHasMoved = false;
        onEndMoving();
    }

    function endMove(evt) {
        document.body.style.cursor = "default";
        GexfJS.dragOn = false;
        GexfJS.mouseHasMoved = false;
        onEndMoving();
    }

    function onGraphClick(evt) {
        if (!GexfJS.mouseHasMoved && !GexfJS.pinchOn) {
            displayNode(GexfJS.params.activeNode);
        }
        endMove();
    }

    function changeGraphPosition(evt, echelle) {
        document.body.style.cursor = "move";
        var _coord = {
            x: evt.pageX,
            y: evt.pageY
        };
        GexfJS.params.centreX += (GexfJS.lastMouse.x - _coord.x) / echelle;
        GexfJS.params.centreY += (GexfJS.lastMouse.y - _coord.y) / echelle;
        GexfJS.lastMouse = _coord;
    }

    function onGraphMove(evt) {
        evt.preventDefault();
        if (!GexfJS.graph) {
            return;
        }
        GexfJS.mousePosition = {
            x: evt.pageX - $(this).offset().left,
            y: evt.pageY - $(this).offset().top
        };
        if (GexfJS.dragOn) {
            changeGraphPosition(evt, GexfJS.globalScale);
            GexfJS.mouseHasMoved = true;
        } else {
            GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
            document.body.style.cursor = (GexfJS.params.activeNode != -1 ? "pointer" : "default");
        }
    }

    function onGraphDrag(evt) {
        evt.preventDefault();
        if (!GexfJS.graph) {
            return;
        }
        if (evt.originalEvent.targetTouches.length == 1) {
            var coords = evt.originalEvent.targetTouches[0];
            GexfJS.mousePosition = {
                x: coords.pageX - $(this).offset().left,
                y: coords.pageY - $(this).offset().top
            };
            if (GexfJS.dragOn) {
                evt.pageX = coords.pageX;
                evt.pageY = coords.pageY;
                changeGraphPosition(evt, GexfJS.globalScale);
                GexfJS.mouseHasMoved = true;
            } else {
                GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
            }
        } else {

            evt.pageX = evt.originalEvent.targetTouches[0].pageX +
                (
                    (
                        evt.originalEvent.targetTouches[1].pageX -
                        evt.originalEvent.targetTouches[0].pageX
                    ) / 2
                );
            evt.pageY = evt.originalEvent.targetTouches[0].pageY +
                (
                    (
                        evt.originalEvent.targetTouches[1].pageY -
                        evt.originalEvent.targetTouches[0].pageY
                    ) / 2
                );

            var currentPinch = getPinchDistance(evt);

            var delta = currentPinch - GexfJS.lastPinch;
            if (Math.abs(delta) >= 20) {
                GexfJS.lastPinch = currentPinch;
                onGraphScroll(evt, delta);
            } else {
                GexfJS.totalScroll = 0;
            }
        }
    }

    function getPinchDistance(evt) {
        return Math.sqrt(
            Math.pow(
                evt.originalEvent.targetTouches[0].pageX -
                evt.originalEvent.targetTouches[1].pageX, 2) +
            Math.pow(
                evt.originalEvent.targetTouches[0].pageY -
                evt.originalEvent.targetTouches[1].pageY, 2
            )
        );
    }

    function onOverviewMove(evt) {
        if (GexfJS.dragOn) {
            changeGraphPosition(evt, -GexfJS.overviewScale);
        }
    }

    function onOverviewDrag(evt) {
        var coords = evt.originalEvent.targetTouches[0];
        evt.pageX = coords.pageX;
        evt.pageY = coords.pageY;
        if (GexfJS.dragOn) {
            changeGraphPosition(evt, -GexfJS.overviewScale);
        }
    }

    function onGraphScroll(evt, delta) {
        GexfJS.totalScroll += delta;
        if (Math.abs(GexfJS.totalScroll) >= 1) {
            if (GexfJS.totalScroll < 0) {
                if (GexfJS.params.zoomLevel > GexfJS.minZoom) {
                    GexfJS.params.zoomLevel--;
                    var _el = (typeof ($(this).offset()) == 'object') ? $(this) : $('#carte'),
                        _off = _el.offset(),
                        _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                        _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                    GexfJS.params.centreX -= (Math.SQRT2 - 1) * _deltaX / GexfJS.globalScale;
                    GexfJS.params.centreY -= (Math.SQRT2 - 1) * _deltaY / GexfJS.globalScale;
                    $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
                }
            } else {
                if (GexfJS.params.zoomLevel < GexfJS.maxZoom) {
                    GexfJS.params.zoomLevel++;
                    GexfJS.globalScale = Math.pow(Math.SQRT2, GexfJS.params.zoomLevel);
                    var _el = (typeof ($(this).offset()) == 'object') ? $(this) : $('#carte'),
                        _off = _el.offset(),
                        _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                        _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                    GexfJS.params.centreX += (Math.SQRT2 - 1) * _deltaX / GexfJS.globalScale;
                    GexfJS.params.centreY += (Math.SQRT2 - 1) * _deltaY / GexfJS.globalScale;
                    $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
                }
            }
            GexfJS.totalScroll = 0;
            onStartMoving();
            onEndMoving();
        }
    }

    function initializeMap() {
        clearInterval(GexfJS.timeRefresh);
        GexfJS.oldParams = {};
        GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
        $("#zoomSlider").slider({
            orientation: "vertical",
            value: GexfJS.params.zoomLevel,
            min: GexfJS.minZoom,
            max: GexfJS.maxZoom,
            range: "min",
            step: 1,
            slide: function (event, ui) {
                GexfJS.params.zoomLevel = ui.value;
                onStartMoving();
                onEndMoving();
            }
        });
        $("#overviewzone").css({
            width: GexfJS.overviewWidth + "px",
            height: GexfJS.overviewHeight + "px"
        });
        $("#overview").attr({
            width: GexfJS.overviewWidth,
            height: GexfJS.overviewHeight
        });
        GexfJS.timeRefresh = setInterval(traceMap, 60);
        GexfJS.graph = null;
        loadGraph();
    }

    function loadGraph() {

        var url = (document.location.hash.length > 1 ? document.location.hash.substr(1) : GexfJS.params.graphFile);
        var isJson = (function (t) { return t[t.length - 1]; })(url.split('.')) === 'json';

        console.log("Loading " + url + " in " + (isJson ? "json" : "gexf") + " mode");
        measureTime("Loading graph from network");

        $.ajax({
            url: url,
            dataType: (isJson ? "json" : "xml"),
            success: function (data) {
                measureTime("Loading graph from network");
                measureTime("Pre-processing graph");
                if (isJson) {
                    GexfJS.graph = data;
                    GexfJS.graph.indexOfLabels = GexfJS.graph.nodeList.map(function (_d) {
                        return _d.l.toLowerCase();
                    });

                } else {
                    var _g = $(data).find("graph"),
                        _nodes = _g.children().filter("nodes").children(),
                        _edges = _g.children().filter("edges").children();
                    GexfJS.graph = {
                        directed: (_g.attr("defaultedgetype") == "directed"),
                        nodeList: [],
                        indexOfLabels: [],
                        edgeList: [],
                        attributes: {},
                    };
                    var _xmin = 1e9, _xmax = -1e9, _ymin = 1e9, _ymax = -1e9; _marge = 30;
                    $(_nodes).each(function () {
                        var _n = $(this),
                            _pos = _n.find("viz\\:position,position"),
                            _x = _pos.attr("x"),
                            _y = _pos.attr("y");
                        _xmin = Math.min(_x, _xmin);
                        _xmax = Math.max(_x, _xmax);
                        _ymin = Math.min(_y, _ymin);
                        _ymax = Math.max(_y, _ymax);
                    });

                    var _scale = Math.min((GexfJS.baseWidth - _marge) / (_xmax - _xmin), (GexfJS.baseHeight - _marge) / (_ymax - _ymin));
                    var _deltax = (GexfJS.baseWidth - _scale * (_xmin + _xmax)) / 2;
                    var _deltay = (GexfJS.baseHeight - _scale * (_ymin + _ymax)) / 2;
                    var nodeIndexById = [];

                    $(_nodes).each(function () {
                        var _n = $(this),
                            _id = _n.attr("id"),
                            _label = _n.attr("label") || _id,
                            _pos = _n.find("viz\\:position,position"),
                            _d = {
                                id: _id,
                                l: _label,
                                x: _deltax + _scale * _pos.attr("x"),
                                y: _deltay - _scale * _pos.attr("y"),
                                r: _scale * _n.find("viz\\:size,size").attr("value"),
                            },
                            _col = _n.find("viz\\:color,color"),
                            _r = _col.attr("r"),
                            _g = _col.attr("g"),
                            _b = _col.attr("b"),
                            _attr = _n.find("attvalue");
                        _d.rgb = [_r, _g, _b];
                        _d.B = "rgba(" + _r + "," + _g + "," + _b + ",.7)";
                        _d.G = "rgba(" + Math.floor(84 + .33 * _r) + "," + Math.floor(84 + .33 * _g) + "," + Math.floor(84 + .33 * _b) + ",.5)";
                        _d.a = [];
                        $(_attr).each(function () {
                            var _a = $(this),
                                _for = _a.attr("for");
                            _d.a.push([
                                _for ? _for : 'attribute_' + _a.attr("id"),
                                _a.attr("value")
                            ]);
                            GexfJS.graph.attributes[_for] = _for;
                        });
                        if (GexfJS.params.sortNodeAttributes) {
                            _d.a.sort(function (a, b) {
                                return (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
                            });
                        }
                        GexfJS.graph.nodeList.push(_d);
                        nodeIndexById.push(_d.id);
                        GexfJS.graph.indexOfLabels.push(_d.l.toLowerCase());
                    });

                    $(_edges).each(function () {
                        var _e = $(this),
                            _sid = _e.attr("source"),
                            _six = nodeIndexById.indexOf(_sid),
                            _tid = _e.attr("target"),
                            _tix = nodeIndexById.indexOf(_tid),
                            _w = _e.find('attvalue[for="weight"]').attr('value') || _e.attr('weight'),
                            _col = _e.find("viz\\:color,color"),
                            _directed = GexfJS.graph.directed;
                        if (_e.attr("type") == "directed") {
                            _directed = true;
                        }
                        if (_e.attr("type") == "undirected") {
                            _directed = false;
                        }
                        if (_col.length) {
                            var _r = _col.attr("r"),
                                _g = _col.attr("g"),
                                _b = _col.attr("b");
                        } else {
                            var _scol = GexfJS.graph.nodeList[_six].rgb;
                            if (_directed) {
                                var _r = _scol[0],
                                    _g = _scol[1],
                                    _b = _scol[2];
                            } else {
                                var _tcol = GexfJS.graph.nodeList[_tix].rgb,
                                    _r = Math.floor(.5 * _scol[0] + .5 * _tcol[0]),
                                    _g = Math.floor(.5 * _scol[1] + .5 * _tcol[1]),
                                    _b = Math.floor(.5 * _scol[2] + .5 * _tcol[2]);
                            }
                        }
                        GexfJS.graph.edgeList.push({
                            s: _six,
                            t: _tix,
                            W: Math.max(GexfJS.params.minEdgeWidth, Math.min(GexfJS.params.maxEdgeWidth, (_w || 1))) * _scale,
                            w: parseFloat(_w || 0),
                            C: "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                            l: _e.attr("label") || "",
                            d: _directed
                        });
                    });
                }
                measureTime("Pre-processing graph");

                GexfJS.ctxMini.clearRect(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);

                GexfJS.graph.nodeList.forEach(function (_d) {
                    GexfJS.ctxMini.fillStyle = _d.B;
                    GexfJS.ctxMini.beginPath();
                    GexfJS.ctxMini.arc(_d.x * GexfJS.overviewScale, _d.y * GexfJS.overviewScale, _d.r * GexfJS.overviewScale + 1, 0, Math.PI * 2, true);
                    GexfJS.ctxMini.closePath();
                    GexfJS.ctxMini.fill();
                });

                GexfJS.imageMini = GexfJS.ctxMini.getImageData(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);
                
            }
        });
    }

    function getNodeFromPos(_coords) {
        for (var i = GexfJS.graph.nodeList.length - 1; i >= 0; i--) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame) {
                var _c = _d.actual_coords;
                _r = Math.sqrt(Math.pow(_c.x - _coords.x, 2) + Math.pow(_c.y - _coords.y, 2));
                if (_r < _c.r) {
                    return i;
                }
            }
        }
        return -1;
    }

    function calcCoord(x, y, coord) {
        var _r = Math.sqrt(Math.pow(coord.x - x, 2) + Math.pow(coord.y - y, 2));
        if (_r < GexfJS.lensRadius) {
            var _cos = (coord.x - x) / _r;
            var _sin = (coord.y - y) / _r;
            var _newr = GexfJS.lensRadius * Math.pow(_r / GexfJS.lensRadius, GexfJS.lensGamma);
            var _coeff = (GexfJS.lensGamma * Math.pow((_r + 1) / GexfJS.lensRadius, GexfJS.lensGamma - 1));
            return {
                "x": x + _newr * _cos,
                "y": y + _newr * _sin,
                "r": _coeff * coord.r
            };
        }
        else {
            return coord;
        }
    }

    function findAngle(sx, sy, ex, ey) {
        var tmp = Math.atan((ey - sy) / (ex - sx));
        if (ex - sx >= 0) {
            return tmp
        } else {
            return tmp + Math.PI
        }
    }

    function drawArrowhead(ctx, locx, locy, angle, sizex, sizey) {
        var tmp = ctx.lineWidth;
        var hx = sizex / 2;
        var hy = sizey / 2;
        ctx.translate((locx), (locy));
        ctx.rotate(angle);
        ctx.translate(-hx, -hy);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1 * sizey);
        ctx.lineTo(1 * sizex, 1 * hy);
        ctx.closePath();
        ctx.fillStyle = "#424242";
        ctx.fill();
        ctx.stroke();
        ctx.translate(hx, hy);
        ctx.rotate(-angle);
        ctx.translate(-locx, -locy);
        ctx.lineWidth = tmp;
    }

    function traceArc(ctx, source, target, arrow_size, draw_arrow) {
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        if (GexfJS.params.curvedEdges) {
            var x2, y2, x3, y3, x4, y4, x5, y5;
            x2 = source.x;
            y2 = source.y;
            if ((source.x == target.x) && (source.y == target.y)) {
                x3 = source.x + 2.8 * source.r;
                y3 = source.y - source.r;
                x4 = source.x;
                y4 = source.y + 2.8 * source.r;
                x5 = source.x + 1;
                y5 = source.y;
            } else {
                x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
                y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
                x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
                y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
                x5 = target.x;
                y5 = target.y;
            }
            ctx.bezierCurveTo(x3, y3, x4, y4, x5, y5);
            ctx.stroke();
            if (draw_arrow) {
                // Find the middle of the bezierCurve
                var tmp = Math.pow(0.5, 3)
                var x_middle = tmp * (x2 + 3 * x3 + 3 * x4 + x5)
                var y_middle = tmp * (y2 + 3 * y3 + 3 * y4 + y5)
                // Find the angle of the bezierCurve at the middle point
                var tmp = Math.pow(0.5, 2)
                var x_prime_middle = 3 * tmp * (- x2 - x3 + x4 + x5)
                var y_prime_middle = 3 * tmp * (- y2 - y3 + y4 + y5)
                drawArrowhead(ctx, x_middle, y_middle, findAngle(0, 0, x_prime_middle, y_prime_middle), arrow_size, arrow_size);
            }
        } else {
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
            if (draw_arrow) {
                drawArrowhead(ctx, (source.x + target.x) / 2, (source.y + target.y) / 2, findAngle(source.x, source.y, target.x, target.y), GexfJS.overviewScale * arrow_size, GexfJS.overviewScale * arrow_size);
                ctx.stroke();
            }
        }
    }

    function traceMap() {
        updateWorkspaceBounds();
        if (!GexfJS.graph) {
            return;
        }
        var _identical = GexfJS.areParamsIdentical;
        GexfJS.params.mousePosition = (GexfJS.params.useLens ? (GexfJS.mousePosition ? (GexfJS.mousePosition.x + "," + GexfJS.mousePosition.y) : "out") : null);
        for (var i in GexfJS.params) {
            _identical = _identical && (GexfJS.params[i] == GexfJS.oldParams[i]);
        }
        if (_identical) {
            return;
        }
        for (var i in GexfJS.params) {
            GexfJS.oldParams[i] = GexfJS.params[i];
        }

        GexfJS.globalScale = Math.pow(Math.SQRT2, GexfJS.params.zoomLevel);
        GexfJS.decalageX = (GexfJS.graphZone.width / 2) - (GexfJS.params.centreX * GexfJS.globalScale);
        GexfJS.decalageY = (GexfJS.graphZone.height / 2) - (GexfJS.params.centreY * GexfJS.globalScale);

        var _sizeFactor = GexfJS.globalScale * Math.pow(GexfJS.globalScale, -.15),
            _edgeSizeFactor = _sizeFactor * GexfJS.params.edgeWidthFactor,
            _nodeSizeFactor = _sizeFactor * GexfJS.params.nodeSizeFactor,
            _textSizeFactor = 1;

        GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);

        if (GexfJS.params.useLens && GexfJS.mousePosition) {
            GexfJS.ctxGraphe.fillStyle = "rgba(220,220,250,0.4)";
            GexfJS.ctxGraphe.beginPath();
            GexfJS.ctxGraphe.arc(GexfJS.mousePosition.x, GexfJS.mousePosition.y, GexfJS.lensRadius, 0, Math.PI * 2, true);
            GexfJS.ctxGraphe.closePath();
            GexfJS.ctxGraphe.fill();
        }

        var _centralNode = ((GexfJS.params.activeNode != -1) ? GexfJS.params.activeNode : GexfJS.params.currentNode);

        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            _d.actual_coords = {
                x: GexfJS.globalScale * _d.x + GexfJS.decalageX,
                y: GexfJS.globalScale * _d.y + GexfJS.decalageY,
                r: _nodeSizeFactor * _d.r
            };
            _d.withinFrame = ((_d.actual_coords.x + _d.actual_coords.r > 0) && (_d.actual_coords.x - _d.actual_coords.r < GexfJS.graphZone.width) && (_d.actual_coords.y + _d.actual_coords.r > 0) && (_d.actual_coords.y - _d.actual_coords.r < GexfJS.graphZone.height));
            _d.visible = (GexfJS.params.currentNode == -1 || i == _centralNode || GexfJS.params.showEdges);
        }

        var _tagsMisEnValeur = [];

        if (_centralNode != -1) {
            _tagsMisEnValeur = [_centralNode];
        }

        if (!GexfJS.params.isMoving && (GexfJS.params.showEdges || _centralNode != -1)) {

            var _showAllEdges = (GexfJS.params.showEdges && GexfJS.params.currentNode == -1);

            for (var i in GexfJS.graph.edgeList) {
                var _d = GexfJS.graph.edgeList[i],
                    _six = _d.s,
                    _tix = _d.t,
                    _ds = GexfJS.graph.nodeList[_six],
                    _dt = GexfJS.graph.nodeList[_tix];
                var _isLinked = false;
                if (_centralNode != -1) {
                    if (_six == _centralNode) {
                        _tagsMisEnValeur.push(_tix);
                        _coulTag = _dt.B;
                        _isLinked = true;
                        _dt.visible = true;
                    }
                    if (_tix == _centralNode) {
                        _tagsMisEnValeur.push(_six);
                        _coulTag = _ds.B;
                        _isLinked = true;
                        _ds.visible = true;
                    }
                }

                if ((_isLinked || _showAllEdges) && (_ds.withinFrame || _dt.withinFrame) && _ds.visible && _dt.visible) {
                    GexfJS.ctxGraphe.lineWidth = _edgeSizeFactor * _d.W;
                    var _coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _ds.actual_coords) : _ds.actual_coords);
                    _coordt = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _dt.actual_coords) : _dt.actual_coords);
                    GexfJS.ctxGraphe.strokeStyle = (_isLinked ? _d.C : "rgba(100,100,100,0.2)");
                    traceArc(GexfJS.ctxGraphe, _coords, _coordt, _sizeFactor * 3.5, GexfJS.params.showEdgeArrow && _d.d);
                }
            }

        }

        GexfJS.ctxGraphe.lineWidth = 4;
        GexfJS.ctxGraphe.strokeStyle = "rgba(0,100,0,0.8)";

        if (_centralNode != -1) {
            var _dnc = GexfJS.graph.nodeList[_centralNode];
            _dnc.real_coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _dnc.actual_coords) : _dnc.actual_coords);
        }

        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame) {
                if (i != _centralNode) {
                    _d.real_coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _d.actual_coords) : _d.actual_coords);
                    _d.isTag = (_tagsMisEnValeur.indexOf(parseInt(i)) != -1);
                    GexfJS.ctxGraphe.beginPath();
                    GexfJS.ctxGraphe.fillStyle = ((_tagsMisEnValeur.length && !_d.isTag) ? _d.G : _d.B);
                    GexfJS.ctxGraphe.arc(_d.real_coords.x, _d.real_coords.y, _d.real_coords.r, 0, Math.PI * 2, true);
                    GexfJS.ctxGraphe.closePath();
                    GexfJS.ctxGraphe.fill();
                }
            }
        }

        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame) {
                if (i != _centralNode) {
                    var _fs = _d.real_coords.r * _textSizeFactor;
                    if (_d.isTag) {
                        if (_centralNode != -1) {
                            var _dist = Math.sqrt(Math.pow(_d.real_coords.x - _dnc.real_coords.x, 2) + Math.pow(_d.real_coords.y - _dnc.real_coords.y, 2));
                            if (_dist > 80) {
                                _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _fs);
                            }
                        } else {
                            _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _fs);
                        }
                    }
                    if (_fs > GexfJS.params.textDisplayThreshold) {
                        GexfJS.ctxGraphe.fillStyle = ((i != GexfJS.params.activeNode) && _tagsMisEnValeur.length && ((!_d.isTag) || (_centralNode != -1)) ? "rgba(60,60,60,0.7)" : "rgb(0,0,0)");
                        GexfJS.ctxGraphe.font = Math.floor(_fs) + "px Arial";
                        GexfJS.ctxGraphe.textAlign = "center";
                        GexfJS.ctxGraphe.textBaseline = "middle";
                        GexfJS.ctxGraphe.fillText(_d.l, _d.real_coords.x, _d.real_coords.y);
                    }
                }
            }
        }

        if (_centralNode != -1) {
            GexfJS.ctxGraphe.fillStyle = _dnc.B;
            GexfJS.ctxGraphe.beginPath();
            GexfJS.ctxGraphe.arc(_dnc.real_coords.x, _dnc.real_coords.y, _dnc.real_coords.r, 0, Math.PI * 2, true);
            GexfJS.ctxGraphe.closePath();
            GexfJS.ctxGraphe.fill();
            GexfJS.ctxGraphe.stroke();
            var _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _dnc.real_coords.r * _textSizeFactor) + 2;
            GexfJS.ctxGraphe.font = "bold " + Math.floor(_fs) + "px Arial";
            GexfJS.ctxGraphe.textAlign = "center";
            GexfJS.ctxGraphe.textBaseline = "middle";
            GexfJS.ctxGraphe.fillStyle = "rgba(255,255,250,0.8)";
            GexfJS.ctxGraphe.fillText(_dnc.l, _dnc.real_coords.x - 2, _dnc.real_coords.y);
            GexfJS.ctxGraphe.fillText(_dnc.l, _dnc.real_coords.x + 2, _dnc.real_coords.y);
            GexfJS.ctxGraphe.fillText(_dnc.l, _dnc.real_coords.x, _dnc.real_coords.y - 2);
            GexfJS.ctxGraphe.fillText(_dnc.l, _dnc.real_coords.x, _dnc.real_coords.y + 2);
            GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
            GexfJS.ctxGraphe.fillText(_dnc.l, _dnc.real_coords.x, _dnc.real_coords.y);
        }

        GexfJS.ctxMini.putImageData(GexfJS.imageMini, 0, 0);
        var _r = GexfJS.overviewScale / GexfJS.globalScale,
            _x = - _r * GexfJS.decalageX,
            _y = - _r * GexfJS.decalageY,
            _w = _r * GexfJS.graphZone.width,
            _h = _r * GexfJS.graphZone.height;

        GexfJS.ctxMini.strokeStyle = "rgb(220,0,0)";
        GexfJS.ctxMini.lineWidth = 3;
        GexfJS.ctxMini.fillStyle = "rgba(120,120,120,0.2)";
        GexfJS.ctxMini.beginPath();
        GexfJS.ctxMini.fillRect(_x, _y, _w, _h);
        GexfJS.ctxMini.strokeRect(_x, _y, _w, _h);
    }

    function hoverAC() {
        $("#autocomplete li").removeClass("hover");
        $("#liac_" + GexfJS.autoCompletePosition).addClass("hover");
        GexfJS.params.activeNode = GexfJS.graph.indexOfLabels.indexOf($("#liac_" + GexfJS.autoCompletePosition).text().toLowerCase());
    }

    function changePosAC(_n) {
        GexfJS.autoCompletePosition = _n;
        hoverAC();
    }

    function updateAutoComplete(_sender) {
        var _val = $(_sender).val().toLowerCase();
        var _ac = $("#autocomplete");
        var _acContent = $('<ul>');
        if (_val != GexfJS.lastAC || _ac.html() == "") {
            GexfJS.lastAC = _val;
            var _n = 0;
            GexfJS.graph.indexOfLabels.forEach(function (_l, i) {
                if (_n < 30 && _l.search(_val) != -1) {
                    var closure_n = _n;
                    $('<li>')
                        .attr("id", "liac_" + _n)
                        .append($('<a>')
                            .mouseover(function () {
                                changePosAC(closure_n);
                            })
                            .click(function () {
                                displayNode(i, true);
                                return false;
                            })
                            .text(GexfJS.graph.nodeList[i].l)
                        )
                        .appendTo(_acContent);
                    _n++;
                }
            });
            GexfJS.autoCompletePosition = 0;
            _ac.html(
                $('<div>').append(
                    $('<h4>').text(strLang("nodes"))
                ).append(_acContent)
            );
        }
        hoverAC();
        _ac.show();
    }

    function updateButtonStates() {
        $("#lensButton").attr("class", GexfJS.params.useLens ? "" : "off")
            .attr("title", strLang(GexfJS.params.showEdges ? "lensOff" : "lensOn"));

        $("#edgesButton").attr("class", GexfJS.params.showEdges ? "" : "off")
            .attr("title", strLang(GexfJS.params.showEdges ? "edgeOff" : "edgeOn"));
    }

    GexfJS.setParams = function setParams(paramlist) {
        for (var i in paramlist) {
            GexfJS.params[i] = paramlist[i];
        }
    }

    $(document).ready(function () {

        var lang = (
            typeof GexfJS.params.language != "undefined" && GexfJS.params.language
                ? GexfJS.params.language
                : (
                    navigator.language
                        ? navigator.language.substr(0, 2).toLowerCase()
                        : (
                            navigator.userLanguage
                                ? navigator.userLanguage.substr(0, 2).toLowerCase()
                                : "en"
                        )
                )
        );
        GexfJS.lang = (GexfJS.i18n[lang] ? lang : "en");

        updateButtonStates();

        GexfJS.ctxGraphe = document.getElementById('carte').getContext('2d');
        GexfJS.ctxMini = document.getElementById('overview').getContext('2d');
        updateWorkspaceBounds();

        initializeMap();

        window.onhashchange = initializeMap;

        $("#searchinput")
            .focus(function () {
                if ($(this).is('.grey')) {
                    $(this).val('').removeClass('grey');
                }
            })
            .keyup(function (evt) {
                updateAutoComplete(this);
            }).keydown(function (evt) {
                var _l = $("#autocomplete li").length;
                switch (evt.keyCode) {
                    case 40:
                        if (GexfJS.autoCompletePosition < _l - 1) {
                            GexfJS.autoCompletePosition++;
                        } else {
                            GexfJS.autoCompletePosition = 0;
                        }
                        break;
                    case 38:
                        if (GexfJS.autoCompletePosition > 0) {
                            GexfJS.autoCompletePosition--;
                        } else {
                            GexfJS.autoCompletePosition = _l - 1;
                        }
                        break;
                    case 27:
                        $("#autocomplete").slideUp();
                        break;
                    case 13:
                        if ($("#autocomplete").is(":visible")) {
                            var _liac = $("#liac_" + GexfJS.autoCompletePosition);
                            if (_liac.length) {
                                $(this).val(_liac.text());
                            }
                        }
                        break;
                    default:
                        GexfJS.autoCompletePosition = 0;
                        break;
                }
                updateAutoComplete(this);
                if (evt.keyCode == 38 || evt.keyCode == 40) {
                    return false;
                }
            });
        $("#recherche").submit(function () {
            if (GexfJS.graph) {
                displayNode(GexfJS.graph.indexOfLabels.indexOf($("#searchinput").val().toLowerCase()), true);
            }
            return false;
        });
        $("#carte")
            .mousemove(onGraphMove)
            .bind('touchmove', onGraphDrag)
            .click(onGraphClick)
            .bind('touchend', onGraphClick)
            .mousedown(startMove)
            .bind('touchstart', onTouchStart)
            .mouseout(function () {
                GexfJS.mousePosition = null;
                endMove();
            })
            .bind('touchend', function () {
                GexfJS.mousePosition = null;
                onTouchEnd();
            })
            .mousewheel(onGraphScroll);
        $("#overview")
            .mousemove(onOverviewMove)
            .bind('touchmove', onOverviewDrag)
            .mousedown(startMove)
            .bind('touchstart', onTouchStart)
            .mouseup(endMove)
            .bind('touchend', onTouchEnd)
            .mouseout(endMove)
            .mousewheel(onGraphScroll);
        $("#zoomMinusButton").click(function () {
            GexfJS.params.zoomLevel = Math.max(GexfJS.minZoom, GexfJS.params.zoomLevel - 1);
            $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
            return false;
        })
            .attr("title", strLang("zoomOut"));
        $("#zoomPlusButton").click(function () {
            GexfJS.params.zoomLevel = Math.min(GexfJS.maxZoom, GexfJS.params.zoomLevel + 1);
            $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
            return false;
        })
            .attr("title", strLang("zoomIn"));
        $(document).click(function (evt) {
            $("#autocomplete").slideUp();
        });
        $("#autocomplete").css({
            top: ($("#searchinput").offset().top + $("#searchinput").outerHeight()) + "px",
            left: $("#searchinput").offset().left + "px"
        });
        if (GexfJS.params.useLens === null) {
            $("#lensButton").hide();
        }
        if (GexfJS.params.showEdges === null) {
            $("#edgesButton").hide();
        }
        $("#lensButton").click(function () {
            GexfJS.params.useLens = !GexfJS.params.useLens;
            updateButtonStates();
            return false;
        });
        $("#edgesButton").click(function () {
            GexfJS.params.showEdges = !GexfJS.params.showEdges;
            updateButtonStates();
            return false;
        });
        $("#aUnfold").click(function () {
            var _cG = $("#leftcolumn");
            if (_cG.offset().left < 0) {
                _cG.animate({
                    "left": "0px"
                }, function () {
                    $("#aUnfold").attr("class", "leftarrow");
                    $("#zonecentre").css({
                        left: _cG.width() + "px"
                    });
                });
            } else {
                _cG.animate({
                    "left": "-" + _cG.width() + "px"
                }, function () {
                    $("#aUnfold").attr("class", "rightarrow");
                    $("#zonecentre").css({
                        left: "0"
                    });
                });
            }
            return false;
        });
    });

    GexfJS.benchmark = function (iteration_count) {
        iteration_count = iteration_count || 10;
        measureTime(iteration_count + " iterations of traceMap()");
        for (var i = 0; i < iteration_count; i++) {
            GexfJS.params.benchmark_iteration = i;
            traceMap();
        }
        measureTime(iteration_count + " iterations of traceMap()");
    }

    console.log("Type 'GexfJS.benchmark()' to test how quickly the graph is drawn!");

    window.GexfJS = GexfJS;

    window.setParams = function (params) {
        console.warn('DEPRECATION WARNING: Please use "GexfJS.setParams" instead of "setParams" in config.js');
        GexfJS.setParams(params);
    }

})();