import { useState, useContext, useEffect } from "react";
import './styles/App.css'
import './styles/Admcss.css'
import { BrowserRouter} from "react-router-dom";
import NavUser from "./components/UI/NavUser";
import { observer } from "mobx-react-lite";
import { Context } from "./index"
import { check } from "./http/userApi";
import { Loader } from "./components/UI/Loader";
import AppRouter from "./components/AppRouter";




const App = observer(() => {

  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      user.setUser(data)
      user.setIsAuth(true)
      //console.log('data',data)
      if (data.role == 'ADMIN') {
        user.setIsAdmin(true)
      }
    }).finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (

    <BrowserRouter>
      <NavUser />
      <AppRouter />
    </BrowserRouter>

  );
});

export default App;
