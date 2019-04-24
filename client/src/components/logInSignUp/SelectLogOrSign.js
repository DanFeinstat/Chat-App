import React from "react";
import styles from "./Select.module.css";

const SelectLogOrSign = props => {
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={props.toSignUp}>
        Sign Up
      </button>

      <button className={styles.btn} onClick={props.toLogIn}>
        Log In
      </button>
    </div>
  );
};

export default SelectLogOrSign;
