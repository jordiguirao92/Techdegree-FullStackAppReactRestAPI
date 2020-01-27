import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

//Header component that check if the are an authenticatedUser or not. 
class Header extends Component {
 render(){
    return(
        
           
            <div>
                <div className="header">
                    <div className="bounds">
                        <NavLink to='/'> <h1 className="header--logo">Courses</h1> </NavLink>
                        {this.props.context.authenticatedUser ?
                            (<nav> <span className="signup">Hello {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</span>  <NavLink to="/signOut" className="signin" >Sign Out</NavLink> </nav>)
                            :
                            (<nav> <NavLink to="/signup" className="signup" >Sign Up</NavLink> <NavLink to="/signin" className="signin" >Sign In</NavLink> </nav>)
                         }        
                    </div>
                </div>
                <hr></hr>
            </div>
            
         
        );
    } 
}

export default Header;
