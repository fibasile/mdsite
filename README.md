
# MDSite

MDSite is Markdown-based dynamic site generator. 

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