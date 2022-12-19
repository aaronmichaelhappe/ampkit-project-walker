### Current tasks

// ? add dirPath + contents.dirs.base to dirsUniqueColletion -> Map.set(dirPath+contents.dirs.get('base'))
// ? add dirPath + contents.files to filesUniqueColletion -> Map.set(dirPath+contents.files.get('base'))
// dirLevel = 0
// filesStack[dirLevel].push(contents.get(files))
// dirsStack[dirLevel].push(contents.get(dirs))

// parse file -> dirsPath + contents.file.base
// add returns as children in data.
// children -> if in filesUniqueColletion, grab previous data and add file as children
// else
// filesStack.push(contents.get(returnedFiles))
// dirsStack.push(contents.get(returnedDirs))

// while filesStack.length
// newFile = filesStack[dirLevel].pop()  
// // dirHelper(dirPath, newFile)
// while dirsStack.length
// dirPath = dirPath + dirStack[dirLevel].pop()
// dirLevel = dirLevel + 1;
// dirHelper(dirtPath, defaultBase)
// };

## TODOS

- Is eslint even properly set up? check into this. I rushed it.

# client techniques

- js files based on a map of files or .js ext check
- grab all urls of current file (in panels? elsewhere?)
- grab child links to components (goTos?, panels, popups?)
- go through child components and repeat
- go through models(match to parent, linkable to server) and -->
- grab api/path
- grab child collections/models

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
