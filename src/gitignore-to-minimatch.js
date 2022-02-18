/**
 * @fileoverview Utility to convert gitignore patterns to minimatch.
 * @author Nicholas C. Zakas
 */

/**
 * Converts a gitignore pattern to a minimatch pattern.
 * @param {string} pattern The gitignore pattern to convert. 
 * @returns {string} A minimatch pattern equivalent to `pattern`.
 */
export function gitignoreToMinimatch(pattern) {

    if (typeof pattern !== "string") {
        throw new TypeError("Argument must be a string.");
    }

    // Special case: Empty string
    if (!pattern) {
        return pattern;
    }

    // strip off negation to make life easier
    const not = pattern.startsWith("!");
    const patternToTest = not ? pattern.slice(1) : pattern;
    let result = patternToTest;

    // For the most part, the first character determines what to do
    switch (patternToTest[0]) {
        case "/":
            result = patternToTest.slice(1);
            break;

        case "*":
            if (patternToTest[1] !== "*") {
                result = "**/" + patternToTest;
            }
            break;

        default:
            if (!result.includes("/") || result.endsWith("/")) {
                result = "**/" + patternToTest;
            }

            // no further changes if the pattern ends with a wildcard
            if (patternToTest.endsWith("*") || patternToTest.endsWith("?")) {
                break;
            }

            // differentiate between filenames and directory names
            if (!/\.[a-z\d_-]+$/.test(patternToTest)) {
                if (!patternToTest.endsWith("/")) {
                    result += "/";
                }

                result += "**";
            }
    }

    return not ? "!" + result : result;

}
