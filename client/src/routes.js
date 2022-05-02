import { ABOUT_ROUTE, ADMIN_AUTHOR_ROUTE, ADMIN_BOOK_ROUTE, ADMIN_COVER_ROUTE, ADMIN_FORMAT_ROUTE, ADMIN_ORDER_ROUTE, ADMIN_PAGE_ROUTE, ADMIN_ROUTE, ADMIN_SERIES_ROUTE, ADMIN_TAG_ROUTE, AUTHOR_ROUTE, BOOKS_ROUTE, BOOKTAG_ROUTE, Cart_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, ORDER_ROUTE, REGISTRATION_ROUTE } from "./components/utils/consts";
import About from "./pages/About";
import AddAuthor from "./pages/AddAuthor";
import AddBook from "./pages/AddBook";
import AddCover from "./pages/Addcover";
import AddFormat from "./pages/AddFormat";
import AddSeries from "./pages/AddSeries";
import AddTag from "./pages/AddTag";
import Admin from "./pages/Admin";
import AdminAuthor from "./pages/AdminAuthor";
import AdminBook from "./pages/AdminBook";
import AdminCover from "./pages/AdminCover";
import AdminFormat from "./pages/AdminFormat";
import AdminOrder from "./pages/AdminOrder";
import AdminSeries from "./pages/AdminSeries";
import AdminTag from "./pages/AdminTag";
import Auth from "./pages/Auth";
import Author from "./pages/Author";
import AuthorPage from "./pages/AuthorPage";
import Bookid from "./pages/Bookid";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Main from "./pages/Main";
import Order from "./pages/Order";
import Pages from "./pages/Pages";


export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ADMIN_PAGE_ROUTE,
        Component: Pages
    },
    {
        path: ADMIN_BOOK_ROUTE,
        Component: AdminBook
    },
    {
        path: ADMIN_BOOK_ROUTE + '/:isbn',
        Component: AddBook
    },
    {
        path: ADMIN_FORMAT_ROUTE,
        Component: AdminFormat
    },
    {
        path: ADMIN_FORMAT_ROUTE + '/:name',
        Component: AddFormat
    },
    {
        path: ADMIN_AUTHOR_ROUTE,
        Component: AdminAuthor
    },
    {
        path: ADMIN_AUTHOR_ROUTE + '/:fullname',
        Component: AddAuthor
    },
    {
        path: ADMIN_SERIES_ROUTE,
        Component: AdminSeries
    },
    {
        path: ADMIN_SERIES_ROUTE + '/:seriesname',
        Component: AddSeries
    },
    {
        path: ADMIN_TAG_ROUTE,
        Component: AdminTag
    },
    {
        path: ADMIN_TAG_ROUTE + '/:tagname',
        Component: AddTag
    },
    {
        path: ADMIN_COVER_ROUTE,
        Component: AdminCover
    },
    {
        path: ADMIN_COVER_ROUTE + '/:cover',
        Component: AddCover
    } ,
    {
        path: ADMIN_ORDER_ROUTE+'/:id',
        Component: AdminOrder
    },    

]

export const authRoutes = [
    {
        path: Cart_ROUTE,
        Component: Cart
    }   

]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    }, 
    {
        path: ABOUT_ROUTE,
        Component: About
    }, 
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }, 
    {
        path: LOGIN_ROUTE,
        Component: Auth
    }, 

    {
        path: BOOKS_ROUTE,
        Component: Books
    }, 
    {
        path: BOOKTAG_ROUTE + '/:tag',
        Component: Books
    }, 

    {
        path: BOOKS_ROUTE  + '/:ISBN',
        Component: Bookid
    }, 
    {
        path: AUTHOR_ROUTE,
        Component: Author
    }, 

    {
        path: AUTHOR_ROUTE  + '/:fullname',
        Component: AuthorPage
    }, 
    {
        path: ORDER_ROUTE,
        Component: Order
    },  
    
   
]