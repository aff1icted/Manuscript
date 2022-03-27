import react, { useState, useContext, useEffect } from "react";
import BookItem from "./components/BookItem";
import BookList from "./components/BookList";
import './styles/App.css'
import './styles/Admcss.css'
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
import AddBook from "./pages/AddBook";
import AddSeries from "./pages/AddSeries";
import AddAuthor from "./pages/AddAuthor";
import AddTag from "./pages/AddTag";
import AddCover from "./pages/Addcover";
import AddFormat from "./pages/AddFormat";
import EditAuthor from "./pages/EditAuthor";
import EditTags from "./pages/EditTags";
import EditSeries from "./pages/EditSeries";
import EditCover from "./pages/EditCover";
import EditFormat from "./pages/EditFormat";
import EditBook from "./pages/EditBook";
import NavAdmin from "./components/UI/NavAdmin";
import HeaderAdmin from "./components/UI/HeaderAdmin";
import Auth from "./pages/Auth";
import NavUser from "./components/UI/NavUser";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { observer } from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import { Context } from "./index"



const App = observer(() => {

  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  const check = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/user/auth`)
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
  }

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (

    <BrowserRouter>
      <NavUser />
      <Switch>
        <Route path="/about">
          <div className="content">
            <NavBar />
            <About />
          </div>
          <Footer />

        </Route>
        <Route path="/registration">
          <div className="content">
            <NavBar />
            <Auth />
          </div>
          <Footer />
        </Route>

        <Route path="/login">
          <div className="content">
            <NavBar />
            <Auth />
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
        <Route exact path="/admin">

          <div className="blocks">
            <NavAdmin />
            <Admin />
          </div>
        </Route>
        <Route exact path="/admin/addbook">

          <div className="blocks">
            <NavAdmin />
            <AddBook />
          </div>
        </Route>
        <Route exact path="/admin/addtag">

          <div className="blocks">
            <NavAdmin />
            <AddTag />
          </div>
        </Route>
        <Route exact path="/admin/addauthor">

          <div className="blocks">
            <NavAdmin />
            <AddAuthor />
          </div>
        </Route>
        <Route exact path="/admin/addseries">

          <div className="blocks">
            <NavAdmin />
            <AddSeries />
          </div>
        </Route>
        <Route exact path="/admin/addcover">

          <div className="blocks">
            <NavAdmin />
            <AddCover />
          </div>
        </Route>
        <Route exact path="/admin/addformat">

          <div className="blocks">
            <NavAdmin />
            <AddFormat />
          </div>
        </Route>
        <Route exact path="/admin/editauthor">

          <div className="blocks">
            <NavAdmin />
            <EditAuthor />
          </div>
        </Route>

        <Route exact path="/admin/edittags">

          <div className="blocks">
            <NavAdmin />
            <EditTags />
          </div>

        </Route>

        <Route exact path="/admin/editseries">

          <div className="blocks">
            <NavAdmin />
            <EditSeries />
          </div>
        </Route>

        <Route exact path="/admin/editcover">

          <div className="blocks">
            <NavAdmin />
            <EditCover />
          </div>
        </Route>

        <Route exact path="/admin/editformat">

          <div className="blocks">
            <NavAdmin />
            <EditFormat />
          </div>
        </Route>

        <Route exact path="/admin/editbook">

          <div className="blocks">
            <NavAdmin />
            <EditBook />
          </div>
        </Route>

        <Route path="/error">
          <Error />
        </Route>
        <Redirect to="/books" />
      </Switch>
    </BrowserRouter>

  );
});

export default App;
