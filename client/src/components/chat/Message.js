import React, { PureComponent } from "react";
import styles from "./Message.module.css";
import wellMet from "../../audio/wellMet.mp3";
import heyListen from "../../audio/heyListen.mp3";

class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.scrolltToBottom();
  }

  render() {
    return (
      <div
        className={
          this.props.currentName === this.props.name
            ? `${styles.container} ${styles.right}`
            : styles.container
        }
      >
        {this.props.audio && this.props.message === "Well Met!" && (
          <audio src={wellMet} autoPlay type="audio/mpeg" />
        )}
        {this.props.audio && this.props.message === "Hey, listen!" && (
          <audio src={heyListen} autoPlay type="audio/mpeg" />
        )}
        <p className={styles.text}>
          <span className={styles.name}>{this.props.name}</span>:{" "}
          {this.props.message}
        </p>
      </div>
    );
  }
}
export default Message;
