import react, { useState } from "react";
import BookItem from "./components/BookItem";
import BookList from "./components/BookList";
import './styles/App.css'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import About from "./pages/About";
import Books from "./pages/Books";
import Author from "./pages/Author";
import Order from "./pages/Order";
import Bookid from "./pages/Bookid";
import NavBar from "./components/UI/NavBar";
import Footer from "./components/UI/Footer";


function App() {
  return (
    
    <BrowserRouter>
      <div className="content">
        <NavBar />
        <Switch>
          <Route path="/about">
            <About />
        </Route>
        <Route exact path="/books">
          <Books />
        </Route>
        <Route exact path="/books/:id">
          <Bookid />
        </Route>
        <Route path="/author">
          <Author />
        </Route>
        <Route path="/order">
          <Order />
        </Route>        
        <Redirect to="/books"/>
        </Switch>
        
      </div>
      <Footer />

    </BrowserRouter>

  )
}

export default App;
