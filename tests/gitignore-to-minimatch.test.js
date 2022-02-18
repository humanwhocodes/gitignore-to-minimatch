/**
 * @fileoverview Tests for the gitignoreToMinimatch class.
 */
/*global describe, it*/

//-----------------------------------------------------------------------------
// Requirements
//-----------------------------------------------------------------------------

import { gitignoreToMinimatch } from "../src/gitignore-to-minimatch.js";
import { expect } from "chai";

//-----------------------------------------------------------------------------
// Tests
//-----------------------------------------------------------------------------

describe("gitignoreToMinimatch", () => {

    const patterns = new Map([
        ["", ""],
        ["*", "**/*"],
        ["/foo", "foo"],
        ["foo", "**/foo/**"],
        ["*.js", "**/*.js"],
        ["foo/bar", "foo/bar/**"],
        ["!foo?", "!**/foo?"],
        ["**/*.js", "**/*.js"],
        ["fixtures", "**/fixtures/**"],
        ["fixtures/", "**/fixtures/**"],
        ["test.js", "**/test.js"]
    ]);

    for (const [gitignorePattern, minimatchPattern] of patterns) {
        
        it(`gitignore pattern ${gitignorePattern} should convert to ${minimatchPattern}`, () => {
            const result = gitignoreToMinimatch(gitignorePattern);
            expect(result).to.equal(minimatchPattern);
        });

    }

    it("should throw an error when a non-string is passed", () => {
        expect(() => {
            gitignoreToMinimatch(45);
        }).throws(/Argument must be a string/);
    });

});
