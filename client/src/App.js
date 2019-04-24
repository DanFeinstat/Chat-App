import React, { Component } from "react";
import Chat from "./components/chat/Chat";
import Message from "./components/chat/Message";
import LogIn from "./components/logInSignUp/LogIn";
import SignUp from "./components/logInSignUp/SignUp";
import SelectLogOrSign from "./components/logInSignUp/SelectLogOrSign";
import styles from "./App.module.css";
import userAPI from "./utils/userAPI";
import genchatAPI from "./utils/genchatAPI";
import io from "socket.io-client";

const socket = io.connect();

class App extends Component {
  state = {
    userName: "",
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
    userId: "",
    socket: "",
    loggedIn: false,
    toDisplay: 1,
    messages: [],
    comment: "",
    chatRoom: "general",
    target: "",
  };

  chatRef = React.createRef();
  componentDidMount() {
    socket.on("newGenMessage", message => {
      let genchat = [...this.state.messages];
      genchat.push(message.data.data);
      this.setState({
        messages: genchat,
      });
    });
  }

  componentWillUnmount() {
    localStorage.setItem("ignChatDemoJwt", null);
  }

  getGenchatComments = () => {
    genchatAPI.getComments(localStorage.ignChatDemoJwt).then(response => {
      const messages = response.data.reverse();

      this.setState({
        messages: messages,
      });
    });
  };

  handleGenchatComment = e => {
    e.preventDefault();
    const message = this.state.comment;
    if (message === "" || message === " ") {
      alert("please enter a message");
    } else {
      const commentData = {
        message: message,
        name: this.state.name,
        id: this.state.userId,
        date: new Date(),
      };

      const socketCommentData = {
        message: message,
        name: this.state.name,
        id: this.state.userId,
        date: new Date(),
        audio: true,
      };

      socket.emit("sendingGenMessage", { data: socketCommentData });
      genchatAPI.addComment(localStorage.ignChatDemoJwt, commentData);
      this.setState({
        comment: "",
      });
    }
  };

  handleWellMet = e => {
    e.preventDefault();
    const message = "Well Met!";
    const commentData = {
      message: message,
      name: this.state.name,
      id: this.state.userId,
      date: new Date(),
    };

    const socketCommentData = {
      message: message,
      name: this.state.name,
      id: this.state.userId,
      date: new Date(),
      audio: true,
    };

    socket.emit("sendingGenMessage", { data: socketCommentData });
    genchatAPI.addComment(localStorage.ignChatDemoJwt, commentData);
  };

  handleHeyListen = e => {
    e.preventDefault();
    const message = "Hey, listen!";
    const commentData = {
      message: message,
      name: this.state.name,
      id: this.state.userId,
      date: new Date(),
    };

    const socketCommentData = {
      message: message,
      name: this.state.name,
      id: this.state.userId,
      date: new Date(),
      audio: true,
    };

    socket.emit("sendingGenMessage", { data: socketCommentData });
    genchatAPI.addComment(localStorage.ignChatDemoJwt, commentData);
  };

