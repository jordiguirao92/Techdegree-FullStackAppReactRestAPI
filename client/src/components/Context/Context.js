import React, { Component } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  signIn = async (username, password) => {
    const result = await axios.get('http://localhost:5000/api/users', {auth: {username: username, password: password}});
    let user = result.data;
     //if (user !== null)
    //this.setState(() => {return {authenticatedUser: user};});
    this.setState(prevState => ({authenticatedUser: user}));
    const cookieOptions = {expires: 1};
      //The first argument passed to Cookies.set() specifies the name of the cookie to set. Pass 'authenticatedUser' as the cookie name:
    Cookies.set('authenticatedUser', JSON.stringify(user), {cookieOptions});
    this.props.history.push('/');
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
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
