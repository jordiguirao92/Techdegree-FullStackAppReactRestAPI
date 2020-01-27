import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';

class UpdateCourse extends Component {

state = {
    title:'',
    description:'',
    estimatedTime:'',
    materialsNeeded:'',
    errors:[] 
};

async componentDidMount() {
    this.getCourse();
    
}

//Function in order to get the indicated course in the route. After that we set the information of the course to the component state. 
async getCourse() {
    try{
        let result = await axios.get(`http://localhost:5000/api/courses/${this.props.match.params.id}`);
        console.log(result.data);
        this.setState({
            title: result.data.title,
            description: result.data.description,
            estimatedTime: result.data.estimatedTime,
            materialsNeeded:result.data.materialsNeeded,
        });
      } catch (error) {
        console.log('Error fetching and parsing data', error);
        if(error){
            this.props.history.push('/notfound');

        }
      }
}

//Function to change the state when the value input is changing.
handleValueChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
        [name]: value
    });
}

//API request in order to update the course details. 
handleSubmit = async(e) => {
    e.preventDefault();
    try{
        let params = {title: this.state.title, description: this.state.description, estimatedTime: this.state.estimatedTime, materialsNeeded: this.state.materialsNeeded}
        await axios({method: "put", url: `http://localhost:5000/api/courses/${this.props.match.params.id}`, auth: { username: this.props.context.authenticatedUser.emailAddress, password: this.props.context.password}, data: params});
        this.props.history.push(`/courses/${this.props.match.params.id}`);

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

render(){
    return(
        <div className="bounds course--detail">
            <h1>Update Course</h1>
                {this.state.errors.length > 0 ? 
                (
                    <div>
                        <h2 className="validation--errors--label">Validation errors</h2>
                        <div className="validation-errors">
                            <ul>
                                {this.state.errors}
                            </ul>
                        </div>
                    </div>
                ) : 
                (
                 null
                )
                }
            <div>
                <form onSubmit={this.handleSubmit}>
                <div className="grid-66">
                    <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." value={this.state.title} onChange={this.handleValueChange} autoFocus/></div>
                    <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>
                    </div>
                    <div className="course--description">
                    <div><textarea id="description" name="description" placeholder="Course description..." value={this.state.description} onChange={this.handleValueChange}/>
                    </div>
                    </div>
                </div>
                <div className="grid-25 grid-right">
                    <div className="course--stats">
                    <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" className="course--time--input" placeholder="Hours" defaultValue={this.state.estimatedTime} onChange={this.handleValueChange}/></div>
                        </li>
                        <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div><textarea id="materialsNeeded" name="materialsNeeded" placeholder="List materials..." value={this.state.materialsNeeded} onChange={this.handleValueChange}/></div>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit">Update Course</button>
                    <NavLink to={`/courses/${this.props.match.params.id}`}><button className="button button-secondary">Cancel</button></NavLink>
                </div>
                </form>
            </div>
            </div>
    );
}

}

export default withRouter(UpdateCourse);

//data: {title: this.state.title, description: this.state.description, estimatedTime: this.state.estimatedTime, materialsNeeded: this.state.materialsNeeded}

/*let params = {title: this.state.title, description: this.state.description, userId:this.props.context.authenticatedUser.id , estimatedTime: this.state.estimatedTime, materialsNeeded: this.state.materialsNeeded}
        await axios.put(`http://localhost:5000/api/courses/${this.props.match.params.id}`, 
            {auth: {username: this.props.context.authenticatedUser.emailAddress, password: this.props.context.password }, params }); */

/* if(error.response.status === 401) {
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
        } */


