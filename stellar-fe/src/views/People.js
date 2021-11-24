import React from "react"
import { Button, Heading5 } from "@stellar/design-system"
import PeopleContent from '../components/layout/Content'

export function People() {
   
    return (
        <div className=''>
            <Heading5>Add and view all your employees</Heading5>
            <PeopleContent />
        </div>
    )
}
