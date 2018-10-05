import React, { Component } from 'react'
import { footer } from '../app.json'

class Footer extends Component {
    render() {
        return <footer className="app-footer fixed-bottom">{footer.copyright}</footer>
    }
}

export default Footer
