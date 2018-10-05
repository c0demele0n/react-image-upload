import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Upload from './Upload'
import Gallery from './Gallery'
import { initFirebase } from '../utils/firebase'

class App extends Component {
    constructor(props) {
        super(props)
        initFirebase()
    }

    render() {
        return (
            <Router>
                <div className="app">
                    <Header />

                    <main className="app-content container">
                        <Switch>
                            <Route exact path="/" component={Upload} />
                            <Route path="/gallery" component={Gallery} />
                            <Route render={() => <p>Not found</p>} />
                        </Switch>
                    </main>

                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App
