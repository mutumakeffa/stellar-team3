import React from "react"
import { Button, Heading5 } from "@stellar/design-system"
import { fetchTransactions } from "../methods/fetchTransactions";

export function Transactions() {
    
    
    return (
        <div className='Transaction__history'>
            <Heading5>View all your transactions</Heading5>

            <div className="Fetch__transactions">
                <Button >
                    fetch all transactions
                </Button>
                <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Adress</th>
                    <th>Unit </th>
                    <th>Amount </th>
                    <th>Type</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                        <td/>
                    </tr>
                </tbody>
            </table>
            </div>
        
        </div>
    )
}
