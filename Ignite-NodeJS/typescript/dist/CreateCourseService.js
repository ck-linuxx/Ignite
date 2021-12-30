"use strict";
/*
name - string
durtion - number
educador - string
*/
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ name, duration = 8, educator }) {
        console.log(name, duration, educator);
    }
}
exports.default = new CreateCourseService;
