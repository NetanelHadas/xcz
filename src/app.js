// Import a library to help create a component
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


// Create a component
class App extends Component {
state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBK7pwWSa44md5REhwiQZwaHSynJZuObe8',
      authDomain: 'authentication-6a179.firebaseapp.com',
      databaseURL: 'https://authentication-6a179.firebaseio.com',
      storageBucket: 'authentication-6a179.appspot.com',
      messagingSenderId: '60214823656'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <CardSection><Spinner size="large" /></CardSection>;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

// Make the component available to other parts of the app
export default App;

/*
  This class component is used as a service to the root components
  index.android and index.ios,
  since they are both the same in this specific app we can simply make this
  App component instead of copy pasting code between the two files.
*/
/*
we used here a new import strategy explained in index.js which is
located in the path components/common
*/

/*
in firebase.google.com after you make a new project with the name of the app
(use small letters) pick add firebase to your web app, which means
add firebase to your java script application,
since react is for both android and IOS so it fits for both categories.

make sure to import the firebase above component written by us that we imported
(import the firebase library).
*/
/*
after we have firebase installed we need to connect our app to a specific
bucket of data that in this case holds all of our user creditials.
*/
/*
we need to make a life cycle method that loads up the list of users and emails,
the method should start running before we try to render our app to the screen,
(and thats why we put it before the render method)
so once it is ready it will save time when the user is trying to log in.
this method is: componentWillMount()
inside of this method we will do our firebase initialization.
this type of method is automatically called.
*/
/*
on the firebase website in the Authentication section we click the
web setup
and copy just whats between the {   } including the brackets.
and past it as we did in our code.
make sure you change the double quotes with single quotes!!!!!!!!!!!!!!
*/

/* onAuthStateChanged
after we finished working on our LoginForm component we came back here since
we wanted to add onAuthStateChanged method inside our app compnent.

this method is an event hanlder that accepts a function.

we call this method when ever the authentication state of our user changes.
we will put this code inside of our app component, in the componentWillMount method.

when the user signs in and when the user signs out
we will know inside the federal function onAuthStateChanged.
(function and callback means the same thing).

when ever the state of authentication of our user changes this app is called.

the argument for this function is user.
user is an object the represents the user.
if user signs out it will be null or undefined.

we want to rerender a screen to the user depending on if he is logged in or not,
as we said, if we want to rerender we need to use state and setState.
*/


/*
we will now use the same methodolgy as we used in the LoginForm
to decide whether we want to show the LoginForm or something else.

render() {
  return (
    <View>
      <Header headerText="Authentication" />
      <LoginForm />
    </View>
  );
}

we are gonna write a helper function called renderContent()
to do exactly that.

render() {
  return (
    <View>
      <Header headerText="Authentication" />
      {this.renderContent()}
    </View>
  );
}

*/

/*
at this point since we are already signed in to our app from our previews section
so as soon as I authenticate the app onAuthStateChanged is called
and changes loggedIn: true
and we get the Log Out button on the screen.

but before we see the Log Out button we see the LoginForm for half a second,
instead we would prefer the user would see the spinner
while we are figuring out if the user is signed in or signed out.

so actually we have 3 options: logged in, not logged in and don't know if you're logged in.
but our loggedIn flag is a boolean, true or false.
to handle this we set loggedIn initial value to null,
loggedIn: null (don't know if you're logged in)

accordingly we need to change the method renderContent()
to handle all 3 cases.
if loggedIn: true show the Log out button
if loggedIn: false show the LoginForm
if loggedIn: null show the spinner
to do this we will use a switch statment

switch (this.state.loggedIn) {
  case true:
    return <Button>Log Out</Button>
  case false:
    return <LoginForm />;
  default:
    return <Spinner size="large" />;
}
*/

/*
we added CardSection tags so it will show the Log Out and spinner properly on the screen.
I could have used view tag instead as well.
*/

/* Log Out
we need to add functionality to the Log Out button.
using the onPress prop

case true:
  return (
    <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
  );

the instant the user sign out the Authentication user state changes
and so the method onAuthStateChanged is called
and changes loggedIn to false
and I should be showed the LoginForm again.
*/

/* If I wanted to add the Albums app an authentication
I would have added this section the Albums app component and it would have
have shown the Albums to the user after he authenticates.

switch (this.state.loggedIn) {
  case true:
    return (
      <CardSection>
        <Button onPress={() => firebase.auth().signOut()}>
          Log Out
        </Button>
      </CardSection>
    );
*/

/* Changing icons for the app
choose a picture and put it in E:\reactnative\pics for apps

after that get into
android studio
look at the left side for a bar called project
right click res folder
new --> image asset
and set the icon you put in the folder,
it will name it as ic_launcher as is written in the AndroidManifest files
which is located at E:\reactnative\auth\android\app\src\main
for each app.
you can also see how android studio changed the resulotion
of the picture you choose.
can be found at E:\reactnative\auth\android\app\src\main\res
*/
