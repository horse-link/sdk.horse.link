const fs = require("fs");

fs.writeFileSync(
  "./dist/esm/package.json",
  JSON.stringify({
    type: "module"
  }),
  {
    encoding: "utf-8"
  }
);

fs.writeFileSync(
  "./dist/cjs/package.json",
  JSON.stringify({
    type: "commonjs"
  }),
  {
    encoding: "utf-8"
  }
);
