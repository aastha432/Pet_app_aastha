import React, { useState } from "react";
import Profile from "./Profile";
import Registerform from "./Registerform";
import Registerx from "./Registerx";

const Registermain = () => {
  const [user, setuser] = useState({ name: "", email: "" });
  const [error, seterror] = useState(" ");

  const Register = (details) => {
    console.log(details);
    setuser({
      name: details.name,
    });

    /*} setuser(<Profile />); //dont think that we can pass components in the second counter, need to use  router?*/
  };

  return (
    <div>
      {user.name ? (
        <div>
          <Registerx />
          <span> {user.name}</span>
        </div>
      ) : (
        <Registerform Register={Register} />
      )}
    </div>
  );
};
export default Registermain;
//  return <div>{user.email != "" ? <p> {user.name}</p> : <Loginform />}</div>;
