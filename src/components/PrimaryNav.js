import React from 'react'
import { NavLink } from 'react-router-dom'
import { Nav, NavItem } from 'reactstrap'
import { header } from '../app.json'

export default function PrimaryNav() {
    return (
        <Nav className="ml-auto" navbar>
            {header.menu.map(item => (
                <NavItem key={item.text}>
                    <NavLink exact className="nav-link" to={item.url}>
                        {item.text}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
    )
}
