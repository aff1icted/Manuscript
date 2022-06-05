import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "../index";
import Footer from "../components/UI/Footer"
import { Loader } from "../components/UI/Loader"
import NavBar from "../components/UI/NavBar"
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import { USERORDER_ROUTE } from "../components/utils/consts";


const UserOrder = observer(() => {
    const hist = useHistory()
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [emptyCart, setEmptyCart] = useState(true)
    const [orders, setOrders] = useState([])



    async function fetchorders(user) {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/order`, { params: { user } })
        if (response.data.length > 0) {
            setOrders(response.data)
        } else {
            setEmptyCart(false)
        }

    }

    useEffect(() => {
        fetchorders(user.user.username).finally(() => setLoading(false))
    }, [])

    const columns = [
        { dataField: "id", text: "Номер" },
        { dataField: "createdAt", text: "Дата оформления" },
        { dataField: "status", text: "Статус" }
    ]

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        bgColor: '#00BFFF',
        hideSelectColumn: true
    };

    const rowEvents = {
        onClick: (e, row) => {
            hist.push(USERORDER_ROUTE+`/${row.id}`)
            //setCurrentOrder(row.id)
        }
    }


    if (loading) {
        <Loader />
    }
    return (
        <div>
            <div className="col-10 content">
                <NavBar />
                {emptyCart ?
                    <div className="col-5" style={{paddingTop: "20px", paddingBottom:"20px"}}>
                        <BootstrapTable
                            keyField="id"
                            data={orders}
                            columns={columns}
                            hover="true"
                            selectRow={selectRow}
                            rowEvents={rowEvents}
                        />

                    </div>
                    :
                    <div style={{paddingTop:"30px", fontSize: "20px"}}>
                        Нет оформленных заказов
                    </div>
                }

            </div>
            <Footer />
        </div>

    )
})

export default UserOrder;