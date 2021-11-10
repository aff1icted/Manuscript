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
import Admin from "./pages/Admin";
import Error from "./pages/Error";


function App() {
  return (

    <BrowserRouter>

        <Switch>        
          <Route path="/about">
          <div className="content">
            <NavBar />
            <About />
            </div>
            <Footer />
            
          </Route>
          <Route exact path="/books">
            <div className="content">
            <NavBar />
            <Books />
            </div>
            <Footer />
          </Route>
          <Route exact path="/books/:ISBN">
          <div className="content">
            <NavBar />
            <Bookid />
            </div>
            <Footer />
            
          </Route>
          <Route path="/author">
          <div className="content">
            <NavBar />
            <Author />
            </div>
            <Footer />
            
          </Route>
          <Route path="/order">
          <div className="content">
            <NavBar />
            <Order />
            </div>
            <Footer />
            
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Redirect to="/books" />
        </Switch>
    </BrowserRouter>

  )
}

export default App;
