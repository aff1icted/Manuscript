import { useState, useContext, useEffect } from "react";
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
import NavAdmin from "./components/UI/NavAdmin";
import Auth from "./pages/Auth";
import NavUser from "./components/UI/NavUser";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { observer } from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import { Context } from "./index"
import Pages from "./pages/Pages";
import Main from "./pages/Main";
import AdminBook from "./pages/AdminBook";
import AdminFormat from "./pages/AdminFormat";
import AdminCover from "./pages/AdminCover";
import AdminTag from "./pages/AdminTag";
import AdminSeries from "./pages/AdminSeries";
import AdminAuthor from "./pages/AdminAuthor";




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
        <Route path="/main">
          <div className="content">
            <NavBar />
            <Main />
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

        <Route exact path="/admin/pages">

          <div className="blocks">
            <NavAdmin />
            <Pages />
          </div>
        </Route>

        <Route exact path="/admin/book">

          <div className="blocks">
            <NavAdmin />
            <AdminBook />
          </div>
        </Route>

        <Route exact path="/admin/book/:isbn">
          <div className="blocks">
            <NavAdmin />
            <AddBook />
          </div>
        </Route>

        <Route exact path="/admin/format">

          <div className="blocks">
            <NavAdmin />
            <AdminFormat />
          </div>
        </Route>

        <Route exact path="/admin/format/:name">
          <div className="blocks">
            <NavAdmin />
            <AddFormat />
          </div>
        </Route>

        <Route exact path="/admin/author">

          <div className="blocks">
            <NavAdmin />
            <AdminAuthor />
          </div>
        </Route>

        <Route exact path="/admin/author/:fullname">
          <div className="blocks">
            <NavAdmin />
            <AddAuthor />
          </div>
        </Route>

        <Route exact path="/admin/series">

          <div className="blocks">
            <NavAdmin />
            <AdminSeries />
          </div>
        </Route>

        <Route exact path="/admin/series/:seriesname">
          <div className="blocks">
            <NavAdmin />
            <AddSeries />
          </div>
        </Route>

        <Route exact path="/admin/tag">

          <div className="blocks">
            <NavAdmin />
            <AdminTag />
          </div>
        </Route>

        <Route exact path="/admin/tag/:tagname">
          <div className="blocks">
            <NavAdmin />
            <AddTag />
          </div>
        </Route>

        <Route exact path="/admin/cover">

          <div className="blocks">
            <NavAdmin />
            <AdminCover />
          </div>
        </Route>

        <Route exact path="/admin/cover/:cover">
          <div className="blocks">
            <NavAdmin />
            <AddCover />
          </div>
        </Route>


        <Route path="/error">
          <Error />
        </Route>
        <Redirect to="/main" />
      </Switch>
    </BrowserRouter>

  );
});

export default App;
