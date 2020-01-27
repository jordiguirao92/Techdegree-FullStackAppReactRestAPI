import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';


class UserSignIn extends Component{

    state ={
        emailAddress: '',
        password: '', 
        errors:[]
    };

    //Function to change the state when the value input is changing.
    handleValueChange = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return{
                [name]: value
            };
        }); 
    }

    //Function to connect with the signIn function in the Context.js component. 
    handleSubmit = async(e) => {
        e.preventDefault();
        try{
                let result = await this.props.context.actions.signIn(this.state.emailAddress, this.state.password);
                let user = result;
                console.log(user);
                if (user === null) {
                    this.setState(() => {
                      return { errors: [ 'Sign-in was unsuccessful' ] };
                    });
                  }
                  this.props.history.push('/');
        } catch(error){
            console.error(error);
            this.props.history.push('/error');
                
        }
    }

    render() {
        return(
            
            
                <div className="bounds">
                    <div className="grid-33 centered signin">
                        <h1>Sign In</h1>
                        <div>
                            <form onSubmit={this.handleSubmit}>
                                <div><input id="emailAddress" name="emailAddress" type="text" placeholder="Email Address" autoFocus value={this.state.emailAddress} onChange={this.handleValueChange}/></div>
                                <div><input id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleValueChange}/></div>
                                <div className="grid-100 pad-bottom">
                                    <button className="button" type="submit">Sign Up</button>
                                    <NavLink to='/' className="button button-secondary">Cancel</NavLink>
                                </div>
                            </form>
                        </div>
                        <p>&nbsp;</p>
                        <p>Don't have a user account? <NavLink to='/signup'>Click here</NavLink> to sign up!</p>
                    </div>
                </div>
            
            
        );
    }
}

export default withRouter(UserSignIn);