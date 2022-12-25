import { serve, file } from "bun";


import * as nodeFs from "node:fs/promises";
import "../toolkit/index"

serve({
  fetch(req: Request) {
    return new Response(file("./public/index.html"));
  },
  port: 3000,
});