  handleInputChangeForChat = e => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.length > 150) {
      e.target.value = this.state[name];
      alert("150 characters reached");
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    let limit =
      e.target.name === `name` ? 16 : e.target.name === `email` ? 30 : 12;
    if (value.length > limit) {
      e.target.value = this.state[name];
      alert("Maximum character length reached");
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  letEnterSubmitLogIn = e => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      this.handleLogInSubmit(e);
    }
  };

  letEnterSubmitSignUp = e => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      this.handleSignUpSubmit(e);
    }
  };

  letEnterSubmitChat = e => {
    let code = e.keyCode || e.which;
    if (code === 13) {
      this.handleGenchatComment(e);
    }
  };

  handleSignUpSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      return alert("Please enter a name.");
    } else if (!this.state.email) {
      return alert("Please enter an email address for your username");
    } else if (!this.state.password) {
      return alert("Please enter a password.");
    } else if (!this.state.verifyPassword) {
      return alert("Please confirm your password.");
    } else if (this.state.password !== this.state.verifyPassword) {
      return alert("Your passwords do not match");
    }
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    userAPI.signUp(userData).then(response => {
      const userInfo = {
        email: this.state.email,
        password: this.state.password,
      };

      userAPI.logIn(userInfo).then(response => {
        if (response.data.status === "error") {
          alert(response.data.message);
        } else {
          localStorage.setItem("ignChatDemoJwt", response.data.data.token);
          this.loggedIn(response.data.data.user._id);
          const socketInfo = {
            email: this.state.email,
            socketId: socket.id,
          };
          userAPI.updateSocket(socketInfo);
          this.setState({
            password: "",
            verifyPassword: "",
            loggedIn: true,
            toDisplay: 4,
            userId: response.data.data.user._id,
          });
        }
      });
    });
  };

  handleLogInSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    const failstate = setTimeout(() => {
      alert(`Invalid email or password`);
    }, 3000);
    userAPI.logIn(userData).then(response => {
      if (response.data.status === "error") {
        alert(response.data.message);
      } else {
        clearTimeout(failstate);
        localStorage.setItem("ignChatDemoJwt", response.data.data.token);
        this.loggedIn(response.data.data.user._id);
        const socketInfo = {
          email: this.state.email,
          socketId: socket.id,
        };
        userAPI.updateSocket(socketInfo);
        this.setState({
          name: response.data.data.user.name,
          userId: response.data.data.user._id,
          password: "",
          verifyPassword: "",
          loggedIn: true,
          toDisplay: 4,
        });
      }
    });
  };

  loggedIn = name => {
    socket.emit("userLoggedIn", {
      data: { userId: name, socketId: socket.id },
    });
  };

  logOut = () => {
    localStorage.setItem("ignChatDemoJwt", null);
    const userData = {
      email: this.state.email,
      socketId: "",
    };
    userAPI.updateSocket(userData);
    this.setState({
      userName: "",
      name: "",
      email: "",
      password: "",
      verifyPassword: "",
      userId: "",
      loggedIn: false,
      toDisplay: 1,
    });
  };

  scrollToBottom = () => {
    this.chatRef.current.scrollTop = this.chatRef.current.scrollHeight;
  };

  //quick and dirty conditional rendering as 'page changing'.
  //A much better way to do this for more complex layouts
  // would be something like react router.

  toLanding = e => {
    e.preventDefault();
    this.setState({
      toDisplay: 1,
    });
  };

  toSignUp = e => {
    e.preventDefault();
    this.setState({
      toDisplay: 2,
    });
  };
  toLogIn = e => {
    e.preventDefault();
    this.setState({
      toDisplay: 3,
    });
  };

  toChat = e => {
    e.preventDefault();
    if (this.state.loggedIn) {
      this.setState({
        toDisplay: 4,
      });
    }
  };

  render() {
    return (
      <div className={styles.App}>
        {this.state.toDisplay === 1 && (
          <SelectLogOrSign toSignUp={this.toSignUp} toLogIn={this.toLogIn} />
        )}
        {this.state.toDisplay === 2 && (
          <SignUp
            submitOnEnter={this.letEnterSubmitSignUp}
            back={this.toLanding}
            handleInputChange={this.handleInputChange}
            handleSignUpSubmit={this.handleSignUpSubmit}
          />
        )}
        {this.state.toDisplay === 3 && (
          <LogIn
            submitOnEnter={this.letEnterSubmitLogIn}
            back={this.toLanding}
            handleInputChange={this.handleInputChange}
            handleLogInSubmit={this.handleLogInSubmit}
          />
        )}
        {this.state.toDisplay === 4 && (
          <Chat
            ref={this.chatRef}
            submitOnEnter={this.letEnterSubmitChat}
            comment={this.state.comment}
            getGenchatComments={this.getGenchatComments}
            heyListen={this.handleHeyListen}
            wellMet={this.handleWellMet}
            handleInputChange={this.handleInputChangeForChat}
            handleGenchatComment={this.handleGenchatComment}
          >
            {this.state.messages.map((value, index) => {
              return (
                <Message
                  scrolltToBottom={this.scrollToBottom}
                  key={index}
                  name={value.name}
                  currentName={this.state.name}
                  message={value.message}
                  audio={value.audio ? true : false}
                />
              );
            })}
          </Chat>
        )}
      </div>
    );
  }
}

export default App;
