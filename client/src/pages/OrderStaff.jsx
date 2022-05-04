import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"

import Footer from "../components/UI/Footer"
import { Loader } from "../components/UI/Loader"
import NavBar from "../components/UI/NavBar"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";

import { useHistory, useParams } from "react-router-dom";

const OrderStaff = observer(() => {
    const orderid = useParams().id
    const [loading, setLoading] = useState(true)
    const [staff, setStaff] = useState([])
    const [sum, setSum] = useState(0)


    async function fetchstaff() {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/staff`, { params: { orderid } })
        let s = 0
        response.data?.map(staff => s = s + (staff.book.price * staff.amount))
        setSum(s)

        setStaff(response.data)
    }



    useEffect(() => {
        fetchstaff().finally(() => setLoading(false))
    }, [])

    const columns = [
        { dataField: "id", text: "id" },
        { dataField: "book.title", text: "Название" },
        { dataField: "amount", text: "Количество" },
        { dataField: "book.price", text: "Цена экземпляра" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            // setCurrentOrder(row.id)
        }
    }


    if (loading) {
        <Loader />
    }
    return (
        <div>
            <div className="content">
                <NavBar />

                <div>
                    <BootstrapTable
                        keyField="id"
                        data={staff}
                        columns={columns}
                        hover="true"
                        selectRow={selectRow}
                        rowEvents={rowEvents}
                    />
                    Сумма:{sum}

                </div>


            </div>
            <Footer />
        </div>

    )
})

export default OrderStaff;