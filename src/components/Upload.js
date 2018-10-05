import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { Alert, Button, Form, Input, InputGroup, InputGroupButton } from 'reactstrap'
import Loading from './Loading'
import { upload } from '../app.json'
import { getDatabase, getStorage } from '../utils/firebase'

class UploadButton extends Component {
    render() {
        const { uploading, onClick } = this.props

        return (
            <Button color="primary" onClick={onClick} disabled={uploading} size="lg">
                Upload
            </Button>
        )
    }
}

class DroppedFile extends Component {
    render() {
        const { file, tags } = this.props
        const { name, preview, size } = file

        return (
            <div className="dropped-file">
                <img src={preview} alt={name} />
                <p>
                    name: {name}
                    <br />
                    size: {size} bytes
                    <br />
                    tags: {tags.join(', ')}
                </p>
            </div>
        )
    }
}

class UploadAlert extends Component {
    render() {
        const { type } = this.props
        return <Alert color={type}>{type === 'info' ? <Loading /> : <h3>{upload.uploaded}</h3>}</Alert>
    }
}

class Upload extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: null,
            uploading: false,
            uploaded: false,
            tags: [],
            currentTag: ''
        }
    }

    onDrop = files => {
        const file = files[0]
        this.setState({
            file,
            tags: [],
            uploaded: false
        })
    }

    uploadFile() {
        const { file, tags } = this.state
        const filename = file.name
        const name = filename.split('.')[0]

        this.setState({ uploading: true })

        getStorage()
            .ref(filename)
            .put(file)
            .then(snapshot => {
                this.setState({ uploading: false, uploaded: true })

                getDatabase()
                    .ref('files/' + name)
                    .set({ filename, tags, url: snapshot.downloadURL })
            })
    }

    handleChange = event => {
        const value = event.target.value
        this.setState(() => ({ currentTag: value }))
    }

    handleSubmit = event => {
        event.preventDefault()
        if (this.state.currentTag === '') return

        const currentTags = this.state.tags
        currentTags.push(this.state.currentTag)

        this.setState({
            tags: currentTags,
            currentTag: ''
        })
    }

    render() {
        const { file, uploading, uploaded, tags, currentTag } = this.state

        return (
            <section>
                <h1>{upload.headline}</h1>

                <Dropzone className="dropzone" multiple={false} onDrop={this.onDrop.bind(this)}>
                    <p>{upload.dropzone}</p>
                </Dropzone>

                {file && (
                    <div>
                        <h2>{upload.dropped}</h2>
                        <DroppedFile file={file} tags={tags} />
                        <Form inline className="tag-form" onSubmit={this.handleSubmit.bind(this)}>
                            <InputGroup>
                                <Input
                                    id="tags"
                                    placeholder="Enter a Tag..."
                                    type="text"
                                    value={currentTag}
                                    onChange={this.handleChange.bind(this)}
                                />
                                <InputGroupButton>
                                    <Button>Add Tag</Button>
                                </InputGroupButton>
                            </InputGroup>
                        </Form>
                        <UploadButton uploading={uploading} onClick={this.uploadFile.bind(this)} />
                    </div>
                )}

                {uploading && <UploadAlert type="info" />}
                {uploaded && <UploadAlert type="success" />}
            </section>
        )
    }
}

Upload.propTypes = {
    file: PropTypes.object,
    url: PropTypes.string
}

export default Upload
