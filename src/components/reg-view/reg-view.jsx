import React, { useState } from "react";
import PropTypes from "prop-types";

import "./reg-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, Birthday);

    props.onRegistration(username);
  };



}
