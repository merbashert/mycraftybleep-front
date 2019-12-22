import React from 'react'

import RandomForm from './RandomForm'
import Random from './Random'

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:8888'
} else {
    console.log('this is for heroku');
}

class RandomPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            randoms: []
        }
    }

    fetchRandom = () => {
        fetch(`${baseUrl}/randoms`)
        .then(data => data.json())
        .then(jData => {
            this.setState({randoms:jData})
        }).catch(err=>console.log(err))
    }

    handleCreateRandom = (createData) => {
        fetch(`${baseUrl}/randoms`, {
            body: JSON.stringify(createData),
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(createdRandom => {
            return createdRandom.json()
        })
        .then(json => {
            this.setState({
                randoms: json,
                action: 'create'
            })
        })
        .catch(err=>console.log(err))
    }

    handleUpdateRandom = (updateData) => {
        fetch(`${baseUrl}/randoms/${updateData.id}`, {
            body: JSON.stringify(updateData),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(updatedRandom => {
            this.setState({
                action: 'edit'
            })
            this.fetchRandom()
        }).catch(err=>console.log(err))
    }

    handleDeleteRandom = (id) => {
        fetch(`${baseUrl}/randoms/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        }).then(json => {
            this.setState({
                randoms: this.state.randoms.filter(random => random.id !== id)

            })
        }).catch(err=>console.log(err))
    }
    componentDidMount(){//loads right after the page does
        this.fetchRandom()
    }

render() {
    return (
        <div>
        <RandomForm
        handleCreateRandom={this.handleCreateRandom}
        formInputs={this.props.formInputs}

        />
        {this.state.randoms.map((randomData) => (
            <Random
            key={randomData.id}
            randomData={randomData}
            handleDeleteRandom={this.handleDeleteRandom}
            handleUpdateRandom={this.handleUpdateRandom}
            />
    ))}

        </div>
    )
}


}

export default RandomPage