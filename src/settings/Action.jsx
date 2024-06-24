import React, { useState } from "react";

const Action = () => {
  const [number, setNumber] = useState(false);
  const [email, setEmail] = useState(false);
  return (
    <>
      <div style={styles.inputGroup}>
        <label>Action</label>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label
            style={{
              margin: "0.5em 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              name="selection"
              value="vehicle"
              onClick={() => setNumber(!number)}
              checked={number}
            />
            SMS
          </label>
          <label
            style={{
              margin: "0.5em 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              name="selection"
              value="vehicleGroup"
              onClick={() => setEmail(!email)}
              checked={email}
            />
            Email
          </label>
          <label
            style={{
              margin: "0.5em 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input type="radio" name="selection" value="vehicle" />
            Notification
          </label>
        </div>
      </div>
      {number && (
        <div style={styles.inputGroup}>
          <label htmlFor="message">Mobile Number</label>
          <textarea
            id="message"
            style={styles.textarea}
            placeholder="Enter Mobile Number"
            required
          />
        </div>
      )}

      {email && (
        <div style={styles.inputGroup}>
          <label htmlFor="message">Email</label>
          <textarea
            id="email"
            style={styles.textarea}
            placeholder="johndoe@gmail.com"
            required
          />
        </div>
      )}
    </>
  );
};

const styles = {
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    marginBottom: "5px",
  },
};

export default Action;
