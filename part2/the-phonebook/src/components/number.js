import React, { useState } from 'react'

const Number = ({name, number}) => {
    return (
        <li>
        {name} {number}
        </li>
    )
}

export default Number