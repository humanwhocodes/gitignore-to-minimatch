export default [
    {
        input: "src/gitignore-to-minimatch.js",
        output: [
            {
                file: "dist/gitignore-to-minimatch.cjs",
                format: "cjs"
            },
            {
                file: "dist/gitignore-to-minimatch.js",
                format: "esm"
            }
        ]
    }    
];
