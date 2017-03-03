$(document).ready(function () {

    var md = {};

    var dataFolder = "data/";

    // the div containing the menu
    var $menu = $('#menu');
    // main content area
    var $content = $('#content');
    // loading indicator
    var $loading = $('#loading');
    // not found page TODO: move to a template
    var $notfound = $('#notfound');
    // current page slug
    var currentSlug = null;
    // flag to check for the first page and set is as default
    var firstPage = true;
    // template to use if no template is specified, set null to get raw markdown with no template
    var defaultTemplate = "page";
    // default page for /
    var defaultPage = null;
    // loaded pages idx
    var loadedPages = {};


    /**
     * Generate a slug from the title
     */
    var slugify = function (text) {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    };

    /**
     * Get the slug from the current url if any
     */
    var extractSlug = function () {
        if (window.location.hash) {
            // Fragment exists
            return window.location.hash.replace(/#/, '');
        } else {
            // Fragment doesn't exist
            return null;
        }

    };

    /**
     * Register for any hash change, to do navigation
     */
    $(window).on('hashchange', function () {
        showCurrentPage();
    });


    /**
     * Add social links to the page TODO move to template
     */
    var showSocialLinks = function () {
        if (md.github) {
            $menu.append('<a id="github" href="' + md.github + '" class="menu-item button button-clear"><i class="fa fa-github fa-2x"></i></a>');
        }
        if (md.twitter) {
            $menu.append('<a id="twitter" href="' + md.twitter + '" class="menu-item button button-clear"><i class="fa fa-twitter fa-2x"></i></a>');
        }
        $menu.append('<button id="hamburger" class="button button-clear"><i class="fa fa-bars fa-2x"></i></button>');
    };


    /**
     * Hide all pages and show the current one, based on the slug - window hash
     */
    var showCurrentPage = function () {
        var targetSlug = extractSlug() || currentSlug;
        if (!loadedPages[targetSlug]) {
            $.each(md.pages, function (idx, p) {
                if (p.slug == targetSlug) {
                    fetchPage(p, function (err) {
                        loadedPages[targetSlug] = true;
                        showCurrentPage();
                    })
                }
            })
        } else {

            var targets = $('.page[id="' + targetSlug + '"]');
            $('.page').hide();
            if (targets.length > 0) {
                targets.show();
            } else {
                $notfound.show();
            }

        }

    };

    /**
     * Load a template from the server, parsing it with Handlebars
     * - template: the template file name minus the .hbs extension in the _data/templates/ folder 
     */
    var loadTemplate = function (template, cb) {
        $.ajax({
            url: './' + dataFolder + '/templates/' + template + '.hbs',
            error: function (err) {
                cb(err);
            },
            success: function (src) {
                //console.log(src);
                cb(null, Handlebars.compile(src));
            }
        });

    };

    /**
     * Build a page
     * - data: the contents of the .md file loaded
     * - item: the menu entry from index.json
     * - cb: callback(err)
     */
    var processPage = function (data, item, cb) {
        //console.log(item);
        if (item.draft) return cb();

        var results = jsyaml.loadFront(data);
        //console.log(results);
        var html = marked(results.__content);
        var title = item.title || results.title;
        var slug = slugify(title || 'untitled');
        var ctx = results;
        ctx.title = title;
        ctx.slug = slug;
        ctx.firstPage = firstPage;
        ctx.item = item;
        ctx.content = html;
        ctx.global = md;



        var template = item.layout || ctx.layout || defaultTemplate;
        if (template) {
            loadTemplate(template, function (err, t) {
                //console.log(t);
                var hbs = t(ctx);
                var div = $('<div>').attr("id", slug).addClass("page").html(hbs);
                div.css("display", "none");
                $content.append(div);
                cb(null);
            });
        } else {
            var div = $("<div>").attr("id", slug).addClass("page").html(html);
            div.css("display", "none");
            $content.append(div);
            cb(null);
        }

    };


    /**
     * Load a .md file from the server
     */
    var fetchPage = function (item, cb) {
        $('#loading').show();
        $.ajax({
            url: './' + dataFolder + '/pages/' + item.page + '.md',
            error: function (err) {
                cb(err);
                $('#loading').hide();
            },
            success: function (data) {
                processPage(data, item, function (err) {
                    cb(err);
                    $('#loading').hide();
                });
            }
        });
    };



    var indexPage = function (item, cb) {

        var title = item.title;
        var slug = slugify(title || 'untitled');

        item.slug = slug;
        if (firstPage) {
            defaultPage = slug;
            currentSlug = slug;
            firstPage = false;
        }
        $menu.append("<a class='menu-item button button-clear' href='#" + slug + "'>" + item.title + "</a> ");
        cb();
    }

    /** 
     * Load pages from the server
     * TODO load on demand
     */
    var loadPages = function () {

        md.pages = md.pages || [];
        async.eachSeries(md.pages, function (item, cb) {
            indexPage(item, cb);
        }, function (err) {
            if (err) {
                //console.log('An error occurred loading: ' + err.responseURL);
                console.log(err.statusText);
            } else {
                // loading ok;
                $('#loading').hide();
                showSocialLinks();
                showCurrentPage();
            }
        });

    };


    /**
     * Parse index.json and load pages
     * - data: index.json parsed dictionary
     */
    var loadIndex = function (data, cb) {
        if (!data) return cb("Error");
        $('#loading').show();

        md = data;
        var title = md.title || "No title";
        var description = md.description || "";
        $('#title').html(title);
        //        $('#title').append("<br><small>" + description + "</small>");
        $('#title').click(function (ev) {
            window.location.href = "./#" + defaultPage;
        });
        $('title').html(title);


        loadPages();
    };


    // main loop, start loading index.json

    $.getJSON('./' + dataFolder + 'index.json', function (data) {
        loadIndex(data, function (err) {
            if (err) {
                alert('cannot load data');
            }
        });

    });


});