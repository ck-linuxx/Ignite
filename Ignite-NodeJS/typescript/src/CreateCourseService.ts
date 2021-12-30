/*
name - string
durtion - number
educador - string
*/

interface Course{
  name: String;
  duration?: Number;
  educator: String;
}

class CreateCourseService {

  execute({name, duration = 8, educator}: Course){
    console.log(name, duration, educator)
  }
}

export default new CreateCourseService