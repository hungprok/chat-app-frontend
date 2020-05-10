import React from 'react'

export default function Header(props) {
    return (
        <div>
            {props.name? props.name : "no user name"}
        </div>
    )
}
