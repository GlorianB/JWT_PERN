import React, { Fragment, useState, useEffect } from 'react'

const Dashboard = (props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:8000/dashboard", {
        method: 'GET',
        mode: 'cors',
        headers: {
          "jwt" : localStorage.jwt
        }
      });
      const parseRes = await response.json();
      console.log(parseRes);
      setName(parseRes);
    } catch (e) {
      console.error(e);
    }
  };

  const setAuth = props.setAuth;

  const onLogout = async (event) => {
    event.preventDefault();
    localStorage.removeItem("jwt");
    setAuth(false);
  }


  return (
    <Fragment>
      <h1>Dashboard</h1>
      <h2>Bonjour {name} !</h2>
      <button className='btn btn-danger' onClick={(e) => onLogout(e)}>Logout</button>
    </Fragment>
  );
};

export default Dashboard;
