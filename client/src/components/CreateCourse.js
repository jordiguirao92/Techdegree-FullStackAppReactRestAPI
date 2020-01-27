import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';


class CreateCourse extends Component {

    state = {
        title:'',
        description:'',
        estimatedTime:'',
        materialsNeeded:'',
        errors:[] 
    };

    //Function to change the state when the value input is changing.
    handleValueChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    //API request in order to create a new course in the database.
    handleSubmit = async(e) => {
        e.preventDefault();
        try{
            let result = await axios.post('http://localhost:5000/api/courses', 
                {auth: {username: this.props.context.authenticatedUser.emailAddress, password: this.props.context.authenticatedUser.password },
                    data: {title: this.state.title, description: this.state.description, estimatedTime: this.state.estimatedTime, materialsNeeded: this.state.materialsNeeded}});
            this.props.history.push(`/courses/${result.data.id}`);
        } catch(error){
            if(error.response.status === 401) {
                this.props.history.push('/signin');
            }
    
            if(error.response.status === 400){
                let errors = error.response.data.errors;
                let errorMessage = errors.map(
                    (error, index) => (
                        <li key={index}>{error}</li>
                    )
                );
                this.setState({
                    errors: errorMessage
                });
            }
        }
    }

    render() {
        return(
                <div className="bounds course--detail">
                    <h1>Create Course</h1>
                    <div>
                        {this.state.errors.length > 0 ? (
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    <ul>
                                        {this.state.errors}
                                    </ul>
                                </div>
                            </div>
                          )
                        :(null)
                        }
                        <form onSubmit={this.handleSubmit}>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." onChange={this.handleValueChange} value='' autoFocus /></div>
                                    <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName} </p>
                                </div>
                                <div className="course--description">
                                    <div><textarea id="description" name="description" placeholder="Course description..." onChange={this.handleValueChange} value=''></textarea></div>
                                </div>
                            </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" onChange={this.handleValueChange} value=''/></div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." onChange={this.handleValueChange}></textarea></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <button className="button" type="submit">Create Course</button>
                                <NavLink to='/'><button className="button button-secondary">Cancel</button></NavLink> 
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}
export default withRouter(CreateCourse);

//{this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}

