import BootstrapTable from "react-bootstrap-table-next";

const BookTable = ({ books }) => {
    function List (authors)
    {
        
        let buf = []
        authors?.map(author => buf.push(author.fullname))

        if (!authors?.length) {
            return "Авторы не указаны"

        }
        return buf.toString()
    };
    
    books.map(book => book.authors=List(book.authors))

    const columns = [
        { dataField: "isbn", text: "ISBN" },
        { dataField: "title", text: "Название" },
        { dataField: "authors", text: "Авторы" }
    ]
    
    return (
        <div className="enter">
            <BootstrapTable
                keyField="isbn"
                data={books}
                columns={columns}
            />



        </div>
    )
};

export default BookTable;