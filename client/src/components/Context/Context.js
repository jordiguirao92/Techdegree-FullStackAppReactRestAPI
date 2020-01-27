import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Context = React.createContext(); 

export class Provider extends Component {

  
  state = {
    authenticatedUser: null, //Cookies.getJSON('authUser') || null
    password: ''
  };

  signIn = async (username, password) => {
    const result = await axios.get('http://localhost:5000/api/users', {auth: {username: username, password: password}});
    let user = result.data;
    console.log(user);
     if (user !== null){
      this.setState({authenticatedUser: user, password: password});
     }
    console.log(this.state.password);
  
    //The first argument passed to Cookies.set() specifies the name of the cookie to set. Pass 'authUser' as the cookie name:
    //Cookies.set('authUser', JSON.stringify(user), {expires: 1});
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authUser');
  }

  render() {
    const { authenticatedUser, password } = this.state;
    const value = {
      authenticatedUser,
      password,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }
}


export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
