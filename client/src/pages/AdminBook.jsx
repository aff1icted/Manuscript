import { useEffect, useState } from "react";
import '../styles/Admcss.css'
import { Loader } from "../components/UI/Loader";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import BookTable from "../components/BookTable";




function AdminBook() {
    const [loading, setLoading] = useState(true)
    const [books, setBooks] = useState([])


    async function fetchbook() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/book`) 
        console.log('data',response.data)
        response.data.map(book => book.authors=List(book.authors))                    
        setBooks(response.data)
    }
    

    function List (authors)
    {
        let buf = []
        authors?.map(author => buf.push(author.fullname))

        if (!authors?.length) {
            return "Авторы не указаны"

        }        
        return buf.toString()
    };

    useEffect(() => {
        setTimeout(() => {
            fetchbook().finally(() => setLoading(false))
        }, 1000);
    }, [])


    const columns = [
        { dataField: "isbn", text: "ISBN" },
        { dataField: "title", text: "Название" },
        { dataField: "authors", text: "Авторы" }
    ]


    if (loading) {
        return <Loader />
    }
    return (
        <div className="enter">
            <BootstrapTable
                keyField="isbn"
                data={books}
                columns={columns}
            />   
        </div>
    )
}

export default AdminBook;