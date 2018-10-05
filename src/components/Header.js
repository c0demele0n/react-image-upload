import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from 'reactstrap'
import PrimaryNav from './PrimaryNav'
import { header } from '../app.json'

class Header extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        const { isOpen } = this.state

        return (
            <header className="app-header">
                <Navbar color="faded" dark expand="md">
                    <NavbarBrand href="/">{header.title}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle.bind(this)} />
                    <Collapse isOpen={isOpen} navbar>
                        <PrimaryNav />
                    </Collapse>
                </Navbar>
            </header>
        )
    }
}

Header.propTypes = {
    isOpen: PropTypes.bool
}

export default Header
