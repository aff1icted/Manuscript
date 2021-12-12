import { ADDBOOK_ROUTE, ADDSERIES_ROUTE, ADDTAG_ROUTE } from "./components/utils/consts";
import AddAuthor from "./pages/AddAuthor";
import AddBook from "./pages/AddBook";
import AddSeries from "./pages/AddSeries";
import AddTag from "./pages/AddTag";
import Admin from "./pages/Admin";

export const authRoutes = [
    {
        path:ADMIN_ROUTE,
        Component: Admin
    },
    {
        path:ADDBOOK_ROUTE,
        Component: AddBook
    },
    {
        path:ADDAUTHOR_ROUTE,
        Component: AddAuthor
    },
    {
        path:ADDTAG_ROUTE,
        Component: AddTag
    },
    {
        path:ADDSERIES_ROUTE,
        Component: AddSeries
    }    
]