"use strict";
exports.__esModule = true;
var ts = require("typescript");
var glob_1 = require("glob");
var dist_1 = require("./dist");
// import * as fs from 'fs'
var CJS_CONFIG = {
    module: ts.ModuleKind.CommonJS,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    noEmitOnError: false,
    noUnusedLocals: true,
    noUnusedParameters: true,
    stripInternal: true,
    target: ts.ScriptTarget.ES5
};
function compile(input, options) {
    if (options === void 0) { options = CJS_CONFIG; }
    console.log('starting compling');
    var files = glob_1.sync(input);
    // console.log('transpiling', ts.transpileModule(fs.readFileSync(files[0], {encoding:'utf8'}), {
    //     compilerOptions: options,
    //     reportDiagnostics: true,
    //     files[0]
    // }))
    return null;
    var compilerHost = ts.createCompilerHost(options);
    var program = ts.createProgram(files, options, compilerHost);
    var msgs = {};
    //@ts-ignore
    var emitResult = program.emit(undefined, undefined, undefined, undefined, {
        before: [
            dist_1.transform()
        ]
    });
    var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    allDiagnostics.forEach(function (diagnostic) {
        var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
        var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
    });
    console.log('done compilng', emitResult.emittedFiles);
    return msgs;
}
exports["default"] = compile;
