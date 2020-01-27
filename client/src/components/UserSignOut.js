import React from 'react';
import {Redirect} from 'react-router-dom';

//This component call the Context.js signOut function. 
const UserSignOut = (props) => {
    props.context.actions.signOut();

 return(
        <Redirect to='/'/>
 );   
}

export default UserSignOut;