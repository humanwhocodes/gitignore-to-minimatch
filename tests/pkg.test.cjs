/**
 * @fileoverview Tests that Common JS can access npm package.
 */

const { gitignoreToMinimatch } = require("../dist/gitignore-to-minimatch.cjs");
gitignoreToMinimatch("*");
console.log("CommonJS load: success");
