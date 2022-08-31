import React, { Component } from 'react';
import { app, database } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

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
            diet: this.state.diet.value,
        };
        const dbInstance = collection(database, 'users');
        addDoc(dbInstance, userObject)
        .then(() => {
            alert('Data Sent')
        })
        .catch(err => {
            alert(err.message)
        });
    };
    render() {
        return (
            <div>Your data was submitted!</div>
        );
    }
}

export default Post;