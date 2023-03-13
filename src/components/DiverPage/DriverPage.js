import React, {useState, Fragment} from 'react'
import data from "./appointments-mock-data.json";
import Table from 'react-bootstrap/Table';


export default function DriverPage() {

    const [appointments, setAppointments] = useState(data); 

    return (
        <div className="app-container">
            <h1>Driver Page</h1>
            <h6>Driver Name: {appointments[0].driverName}</h6>
            <h6>Collection Date: {appointments[0].collectionDate}</h6>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Store</th>
                        <th>Food Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <Fragment>
                            <tr>
                                <td rowSpan={appointment.food.length + 1}>{appointment.storeName}</td>
                            </tr>
                            {appointment.food.map((f) => (
                                <tr>
                                    <td>{f.type}</td>
                                    <td>{f.amount}</td>
                                </tr>
                            ))}
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
