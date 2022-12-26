### Current tasks

// TODO: come up with better plan/understanding of when to use Map, Set, arrays, objects. && test different scenarios for Map, Set, etc. or performance 

// if client, parse (.js ext, match model/server relationships.) -> get imported files, add to stack. pop from stack. repeat.

// if server. go through all files. forEach -> parse. match to client to get data needed. fetch data. 
indexes = [
  'home', 'about', 'animals'
];

coonst models = ['Dogs', 'Cats']
const CatsModel = {
  id: '123123',
}

const animalsClient = {
  url: 'animals/',
  components: [
    //
    component: {
      name: 'DogsComp',
      // construct custom url. -> 'animals/DogsComp'
      relatedPages: [{name: 'humans', url: 'humans/'}, {name: 'vet', url: 'humans/vet'}],
      model: {
        // coutom url. -> 'model/dogsModel'
        name: 'DogsModel',
        table: 'dogs',
        data: {
          id: '',
        }
        relatedId: '123123',
        relatedModel: new Map('CatsModel' CatsModel) // an actual reference
        relatedTable: 'Cats',
        relatedModel: 'CatsModel'
      }
    }
  ]
}

# client techniques

SECTIONS:  jsModule (has top level imports etc) -> (sub section of jsModule) -> class/classComponent, css(sub section), html(subSection).

- first parse grabs "words" which can be used for tokens. can put into sections -> jsFile, class/classComponent, css, html.
-- second parse separate into functions/methods. and if/while etc statements. maybe further into assignements expressions (refresh on definitions and particularities of these. )
- grab all imports. seperate out what I need. ignore rest. 
- construct links from routers/tabs and goTos and Panels etc. 
- grab all model properties being used to see what is *actually* being used from models. 
cats -> propeties, links, models, importedChildren, componentChildren, imported jsOther.

* home -> cats -> dogs -> vets
* | 
* about -> contact

// client links map
* cats -> dogs -> vets
* | 
* friendlyCats -> friendlyDogs -> vets

// client to models map
* cats -> dogs -> vets
* | 
* Cats -> Dogs
* |
* SmallCats

// Models Map etc. 

# server techniques

// get files
// // // part 1
// // // grab file.
// // // grab table.
// // // find JOINS
// // // grab root
// // // grab name.
// // // grab related

// // // part 2
// // // grab tab keys from an index I have (find way to generate these too at some point)

// // // part 3.
// // // grab data returned at an api end point
// // // match data to a table so I know which table it came from.

# temp v6

// set up server. maybe have my own server files that mimic kevins to experiment with SQL
// and to grab data for the tool kit (set up sql connection to catalog_live)
