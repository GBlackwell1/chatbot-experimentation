import axios from 'axios';
import React, { Component } from 'react';

class Post extends Component {
    constructor(props) {
        super(props);
        const { steps } = this.props;
        const { name, gender, weight, diet } = steps;

        this.state = { name, gender, weight, diet };
    }

    componentDidMount() {
        //Create object to export
        const userObject = {
            name: this.state.name.value,
            gender: this.state.gender.value,
            weight: this.state.weight.value,
            diet: this.state.diet.value
        };
        
        axios.post('/api', userObject) //Post object to api
             .then(res => {console.log(res.status)}) //Then log axios response status to console
             .catch(function(error) {console.log(error)}); //Then catch any errors and log to console
    };
    render() {
        return (
            <div>Your data was submitted!</div>
        );
    }
}

export default Post;