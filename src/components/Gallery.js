import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'
import Loading from './Loading'
import { gallery } from '../app.json'
import { getDatabase } from '../utils/firebase'

class GalleryItem extends Component {
    render() {
        const { filename, url, tags } = this.props.image

        return (
            <Card className="gallery-item">
                <CardImg top src={url} alt={filename} />
                <CardBody>
                    <CardTitle>{filename}</CardTitle>
                    {tags && <CardText>{tags.join(', ')}</CardText>}
                </CardBody>
            </Card>
        )
    }
}

class GalleryGrid extends Component {
    render() {
        const { images } = this.props

        return (
            <div className="gallery-grid">
                {images.map(image => <GalleryItem key={image.filename} image={image} />)}
                {images.map(image => <GalleryItem key={image.filename} image={image} />)}
                {images.map(image => <GalleryItem key={image.filename} image={image} />)}
            </div>
        )
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            images: []
        }
    }

    componentWillMount() {
        this.setState({ loading: true })
    }

    componentDidMount() {
        getDatabase()
            .ref('files')
            .once('value')
            .then(snapshot => {
                const images = []
                snapshot.forEach(childSnapshot => {
                    images.push(childSnapshot.val())
                })
                this.setState({ images, loading: false })
            })
    }

    render() {
        const { loading, images } = this.state

        return (
            <section>
                <h1>{gallery.headline}</h1>
                {loading ? <Loading /> : <GalleryGrid images={images} />}
            </section>
        )
    }
}

Gallery.propTypes = {
    loading: PropTypes.bool,
    images: PropTypes.array
}

export default Gallery
