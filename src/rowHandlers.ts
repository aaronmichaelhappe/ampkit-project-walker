// TODO: every method should be optimized. RN I am going the simple route to get something to work.
// very likely all methods will all be re thought.

// TODO:
// might need this
// interface Handlers {
//   makeMethods: <T, Tdata>(self: Rows, data: Tdata) => {};
// }

const handleImports = (match: any) => {
  const makeSetsOfFileFilters = () => {
    const urlExtSet = new Set();
    const urlBaseSet = new Set();

    urlExtSet.add("css");
    urlExtSet.add("svg");
    urlExtSet.add("less");

    urlBaseSet.add("bui");

    return {
      urlExtSet,
      urlBaseSet,
    };
  };
  const fileFilters = makeSetsOfFileFilters();
  const extractPath = (fileFilters: any, path: String) => {
    let extractedPath = "";
    let letters = "";
    let go = true;
    let i = 0;
    // need to inc the i before every break;
    // need to inc the i before exiting the while;
    while (go) {
      letters = path[i] === "/" || path[i] === "." ? "" : letters + path[i];
      // console.log(letters);
      if (fileFilters.urlBaseSet.has(letters)) {
        i = i + 1;
        break;
      }
      if (fileFilters.urlExtSet.has(letters)) {
        i = i + 1;
        break;
      }
      if (i === path.length - 1) {
        extractedPath = extractedPath + path;
        go = false;
      }
      i = i + 1;
    }
    return extractedPath;
  };
  return extractPath(fileFilters, match);
};
// import handlersClient
// const methods = makeMethods()
//
// methods[0].method(row, data)
export const handlersClient = {
  // TODO: documentation for this
  makeMethods: () => {
    return [
      {
        name: "root",
        method: (row: string, data: any) => {
          if (data.name && data.path && data.table) {
            return "completedParseExit";
          }

          let re = /import\s?['"](.*)['"]/;
          let match = row.match(re);

          // for server
          // let re = /class[\s]?(.*)[\s]?extends/;
          // let match = row.match(re);
          //   let data: CbHandleData = { name: "name", data: null };

          if (match !== null) {
            const formatted = handleImports(match[1].trim());
            data.path = formatted;
            return data;
          }

          re = /customElements\.define\(['"].*['"],/;
          match = row.match(re);

          if (match !== null) {
            data.name = match[0].trim();
            return data;
          }

          re = /[c]-[a-zA-Z\-]+/;
          match = row.match(re);
          if (match !== null) {
            data.component = match[0];
            return data;
          }
          return null;
        },
      },
    ];
  },
};
