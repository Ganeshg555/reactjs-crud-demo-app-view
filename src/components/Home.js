import React from "react";
import axios from "axios";
import { BASE_URL } from "../constants/ApiConstants";
import { UserList } from "./UserList";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                id: '',
                username: '',
                password: '',
                source: 'App'
            },
            successMessage: '',
            formerror: '',
            btnAddUserTitle: 'Add User',
            response: {
                status: '',
                message: '',
                responseData: []
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateClicked = this.updateClicked.bind(this);
        this.deleteClicked = this.deleteClicked.bind(this);
        this.loadUsersData = this.loadUsersData.bind(this);
        this.handleImport = this.handleImport.bind(this);
    }

    handleChange = event => {
        if(event.target.name === 'username') 
            this.setState({user: {...this.state.user, username: event.target.value}});
        if(event.target.name === 'password')
            this.setState({user: {...this.state.user, password: event.target.value}});
    }

    updateClicked = userData => {
        this.setState({
            user: userData,
            btnAddUserTitle: 'Update User'
        });
    }

    deleteClicked = user => {
        axios.delete(BASE_URL + '/' + user.id)
        .then(resp =>{
            this.loadUsersData();
        })
        .catch(error => {
            this.setState({
                successMessage: '',
                formerror: ''
            });
        });
    }

    handleImport = user => {
        axios.post(BASE_URL + '/import')
        .then(resp =>{
            this.loadUsersData();
        })
        .catch(error => {
            this.setState({
                successMessage: '',
                formerror: ''
            });
        });
    }

    componentDidMount = () => {
        this.loadUsersData();
    }

    loadUsersData = () => {
        axios.get(BASE_URL)
        .then(resp =>{
            this.setState({
                response: resp.data
            });
            console.log(resp.data)
        })
        .catch(error => {
            this.setState({
                successMessage: '',
                formerror: ''
            });
        });
    }

    handleSubmit = event => {
        let headers = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
        if(this.state.btnAddUserTitle === 'Add User') {
            axios.post(BASE_URL, this.state.user, headers)
            .then(resp =>{
                let responseData = resp.data;
                if(responseData.status === 'OK') {
                    this.setState({
                        user: {...this.state.user, username: '', password: ''},
                        successMessage: 'User has been created successfully',
                        formerror: ''
                    });
                }
                else 
                    this.setState({
                        successMessage: '',
                        formerror: 'Failed to create new user'
                    });
            })
            .then(resp => {
                this.loadUsersData();
            })
            .catch(error => {
                this.setState({
                    successMessage: '',
                    formerror: 'Failed to create new user'
                });
            });
        } else {
            axios.put(BASE_URL, this.state.user, headers)
            .then(resp =>{
                let responseData = resp.data;
                if(responseData.status === 'OK') {
                    this.setState({
                        user: {...this.state.user, username: '', password: ''},
                        successMessage: 'User has been updated successfully',
                        formerror: ''
                    });
                    this.loadUsersData();
                } 
                else
                    this.setState({
                        successMessage: '',
                        formerror: 'Failed to update user record'
                    });
            })
            .catch(error => {
                this.setState({
                    successMessage: '',
                    formerror: 'Failed to update user record'
                });
            });
        }
        event.preventDefault();
    }

    render() {
        let userData;
        if(this.state.response.responseData.length == 0)
            userData = <label className="text text-danger">User not found!</label>
        else
            userData = <UserList 
                            users={this.state.response.responseData} 
                            onUpdateClick={this.updateClicked} 
                            onDeleteClick={this.deleteClicked} 
                            />;
        return(
           <div>
            <div className="row">
                <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div className="jumbotron text-center">
                        <h1>CRUD Application Demo</h1>
                        </div>
                        <label className="font-weight-bold">Add User</label>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username"
                                        required 
                                        value={this.state.user.username}
                                        onChange={this.handleChange}
                                        placeholder="Enter username" 
                                        name="username" />
                                </div>
                                <div className="col">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Enter password" 
                                        required
                                        value={this.state.user.password}
                                        onChange={this.handleChange}
                                        name="password" />
                                </div>
                                <div className="col">
                                    <input 
                                        type="submit" 
                                        value={this.state.btnAddUserTitle}
                                        className="btn btn-primary"
                                        />
                                </div>
                                <div className="col">
                                    <label 
                                    className="btn btn-dark"
                                    onClick={this.handleImport}
                                    >Import</label>
                                </div>
                            </div>
                        </form>
                        { this.state.successMessage != '' && <label className="text text-success">{this.state.successMessage}</label> }
                        { this.state.formerror != '' && <label className="text text-danger">{this.state.formerror}</label> }
                        <hr/>
                        <label className="font-weight-bold">User List</label>
                        <br />
                         {userData}
                    </div>
                <div className="col-sm-2"></div>
            </div>
           </div> 
        )
    }
}

export default Home;