import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

//Importing components
import withContext from './components/Context/Context';
import PrivateRoute from './components/PrivateRoute';

import Header from './components/Header';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';

import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandleError';

//Providing components access to the Context component. 
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseContext = withContext(UpdateCourse);

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);



class App extends Component {

  render() {
    return(
      <BrowserRouter>
      <div>
    
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/courses'/>} />
          
          <Route exact path='/courses' component={Courses} />
          <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseContext} />

          <Route exact path='/signin' component={UserSignInWithContext} />
          <Route exact path='/signup' component={UserSignUpWithContext} />
          <Route exact path='/signout' component={UserSignOutWithContext} />

          <Route exact path='/notfound' component={NotFound} />
          <Route exact path='/forbidden' component={Forbidden} />
          <Route exact path='/error' component={UnhandledError} />
          <Route component={NotFound}/>  
        </Switch>
        </div>
        
      </BrowserRouter>
      

    );
  }
}

export default App;
