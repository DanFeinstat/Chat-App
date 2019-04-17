import React, { PureComponent } from "react";
import styles from "./LogIn.module.css";

class LogIn extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Log In</h2>
        <div className={styles.inputContainer}>
          <label className={styles.label} for="login-email">
            Email
          </label>
          <input
            className={styles.input}
            name="email"
            type="email"
            id="login-email"
            placeholder=" enter your email"
            autoComplete="email"
            onChange={this.props.handleInputChange}
            onKeyPress={this.props.submitOnEnter}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label} for="login-email">
            Password
          </label>
          <input
            className={styles.input}
            name="password"
            type="password"
            id="login-password"
            placeholder=" enter your password"
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
            onClick={this.props.handleLogInSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default LogIn;
