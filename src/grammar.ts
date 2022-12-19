// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
export let grammar: any;
(function () {
  function id(x: any[]) { return x[0]; }
  grammar = {
    Lexer: undefined,
    ParserRules: [
      { "name": "START", "symbols": ["STATEMENT"] },
      { "name": "START", "symbols": ["IMPORT_STATEMENT"] },
      { "name": "import$string$1", "symbols": [{ "literal": "i" }, { "literal": "m" }, { "literal": "p" }, { "literal": "o" }, { "literal": "r" }, { "literal": "t" }], "postprocess": function joiner(d: any[]) { return d.join(''); } },
      { "name": "import", "symbols": ["import$string$1"] },
      { "name": "IMPORT_STATEMENT$ebnf$1", "symbols": [/[{]/], "postprocess": id },
      { "name": "IMPORT_STATEMENT$ebnf$1", "symbols": [], "postprocess": function (d: any) { return null; } },
      { "name": "IMPORT_STATEMENT$ebnf$2", "symbols": [] },
      { "name": "IMPORT_STATEMENT$ebnf$2$subexpression$1", "symbols": [/./] },
      { "name": "IMPORT_STATEMENT$ebnf$2", "symbols": ["IMPORT_STATEMENT$ebnf$2", "IMPORT_STATEMENT$ebnf$2$subexpression$1"], "postprocess": function arrpush(d: any[]) { return d[0].concat([d[1]]); } },
      { "name": "IMPORT_STATEMENT$ebnf$3", "symbols": [/[}]/], "postprocess": id },
      { "name": "IMPORT_STATEMENT$ebnf$3", "symbols": [], "postprocess": function (d: any) { return null; } },
      { "name": "IMPORT_STATEMENT$ebnf$4", "symbols": [] },
      { "name": "IMPORT_STATEMENT$ebnf$4$subexpression$1", "symbols": ["ws"] },
      { "name": "IMPORT_STATEMENT$ebnf$4$subexpression$1", "symbols": ["word"] },
      { "name": "IMPORT_STATEMENT$ebnf$4", "symbols": ["IMPORT_STATEMENT$ebnf$4", "IMPORT_STATEMENT$ebnf$4$subexpression$1"], "postprocess": function arrpush(d: any[]) { return d[0].concat([d[1]]); } },
      { "name": "IMPORT_STATEMENT$ebnf$5", "symbols": [] },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$1", "symbols": [{ "literal": " " }], "postprocess": id },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$1", "symbols": [], "postprocess": function (d: any) { return null; } },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$2", "symbols": [] },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$2$subexpression$1", "symbols": [/./] },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$2", "symbols": ["IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$2", "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$2$subexpression$1"], "postprocess": function arrpush(d: any[]) { return d[0].concat([d[1]]); } },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$3", "symbols": [{ "literal": " " }], "postprocess": id },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$3", "symbols": [], "postprocess": function (d: any) { return null; } },
      { "name": "IMPORT_STATEMENT$ebnf$5$subexpression$1", "symbols": [/[\"\']/, "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$1", "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$2", "IMPORT_STATEMENT$ebnf$5$subexpression$1$ebnf$3"] },
      { "name": "IMPORT_STATEMENT$ebnf$5", "symbols": ["IMPORT_STATEMENT$ebnf$5", "IMPORT_STATEMENT$ebnf$5$subexpression$1"], "postprocess": function arrpush(d: any[]) { return d[0].concat([d[1]]); } },
      { "name": "IMPORT_STATEMENT", "symbols": ["import", "ws", "IMPORT_STATEMENT$ebnf$1", "IMPORT_STATEMENT$ebnf$2", "IMPORT_STATEMENT$ebnf$3", "ws", "IMPORT_STATEMENT$ebnf$4", "IMPORT_STATEMENT$ebnf$5"] },
      { "name": "tag$ebnf$1", "symbols": [] },
      { "name": "tag$ebnf$1", "symbols": ["tag$ebnf$1", /[a-zA-Z-_\*]/], "postprocess": function arrpush(d: any[]) { return d[0].concat([d[1]]); } },
      { "name": "tag", "symbols": [{ "literal": "<" }, "tag$ebnf$1", { "literal": ">" }] },
      { "name": "letter", "symbols": [/[a-zA-Z-_\*]/] },
      { "name": "word", "symbols": ["letter"] },
      { "name": "word", "symbols": ["letter", "word"] },
      { "name": "ws", "symbols": [{ "literal": " " }] },
      { "name": "ws", "symbols": [{ "literal": "\n" }] },
      { "name": "ws", "symbols": [{ "literal": "\t" }] },
      { "name": "wss", "symbols": ["ws"] },
      { "name": "wss", "symbols": ["ws", "wss"] },
      { "name": "STATEMENT$subexpression$1", "symbols": ["word"] },
      { "name": "STATEMENT$subexpression$1", "symbols": ["tag"] },
      { "name": "STATEMENT$subexpression$1", "symbols": ["import"] },
      { "name": "STATEMENT$ebnf$1", "symbols": [] },
      { "name": "STATEMENT$ebnf$1$subexpression$1", "symbols": ["ws"] },
      { "name": "STATEMENT$ebnf$1$subexpression$1", "symbols": ["word"] },
      { "name": "STATEMENT$ebnf$1$subexpression$1", "symbols": ["tag"] },
      { "name": "STATEMENT$ebnf$1", "symbols": ["STATEMENT$ebnf$1", "STATEMENT$ebnf$1$subexpression$1"], "postprocess": function arrpush(d: any[]) { return d[0].concat([d[1]]); } },
      { "name": "STATEMENT", "symbols": ["STATEMENT$subexpression$1", "STATEMENT$ebnf$1"] }
    ]
    , ParserStart: "START"
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  }
})();
