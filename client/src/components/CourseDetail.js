import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


class CourseDetail extends Component {

    state = {
        course:{},
        user:{},
    };

    componentDidMount() {
        this.getCourse();
    }

    getCourse = async() => {
        try{
            let result = await axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`);
            console.log(result.data);
            this.setState({
              course: result.data,
              user: result.data.User
            });
          } catch (error) {
            console.log('Error fetching and parsing data', error);
            if(error) {
                this.props.history.push('/notfound');
            }
          }
    }

    deleteCourse = async(e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:5000/api/courses/${this.props.match.params.id}`, 
            {auth: {username: this.props.context.authenticatedUser.emailAddress, password: this.props.context.password}});
        this.props.history.push('/');
    }

    render() {
        return(
           
            
                <div>
                    <div className="actions--bar">
                         <div className="bounds">
                            <div className="grid-100">
                             {this.props.context.authenticatedUser && this.state.course.userId === this.props.context.authenticatedUser.id ?
                             (<span><NavLink className="button" to={`/courses/${this.state.course.id}/update`}>Update Course</NavLink>
                                    <NavLink className="button" to={`/courses/${this.state.course.id}`} onClick={this.deleteCourse}>Delete Course</NavLink></span>) 
                             :
                             (null)}
                            <NavLink className="button button-secondary" to='/'>Return to List</NavLink>
                            </div>
                         </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{this.state.course.title}</h3>
                                <p>By {this.state.user.firstName} {this.state.user.lastName}</p>
                            </div>
                        <div className="course--description">
                                <ReactMarkdown source={this.state.course.description}/>
                        </div>
                    </div>
                        <div className="grid-25 grid-right">
                         <div className="course--stats">
                             <ul className="course--stats--list">
                                <li className="course--stats--list--item">
                                    <h4>Estimated Time</h4>
                                    <h3>{this.state.course.estimatedTime}</h3>
                                </li>
                                <li className="course--stats--list--item">
                                    <h4>Materials Needed</h4>
                                    <ReactMarkdown source={this.state.course.materialsNeeded}/>
                                </li>
                            </ul>
                        </div>
                       </div>
                    </div>
                </div>
            
            
        );
    }
}

export default CourseDetail;



