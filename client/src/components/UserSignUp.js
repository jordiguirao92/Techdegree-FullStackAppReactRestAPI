import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';


class UserSignUp extends Component{

    state ={
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        errors: []
    };

    //Function to change the state when the value input is changing.
    handleValueChange = (event) =>{
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    //Function to create a new user in the database. It checks that the password and confirmPassword are tha seme. After that whe create a new user in the database. 
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            errors: []
        });
        try{
            if(this.state.password !== this.state.confirmPassword){
                let passwordMatchValidation = <li className="validation-error" key="1000">Password value does not match Password Confirmation value</li>
                this.setState(prevState => ({
                    errors: [...prevState.errors, passwordMatchValidation]}));
            } else {
                let params = {firstName: this.state.firstName, lastName: this.state.lastName, emailAddress: this.state.emailAddress, password: this.state.password};
                let result = await axios.post(`http://localhost:5000/api/users`, params);
                console.log(result);
                await this.props.context.actions.signIn(this.state.emailAddress, this.state.password);
                this.props.history.push(`/`);
                
            }
        } catch(error){
            if(error.response.status === 400){
                if(error.response.data.errors){
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
    }

 render() {
     return(
        <div className="bounds">
        <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            {this.state.errors.length > 0 ? (
                <div>
                    <h2 className="validation--errors--label">Validation errors</h2>
                    <div className="validation-errors">
                        <ul>
                            {this.state.errors}
                        </ul>
                    </div>
                </div>
            ) : (
                    null
                )
            }
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div><input id="firstName" name="firstName" type="text" placeholder="First Name" onChange={this.handleValueChange} autoFocus /></div>
                    <div><input id="lastName" name="lastName" type="text" placeholder="Last Name" onChange={this.handleValueChange}/></div>
                    <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" onChange={this.handleValueChange}/></div>
                    <div><input id="password" name="password" type="password" placeholder="Password" onChange={this.handleValueChange}/></div>
                    <div><input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={this.handleValueChange}/></div>
                    <div className="grid-100 pad-bottom">
                        <button className="button" type="submit">Sign Up</button>
                        <NavLink to='/'><button className="button button-secondary">Cancel</button></NavLink>
                    </div>
                </form>
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <NavLink to='/signin'>Click here</NavLink> to sign in!</p>
        </div>
    </div>


     );
 }

}

export default withRouter(UserSignUp);


/*this.setState(prevState => ({
    errors: [
        ...prevState.errors,
        [ passwordMatchValidation ]
    ]
}));*/