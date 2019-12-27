import React from 'react'

class FabricForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            length: props.fabricData.length,
            main_color: props.fabricData.main_color,
            tags: props.fabricData.tags,
            picture: props.fabricData.picture,
            id: props.fabricData.id
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id] : e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleUpdateFabric(this.state)
    }


    render () {
        return (
            <form onSubmit={this.handleSubmit}>
            <label>
            Length:
            <input type="text" placeholder="Length" id="length" value={this.state.length} onChange={this.handleChange}/>
            </label>

            <label id="main_color">
            Main Color:
            <select value={this.state.main_color} onChange={this.handleChange} id="main_color">
            <option main_color="red">red</option>
            <option main_color="orange">orange</option>
            <option main_color="yellow">yellow</option>
            <option main_color="green">green</option>
            <option main_color="blue">blue</option>
            <option main_color="purple">purple</option>
            <option main_color="pink">pink</option>
            <option main_color="brown">brown</option>
            <option main_color="black">black</option>
            <option main_color="white">white</option>
            </select>
            </label>
            <label>
            Tags:
            <input type="text" placeholder="Tags" id="tags" value={this.state.tags} onChange={this.handleChange}/>
            </label>
            <label id="picture">
            Picture:
            <input type="text" id="picture" value={this.state.picture} onChange={this.handleChange}></input>
            </label>
            <input type="submit" value="Apply changes" onClick={this.props.handleClose}/>
            </form>
        )
    }
}

export default FabricForm