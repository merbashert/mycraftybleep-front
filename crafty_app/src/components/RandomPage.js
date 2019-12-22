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
            this.props.handleView('allRandom')
            this.setState({
                randoms: json
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
            this.props.handleView('allRandom')
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
        handleUpdateRandom={this.handleUpdateRandom}
        view={this.props.view}
        />
        {this.state.randoms.map((randomData) => (
            <Random
            key={randomData.id}
            randomData={randomData}
            handleDeleteRandom={this.handleDeleteRandom}
            />
    ))}

        </div>
    )
}


}

export default RandomPage
