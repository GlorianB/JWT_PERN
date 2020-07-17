import React, { Fragment, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Login = (props) => {
  const [inputs, setInputs] = useState({
    email : '',
    password : '',
  });

  const { email, password } = inputs

  const setAuth = props.setAuth;

  const onChangeInput = (event) => {
    setInputs({ ...inputs, [event.target.name] : event.target.value });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const body = { email, password };
    try {
      const response = await fetch('http://localhost:8000/login', {
        method : 'POST',
        mode : 'cors',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (parseRes.jwt) {
        localStorage.setItem('jwt', parseRes.jwt);
        setAuth(true);
        toast.success("Welcome !");
      } else {
        setAuth(false);
        toast.error(parseRes)
      }
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center my-5 display-1'>Login</h1>
      <form>
        <input
          type='text'
          name='email'
          placeholder='email'
          className='form-control my-3'
          onChange={(e) => onChangeInput(e)}
          value={email}/>
        <input
          type='password'
          name='password'
          placeholder='password'
          className='form-control my-3'
          onChange={(e) => onChangeInput(e)}
          value={password}/>
        <button className='btn btn-success btn-block' onClick={(e) => onSubmitForm(e)}>Submit</button>
        </form>
    </Fragment>
  );
};

export default Login;
