import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom';

import { GoogleLogin, googleLogout  } from '@react-oauth/google';

import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';

import { AUTH } from '../../constraint/actionTypes';
import { signup, signin } from '../../actions/auth'

import Icon from './icon';
import Input from './Input';

import {decode} from '../../utils/decodeGoogle';

import useStyles from './styles';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp  = () => {
  const [isSignup, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const history = useHistory();

  const dispatch = useDispatch()

  const classes = useStyles()

  // useEffect(() => {
  //   console.log(formData)
  // })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(isSignup) dispatch(signup(formData, history))
    else dispatch(signin(formData, history))

  }

  const handleShowPassword = (e) => {

  }

  const googleError = (err) => {
    console.log(err)
  }

  const googleSuccess = (res) => {
    const result = decode(res)
   //console.log(result)
    const data = {
      result,
      token: res.credential
    }
    dispatch({type: AUTH, data})  //dispatch thẳng lên reducer
    history.push('/')
  }

  const switchMode = () => {
    setIsSignUp(!isSignup)
  }
  
  return (
    <Container component="main" maxWidth="xs">
    <Paper className={classes.paper} elevation={3}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          { isSignup && (
          <>
            <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
            <Input name="lastName" label="Last Name" handleChange={handleChange} half />
          </>
          )}
          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
          { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
          { isSignup ? 'Sign Up' : 'Sign In' }
        </Button>
        <GoogleLogin
              onSuccess={googleSuccess}
              onError={googleError}
            />
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
  )
}

export default SignUp









