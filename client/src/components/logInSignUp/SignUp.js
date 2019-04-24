import React, { PureComponent } from "react";
import styles from "./SignUp.module.css";

class SignUp extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <label for="name">Name</label>
          <input
            className={styles.input}
            name="name"
            type="text"
            id="name"
            placeholder=" enter a username"
            onChange={this.props.handleInputChange}
            onKeyPress={this.props.submitOnEnter}
          />
        </div>
        <div className={styles.inputContainer}>
          <label for="email">Email</label>
          <input
            className={styles.input}
            name="email"
            type="email"
            id="email"
            placeholder=" yourEmail@whatever.com"
            autoComplete="email"
            onChange={this.props.handleInputChange}
            onKeyPress={this.props.submitOnEnter}
          />
        </div>
        <div className={styles.inputContainer}>
          <label for="email">Password</label>
          <input
            className={styles.input}
            name="password"
            type="password"
            id="login-password"
            placeholder=" ex: mypassword, 12345, admin"
            autoComplete="current-password"
            onChange={this.props.handleInputChange}
            onKeyPress={this.props.submitOnEnter}
          />
        </div>
        <div className={styles.inputContainer}>
          <label for="verify-password">Verify Password</label>
          <input
            className={styles.input}
            name="verifyPassword"
            type="password"
            id="verify-password"
            placeholder=" enter password again"
            autoComplete="current-password"
            onChange={this.props.handleInputChange}
            onKeyPress={this.props.submitOnEnter}
          />
        </div>
        <div className={styles.btnContainer}>
          <button
            className={`${styles.btn} ${styles.back}`}
            onClick={this.props.back}
          >
            Back
          </button>
          <button
            className={`${styles.btn} ${styles.submit}`}
            onClick={this.props.handleSignUpSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default SignUp;
