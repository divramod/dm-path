// =========== [ REQUIRE ] ===========
var co = require("co");
var path = require("path");
var dmPrompt = require("dm-prompt").Inquirer;
var untildify = require('untildify')
require("shelljs/global");

var tasks = {};

// =========== [ tasks.replace ] ===========
tasks.replace = function(path) {
    path = path.replace("~", env["HOME"]);
    return path;
}; // tasks.replace

// =========== [ tasks.current ] ===========
tasks.current = function() {
    return process.cwd();
}; // tasks.current

// =========== [ tasks.global ] ===========
tasks.global = function() {
    return path.join(path.dirname(require.main.filename), "..");
}; // tasks.global

// =========== [ tasks.home ] ===========
tasks.home = function() {
    return env["HOME"];
}; // tasks.global

// =========== [ tasks.inputOne ] ===========
tasks.inputOne = co.wrap(function*() {
    var inputOnePathAnswer =
        yield dmPrompt({
            type: "inputOne",
            name: "inputOnePath",
            message: "Please enter the path:"
        });
    var inputOnePath = untildify(inputOnePathAnswer.inputOnePath);

    return yield Promise.resolve(inputOnePath);
}); // tasks.inputOne

// =========== [ tasks.inputMany ] ===========
tasks.inputMany = co.wrap(function*() {
    return yield Promise.resolve();
}); // tasks.inputMany


// example
tasks.test = require("./tasks/test/index.js").start;

// automatically add tasks here

module.exports = tasks;
