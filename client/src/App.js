import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import PostDetail from "./components/PostDetail/PostDetail";
import CreateOrTags from "./components/CreateOrTags/index";
import Auth from "./components/Auth/Auth";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))
  
  return (
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={
          "976846740178-mtd1fjne6hnabdaefloe5tfjq9qs6q1t.apps.googleusercontent.com"
        }
      >
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path={['/creators/:par', '/tags/:par']} exact component={CreateOrTags} />
            <Route path="/posts/:id" exact component={PostDetail} />
            <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          </Switch>
        </Container>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
