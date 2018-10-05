import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Loading extends Component {
    constructor(props) {
        super(props)

        this.state = {
            text: 'Loading',
            speed: 300
        }
    }

    componentDidMount() {
        const { text, speed } = this.state
        const stopper = text + '...'

        this.interval = window.setInterval(() => {
            this.state.text === stopper
                ? this.setState({ text })
                : this.setState(prevState => ({ text: prevState.text + '.' }))
        }, speed)
    }

    componentWillUnmount() {
        window.clearInterval(this.interval)
    }

    render() {
        const { text } = this.state
        return <p className="loading">{text}</p>
    }
}

Loading.propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number
}

export default Loading
