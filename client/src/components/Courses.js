import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import CourseModule from './CourseModule';



class Courses extends Component{

state={
    courses:[]
}

componentDidMount(){
    this.coursesSearch();
  }


coursesSearch = async() => {
  try{
    let result = await axios.get('http://localhost:5000/api/courses');
    let coursesList = result.data; 
    this.setState({
      courses: coursesList
    });
    console.log(this.state.courses);
    
  } catch (error) {
    console.log('Error fetching and parsing data', error)
  }

}

render(){

    let coursesList = this.state.courses.map(course => (
        <CourseModule id={course.id} key={course.id} title={course.title} />
    ));

    return(
    <div className="bounds">
        {coursesList}
        <div className="grid-33">
         <NavLink to='/courses/create' className="course--module course--add--module" >
            <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>New Course
            </h3>
          </NavLink>
        </div>
    </div>

    )
 }

}

export default Courses;
