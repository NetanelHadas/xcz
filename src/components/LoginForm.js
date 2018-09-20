// Import a library to help create a component
import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

// Create a component
class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder= "user@gmail.com"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder= "password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  };
};


const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

// Make the component available to other parts of the app
export default LoginForm;









/*
we make a seperate component for the login form since we want to be able
to make it disapear after the user successfully enters the right creditials,
in this case email and a password.
*/

/* this is the initial component we usually write just to make things
methodical and organized:
class LoginForm extends Component {
  render() {
    return (
      <View />
    );
  }
}
*/

/* our login form is complied of the following components:
Card, CardSection, Button.
*/

/* TextInput
   the react-native library provides us something thats called TextInput.
   TextInput are text fields tags (primitive)
   that enable us to accept text from the user.

   TextInput does not have a set height and width ( 0 for both),
   by defualt they act as image tags.
   so to make them visable we need to add style to them.
   thats why we add: style={{ height: 40, width: 100 }} in the TextInput tag
   so we can initially see them.
   we can play around with the height in the case you can't see the letters
   you enter.
*/

/* we added the prop onChangeText
we passed it a federal function which is an event handler,
this federal function will be called whenever a user types a text in the TextInput
and the argument named text that it will get will be that text.
onChangeText={text => this.setState({ text })}
it will then take that text and call setState with it.

!!!
when ever we call this.setState the component rerenders.
!!!

when the component rerenders we change the prop of value to this.state.text
which is the text the user entered which is saved in our state.

we recreate the TextInput and tell it its value is this.state.text,
the TextInput has no idea what his value is, so thats why we need to tell him specifically,
"the text you should contain should come from this.state.text"

and this cycles return each time for the user to be able to enter text.

The text exist as a piece of state in our state input
and not inside the TextInput and thats why we need to use value.
*/

/* this is how we wrote and used TextInput before we made it a reuseable component
and implemented it within our code so we can see how it should look and if it works:

import { TextInput } from 'react-native';

<CardSection>
  <TextInput
    value={this.state.text}
    onChangeText={text => this.setState({ text })}
    style={{ height: 40, width: 100 }}
  />
</CardSection>

we then changed TextInput into Input as can be seen in our code.
*/

/* /.common
  we used the import ./common since
  common is in the same folder as LoginForm
  and since if we are not entering another /file name it will directly go to index.js
*/

/* TextInput or Input - onChangeText prop
The LoginForm responsibility is to figure out what the TextInput state value is,
which means what is the actual field namedtext within the state value is.

we are passing the federal function as a prop down into the Input component
we created.

the onChangeText enables the user to enter text, which then the function setState is called
with this text (immidiately as a letter is entered/deleted by the user - thats why its called
"on change text").
this function call updates the state with the entered text
and the value (as a call to setState rerenders the component).
only later on when the user presses the button (onPress prop) the email and password are sent to the
firebase authentication server.

*/

/* we are passing to input.js in addition to the prop value and federal function
the following props as well:
placeholder= "user@gmail.com"
label="Email"
*/

/* since we are going to use the Input component both for email and password
we better rename the prop we called Text to email and add another one for password

  state = { text: '' };

  <Input
    placeholder= "user@gmail.com"
    label="Email"
    value={this.state.text}
    onChangeText={text => this.setState({ text })}
  />

  this what it was before the change.

  the first text in onChangeText={text => ...}
  we didn't have to refactor the argument, text, since it just holds what the user entered.
  we can call this argument what ever we want, but we changed it to email to make the code clearer.

  note: props on the other hand need to be specialy named.
*/

/* secureTextEntry
Making our password shown on screen as ******* and not plain text
we do the above change so no one can record our password and hack our account.

the TextInput tag which is the primitive behind our Input component supports
secure text entry (look for additional explanation at the Input component code).

we need to pass an additional prop to our TextInput tag as follows:
(we also need to change our Input component accordingly)

secureTextEntry={true}
or by jsx convention we can do (explained more in the Input component):
secureTextEntry

and it will be shows as the value true inside the Input component.

if we want it to not be shown as ***** we pass:

secureTextEntry={false}
or by default when the Input tag is created secureTextEntry will be undefined,
and we pass undefined to the secureTextEntry prop which is considered as false in jsx.
so we do not need to add this prop at all in the case the users input is not a secret.

*/

/* Button - onPress prop
we will only let the user in when they tap on the Button

we deal with taps on buttons by adding a call back function
to the onPress prop event handler as such: onPress={}
so when ever the user taps the button the call back function will be called
and that will be the opportunity to log our user in.

we will define the call to the function as a call to the helper method
(that we will write in the LoginForm in just a bit) as such:
onPress={this.onButtonPress}

this function will be called sometime in the future,
we will bind the context to this, as follows:
onPress={this.onButtonPress.bind(this)}

onButtonPress() method

now we need to define: onButtonPress()
when this method is called it is our time to log the user in,
we want to try to authenticate our user.

to authenticate our user we will import the firebase framework:
import firebase from 'firebase';

and then we will use a method out of firebase to sign the user in -
we are using a method from the firebase object to authenticate the user:

firebase.auth().signInWithEmailAndPassword();

we will then need to pass this function our email and password.
remember both email and password are available on our state object.

because we want 2 properties of the same object
we will use a bit of destructring to clean up our code as follows,
we will add:

const { email, password } = this.state;

to our onButtonPress() method.

Now we just pass them to the method
firebase.auth().signInWithEmailAndPassword(email, password);
*/

