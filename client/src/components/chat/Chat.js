import React, { Component } from "react";
import styles from "./Chat.module.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getGenchatComments();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.commentContainer} ref={this.props.chatRef}>
          {this.props.children}
        </div>

        <form className={styles.formContainer}>
          <input
            className={styles.input}
            name="comment"
            value={this.props.comment}
            placeholder="enter message here"
            onChange={this.props.handleInputChange}
            onKeyPress={this.props.submitOnEnter}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={this.props.wellMet}>
              Greet
            </button>
            <button
              className={`${styles.btn} ${styles.navi}`}
              onClick={this.props.heyListen}
            >
              ____
            </button>
            <button
              className={styles.btn}
              onClick={this.props.handleGenchatComment}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Chat chatRef={ref} {...props} />
));
