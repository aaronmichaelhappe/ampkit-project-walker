@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
START -> STATEMENT | "\n":?

quote -> ['"]

example -> "this is cool" | "asdf"

string -> [a-zA-Z_\-0-9]:+

word -> string | string word

tag -> [<*?] ([a-zA-Z_-]:+) [>*?] 

inner_path -> ( [a-zA-Z_-]:+ "/" ) | ( string "/" [a-zA-Z_-]:+ | [a-zA-Z_\-/]:+)

path -> quote ("." | "./" | "../"):? inner_path quote 

IMPORT_FILE -> "import" _ path

IMPORT_ALL_FROM -> "import" _ "*" _ "from" _ path 

STATEMENT -> IMPORT_ALL_FROM | string