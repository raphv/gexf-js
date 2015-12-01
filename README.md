# JavaScript GEXF Viewer for Gephi #

#### Released under MIT License ###

### Known Issues

**The issue below is the source of 90% of support emails I receive, please read carefully**

Gexf-JS won't work on chrome if launched from your local drive (with a file:/// URI scheme).
This is a known security limitation, and there are 2 known workarounds:

1. Use Firefox.
2. Use a server (upload it or use a local server). If you have Python on your computer, the simplest is to launch a SimpleHTTPServer with the Command Line:

    $ cd /path/to/gexf-js
    $ python -m SimpleHTTPServer

There used to a third workaround (The --allow-file-access-from-files flag), but it is no longer available on newest Chrome versions since 2014.

### Newest features

Hybrid directed/undirected graphs are now supported, and arrows can be shown.

Gexf-JS now speaks 9 languages: Dutch, English, French, Finnish, German, Greek, Italian, Spanish, and Turkish!

### Contributors

#### Raphaël Velt (main developer, French and English versions)

* http://raphaelve.lt/
* Twitter: [@raphv](http://twitter.com/raphv)

#### Vicenzo Cosenza (Italian translation)

* http://www.vincos.it/
* Twitter: [@vincos](http://twitter.com/vincos)

#### Eduardo Ramos Ibáñez (Spanish translation)

* https://github.com/eduramiba
* Twitter: [@eduramiba](http://twitter.com/eduramiba)

#### Jaakko Salonen (Finnish translation and hyperlink replacement)

* https://github.com/jsalonen
* Twitter: [@jsalonen](http://twitter.com/jsalonen)

#### Zeynep Akata (Turkish translation)

#### Σωτήρης Φραγκίσκος (Greek translation)

#### Martin Eckert (German translation)

#### Tobias Bora (Arrows and hybrid graphs)

* https://github.com/tobiasBora

#### Jan de Mooij (Dutch translation and touch-screen compatibility)

* https://github.com/Ilsontfous

#### Bruna Delzari (Portuguese translation)

#### Adil Aliyev (Azerbaijani translation)
* https://github.com/adilek
* Twitter: [@adilaliyev](http://twitter.com/adilaliyev)

### How to use ?

1. Export your graph from Gephi as a GEXF file
2. Put it in the gexf-js directory
3. Modify config.js to point to your GEXF File and tune the interface.

You can view more Gexf files by pointing your browser to index.html#Filename.gexf

### Compatibility

Gexf-JS uses the canvas element, which might cause compatibility issues with older browsers.

It has been tested with the latest Chrome, Firefox and Internet Explorer versions.

It doesn't work with Internet Explorer 8 or older.

### Contribute as a translator

Gexf JS Viewer is now available in English, French and Italian

If you want to translate the interface in your language (and share this translation with the community), please translate the following sentences, send them to me and I'll upload them to github.

Strings to translate:

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
