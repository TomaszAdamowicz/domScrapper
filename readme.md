# DOM SCRAPPER
v.1.0.0

Simple script to scrap HTML DOM content and save it as json file

## Instalation

Add script to HTML you want to scrap

```
<script src="domScrapper.js"></script>
```

Initialize scrapper

```
// Target elements inside which is content you want to scrap

//index.html

<div class="some-repetable-element">
    <span class="name>John</span>
    <span class="second-name">Doe</span>
    <span class="job">President</span>
</div>
<div class="some-repetable-element">
    <span class="name>Jane</span>
    <span class="second-name">Doe</span>
</div>

//app.js
const records = document.querySelectorAll('.some-repetable-element'); //Target repeatable elements, if you want to target only one element, still use querySelectorAll. Scraper uses forEach() to iterate over NodeList.

// Setup scrapper options

const options = [
    {
        type: String,
        selector: '.name',
        property: 'name'
    },
    {
        type: String,
        selector: '.second-name',
        property: 'secondName'
    },
    {
        type: String,
        selector: '.job',
        property: 'job'
    }
]

// Initialize scrapper

const myScrapper = new Scrapper(records, options);

// Scrap data

myScrapper.scrap();

// Save data to JSON file

myScrapper.saveData();

// Scrapper will create and save data.json file like this :

[
    {
        "name": "John",
        "secondName": "Doe",
        "job": "President"
    },
    {
        "name": "Jane",
        "secondName": "Doe"
    }
]

```

## Options

At the moment scrapper can scrap HTML content as a string or array. It can also convert strings into arrays.

Create options object to target HTML DOM elements and declare how the content of this elements should be converted to data.json.

```
// index.html
<div class="some-repetable-element">
    <span class="some-class>Group 1</span>
    <ul>
        <li>John</li>
        <li>Jane</li>
        <li>Jack</li>
    </ul>
    <span class="some-other-class">Bannanas, apples, water, bread</span>
</div>

// app.js

const options = [

    // To scrap string

    {
        type: String, // String or Array
        selector: '.some-class', // css selector
        property: 'group' // Object key
    },

    // To scrap array

    {
        type: Array,
        selector: 'ul li',
        property: 'names'
    },

    To scrap string into array

    {
        type: String,
        selector: '.some-other-class',
        property: 'food',
        createArray: true, // boolean
        divider: ',' // string, divider used to create array
    }
]


// data.json

[
    {
        "group": "Group 1",
        "names": [
            "John",
            "Jane",
            "Jack"
        ],
        "food": [
            "Bannanas",
            "apples",
            "water",
            "bread"
        ]
    }
]

```


## Support

Please [open an issue](https://github.com/TomaszAdamowicz/domScrapper/issues)