/*
firebase.auth().signInWithEmailAndPassword(email, password);

when we call signInWithEmailAndPassword and execute it, this statment returns
a promise.

a promise in javascript is a construct for handling some amount of asynchronous code,
it is asynchronous since we make a request to the server to authenticate the user,
this takes some amount of time.

to get notifyed when this request is complete we can make use of that promise
returned by the above statment, firebase.auth()....

.catch(() => {
if the authentication failed then the user is not a signed in user,
so we should make this user an account.
create an account:
firebase.auth().createUserWithEmailAndPassword(email, password)
this method also returns a promise, since it is asynchronous method,
so we should add another catch(() =>
to show an error to the user in the case that the user is trying to make an account
with acount details that already exist in the system.

Show Error to our user:
to show an error to the user we need to rerender an error to the screen,
to rerender we need to use the method setState.
(very important - to rerender we need to use the method setState).
so we will add another property to our state object which will serve this purpose, error.

*/

/* style destructring
in this case since we only have special styling for the error
we didn't use destructring.
*/

/* this.setState({ error: '' })
we added this to clean the error when the user put the correct email and password in the second time
after he failed the first time.
*/

/* spinner - important!
since we are working in mobile where the internet connection is not always the strongest,
we need to give good feed back to our user as he uses the app.

thats why we are going to add a spinner where the button is, so it would show
when the user presses the button.
it will tell the user that we are handling his request.

Toggeling
then when we succed or fail to log in, we show the button back again
instead of the spinner.
this is called Toggeling.

this point is after we finished building our spinner componenet:
Once we push the button we need to rerender,
so the spinner will show on the screen
or the button will show on the screen.

as we said, when we want to rerender we need to work with setState.
we will add a bollean named loading to our state.
when ever loading is false we will show the button.
when ever loading is true we will show the spinner.

once we push the button:
this.setState({ error: '', loading: true })


important!!!
for conditional rendering:
either show this
or show that

we use a helper method, renderButton
(we could have used if else inside the method instead of what we did but it doesn't matter)
*/

/* getting the spinner away from the screen once we stop loading

we need to add a .then statment,
if the method succeded then do what is in the .then()

firebase.auth().signInWithEmailAndPassword(email, password)
  .then()
  .catch(() => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then()
      .catch(() => {
        this.setState({ error: 'Authentication Failed.'});
      });

now after the method is called and succeded
we pass to the .then and do the code that we have here,
in our case, remove the spinner, .then(this.setState({ loading: false }))

so instead of putting this.setState({ loading: false })
in each line of .then(), we will use a helper method instead,
so we keep our code cleaner and more organized.
helper method is: onLoginSuccess

.then(this.onLoginSuccess)

remember!!!
because this is a function we are passing of to a promise,
a promise that we will call it at some time in the future
but we don't know the context which it will be called at (context - who calls it),
since
firebase.auth().signInWithEmailAndPassword(email, password) can call this function
or
firebase.auth().createUserWithEmailAndPassword(email, password) can call this function
or
.catch(() => {
  this.setState({ error: 'Authentication Failed.'});
}); can as well call this function

we must bind it to the context (the person) who calls it,
so
.then(this.onLoginSuccess.bind(this))



to make the code a bit more ogranized we will also refactor
.catch(() => {
  this.setState({ error: 'Authentication Failed.'});
});

with the use of another helper method,
helper method is: onLoginFail
to this
.catch(this.onLoginFail.bind(this));

same explanation for the .bind(this) as the one above.
*/

/* short summery

when user taps the button:
this.setState({ error: '', loading: true })
rerenders and shows the spinner

when user succedes authentication:
firebase.auth().signInWithEmailAndPassword(email, password)
  .then(this.onLoginSuccess.bind(this))
rerenders and shows the button (not the spinner)
(the function onLoginSuccess uses the setState method)

when the user fail authentication but succedes creating and account:
.catch(() => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(this.onLoginFail.bind(this));
});
rerenders and shows the button (not the spinner)

when the user fails authentication and fails creating and account:
.catch(this.onLoginFail.bind(this));
rerenders and shows the button (not the spinner)

*/

/* onLoginSuccess and onAuthStateChanged methods
we could change the method onLoginSuccess to move the user to a different screen when
the user logs in.

another solution that we are going to use (because it has a simpler code),
is a method called onAuthStateChanged offered to us by firebase.

onAuthStateChanged
this method is a handler for an event.
we call this method when ever the authentication state of our user changes.
we will put this code inside of our app component, in the componentWillMount method.

*/
