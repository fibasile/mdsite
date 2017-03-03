---
title: MDSite
layout: home
---

# MDSite

MDSite is Markdown-based dynamic site generator. In some ways it is similar to other static sites generators such as Jekyll, with a major
difference: while Jekyll requires sites to be "compiled" before publishing, MDSite works entirely in the browser, where the Markdown
content are rendered to HTML and templates processed with Handlebars.

## Why another static site generator?

The main idea is to use Github as a content management platform, directly editing Markdown pages in the browser, without needing any
additional processing. I got tired of Jekyll dependencies and like the idea of putting together a single-page site in few minutes.

## What is it good for?

MDSite is perfect for quick documentation, a project website or a personal blog. It isn't meant as a full featured website or blogging platform, but as a tiny layer leveraging existing Github markdown editing capabilities for superfast publishing.


## Installation

For installing MDSite you need a recent version of Node.js and NPM.

    git clone ...
    cd mdsite
    npm install
    
## Getting started

MDSite follows a convention over configuration approach. 

The site is ready to use, just edit the contents of the _data folder.

<table>
    <tr>
        <td>**index.html**</td>
        <td>this is the main layout for the whole site</td>
    </tr>
    <tr>
        <td>**index.json**</td>
        <td>contains an index of your content and some information about the site and you</td>
    </tr>
    <tr>
        <td>**_data**</td>
        <td>this folder contains the site content in markdown format and templates in handlebars format</td>
    </tr>
    <tr>
        <td>**_data/pages/index.md**</td>
        <td>this is the default homepage, you can change it in index.json</td>
    </tr>
    <tr>
        <td nowrap>**_data/templates/home.hbs**</td>
        <td>this is the default template for the homepage</td>
    </tr>
</table>

## Publishing your site

Edit the contents and upload everything inside the mdsite folder to your webserver like any static site.

If you don't have a webserver you can use the free service at [Github Pages](https://pages.github.com/),
forking the mdsite repository and editing the site directly in Github.

Remember to enable the publishing on your repository as explained [here](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/).


## index.json

This file is the index of your site, and you need to define there all the content you want to load.

The synthax is very simple, as the following default index.json shows:

    {
        "title": "mdsite",
        "description": "markdown powered dynamic site generator",
        "twitter": "http://twitter.com/fibasile",
        "github": "http://github.com/fibasile",
        "pages": [
            {
                "title": "Home",
                "page": "index"
            },
            {
                "title": "About me",
                "page": "about"
            },
            {
                "title": "Blog",
                "page": "blog"
            }
        ],
        "posts": [



        ]
    }


## Writing content

MDSite supports two different content types:

 - **pages**: which are considered static content, and are ordered as they appear in index.json
 - **posts**: the dynamic content, ordered by the date field defined in the front-matter
 
Both content types must be registered in index.json, and should contain an optional **front-matter**,
followed by markdown content. The following example shows a basic page containing both.

    ---
    title: This is an examaple
    description: An awesome description for this example
    ---
    This is the markdown text
    
    **Bold**, __italics__
    - bullets

In the front matter you can add as many fields as you like, each one will be available in the **template** choosen by the 
optional **layout** parameter.

The main difference between **post** and **page** is that posts are ordered by date, so the markdown file must contain an 
appropriate **date** field in the format YYYY-MM-DD, as per the following example:

    ---
    date: 2017-02-28
    title: This is an examaple post
    description: An awesome description for this example
    layout: post
    ---
    This is the markdown text
    
    **Bold**, __italics__
    - bullets

## Templates

You can associate an Handlebar template to every page or post, specifying a **layout** parameter.

For example, if you set layout to 'page', MDSite will look for a page.hbs file into the _data/templates/ folder.

The content of templates can be pure HTML or include Handlebar tags. For example writing:

    <h1>{{title}}</h1>
    
will produce an header with the page title. Handlebars supports simple logic, so you can also iterate or make conditionals:

    {{#if global.github}}<a href="{{global.github}}" class="button button-outline">Github</a>{{/if}}

This code contained in the about.hbs templates shows how you can optionally show some content only if defined in the front matter.

For both pages and posts MDSite provides several pre-defined variables you can use in your templates:

<table>
   <thead>
       <tr>
           <th>variable</th>
           <th>description</th>
       </tr>
   </thead>
    <tr>
        <td>title</td>
        <td>The title defined in index.json or the title property from the front-matter</td>
    </tr>
    <tr>
        <td>description</td>
        <td>The description defined in the front-matter</td>
    </tr>
    <tr>
        <td>slug</td>
        <td>The slug computed from the title, also used for navigation links</td>
    </tr>
    <tr>
        <td>content</td>
        <td>the markdown content converted in html</td>
    </tr>
    <tr>
        <td>item</td>
        <td>current page or post entry in index.json</td>
    </tr>
    <tr>
        <td>global</td>
        <td>the parsed index.json dictionary, iterate on global.pages, global.posts, or access other config variables</td>    
    </tr>
</table>

## Limitations

Since loading json and markdown isn't allowed for the file:// urn, the only current drawback is the need of a webserver for loading the pages, even when working locally on your computer. For development you can start one in python typing:

    cd mdsite
    python -m 'SimpleHTTPServer'

in the mdsite folder. Another good alternative is the module static-server for Node.js.

    npm install -g static-server
    cd mdsite
    static-server -p 8000 .

Point your browser at http://localhost:8000 to preview the site.

## License

Copyright (c) 2017 Fiore Basile

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.