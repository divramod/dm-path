// =========== [ REQUIRE ] ===========
var co = require("co");
var path = require("path");
var dmPrompt = require("dm-prompt").Inquirer;
var untildify = require('untildify')
require("shelljs/global");

// =========== [ MODULE DEFINE ] ===========
var job = {};

// =========== [ job.replace ] ===========
job.replace = function(path) {
    path = path.replace("~", env["HOME"]);
    return path;
}; // job.replace

// =========== [ job.current ] ===========
job.current = function() {
    return process.cwd();
}; // job.current

// =========== [ job.global ] ===========
job.global = function() {
    return path.join(path.dirname(require.main.filename), "..");
}; // job.global

// =========== [ job.home ] ===========
job.home = function() {
    return env["HOME"];
}; // job.global

// =========== [ job.inputOne ] ===========
job.inputOne = co.wrap(function*() {
    var inputOnePathAnswer =
        yield dmPrompt({
            type: "inputOne",
            name: "inputOnePath",
            message: "Please enter the path:"
        });
    var inputOnePath = untildify(inputOnePathAnswer.inputOnePath);

    return yield Promise.resolve(inputOnePath);
}); // job.inputOne

// =========== [ job.inputMany ] ===========
// TODO
job.inputMany = co.wrap(function*() {
    return yield Promise.resolve();
}); // job.inputMany

// =========== [ MODULE EXPORT ] ===========
module.exports = job;
