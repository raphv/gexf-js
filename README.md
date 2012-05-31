# JavaScript GEXF Viewer for Gephi #

#### Released under MIT License ###

### Newest features ##

URLs in attributes can now be replaced by hyperlinks using the replaceUrls option in config.js

Edge weights are now listed. This can be disabled with the showEdgeWeight option in config.js

Gexf-JS now speaks 7 languages: English, French, Italian, Spanish, Finnish, Turkish and Greek !

### Contributors ##

#### Raphaël Velt (main developer, french and english versions)

* http://raphaelve.lt/
* Twitter: [@raphv](http://twitter.com/raphv)

#### Vicenzo Cosenza (italian translation)

* http://www.vincos.it/
* Twitter: [@vincos](http://twitter.com/vincos)

#### Eduardo Ramos Ibáñez (spanish translation)

* https://github.com/eduramiba
* Twitter: [@eduramiba](http://twitter.com/eduramiba)

#### Jaakko Salonen (finnish translation and hyperlink replacement)

* https://github.com/jsalonen
* Twitter: [@jsalonen](http://twitter.com/jsalonen)

#### Zeynep Akata (turkish translation)

#### Σωτήρης Φραγκίσκος (greek translation)

### How to use ? ##

1. Export your graph from Gephi as a GEXF file
2. Put it in the gexf-js directory
3. Modify config.js to point to your GEXF File and tune the interface.

You can view more Gexf files by pointing your browser to index.html#Filename.gexf

### Compatibility ##

Gexf-JS uses the canvas element, which might cause compatibility issues with older browsers.

It has been tested with the latest Chrome, Firefox and Internet Explorer versions.

It doesn't work with Internet Explorer 8 or older.

### Known Issues ##

You may have trouble using the viewer if you launch it from a local drive, as some browsers consider loading files from disk via Ajax to be unsecure.
It usually works with Firefox, but not with Chrome. In Internet Explorer you'll have a security pop-up asking you to "Allow blocked content".

Another solution is uploading it to a server, where it should work correctly.

### Contribute as a translator ##

Gexf JS Viewer is now available in English, French and Italian

If you want to translate the interface in your language (and share this translation with the community), please translate the following sentences, send them to me and I'll upload them to github.

Strings to translate :

1. Search nodes
2. Attributes
3. Nodes
4. Inbound Links from
5. Outbound Links to
6. Undirected links with
7. Activate lens mode
8. Deactivate lens mode
9. Show edges
1. Hide edges
1. Zoom In
1. Zoom Out
1. Your browser cannot properly display this page. We recommend you use the latest Firefox or Chrome version