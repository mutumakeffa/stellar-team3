import React from "react"
import { Button, Heading5 } from "@stellar/design-system"
import { fetchTransactions } from "../methods/fetchTransactions";

export function Transactions() {
   
    return (
        <div className='Transaction__history'>
            <Heading5>View all your transactions</Heading5>

            <div className="Fetch__transactions">
                <Button onClick={fetchTransactions()}>
                    fetch all transactions
                </Button>
            </div>
        
        </div>
    )
}
