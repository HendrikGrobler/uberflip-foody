import React from 'react';
import axios from 'axios';
import {toast} from 'toast-notification-alert'
import SearchDropdown from './SearchDropdown';

import '../less/global.less';
import '../less/user.less';

export default class Users extends React.Component {

  state = {
    user: {},
    userFoods: [],
    updatedName: '',
    updatedEmail: ''
  }

  async addFood(foodId) {
    const exists = this.state.userFoods.filter(existingUserFood => {
      return existingUserFood.foodId === foodId;
    });

    if (exists.length) {
      alert('Food already in the list');
      return;
    }
    
    const servingsPerWeek = parseInt(prompt('Servings per week', 1));
    if (!servingsPerWeek || isNaN(servingsPerWeek) || servingsPerWeek < 1) {
      alert('Please enter an positive integer value');
      return;
    }

    await axios.put(`${process.env.REACT_APP_PUBLIC_API_URL}/users/${this.props.match.params.userId}/foods/${foodId}`, {
      servingsPerWeek
    });

    const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/users/${this.props.match.params.userId}/foods/${foodId}`);

    this.setState({
      userFoods: [...this.state.userFoods, response.data]
    });
  }

  async searchFood(search) {
    const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/foods?search=${search}`)
    return response.data ?? undefined;
  }

  async removeFood(foodId) {
    await axios.delete(`${process.env.REACT_APP_PUBLIC_API_URL}/users/${this.props.match.params.userId}/foods/${foodId}`)
    
    const userFoods = this.state.userFoods.filter(userFood => {
      return userFood.foodId !== foodId;
    });

    this.setState({userFoods});
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/users/${this.props.match.params.userId}`).then((response) => {
      const user = response.data;
      this.setState({
        user,
        updatedName: user.name,
        updatedEmail: user.email
      });
    })
    
    axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/users/${this.props.match.params.userId}/foods`).then((response) => {
      this.setState({userFoods: response.data});
    });
  }

  handleNameChange(name) {
    this.setState({updatedName: name});
  }

  handleEmailChange(email) {
    this.setState({updatedEmail: email});
  }

  async handleNameOrEmailBlur() {
    if (!this.state.updatedName) {
      await this.setState({updatedName: this.state.user.name});
      alert('Name cannot be empty');
      return;
    }

    if (!this.state.updatedEmail) {
      await this.setState({updatedEmail: this.state.user.email});
      alert('Email cannot be empty');
      return;
    }

    // @todo Validate email

    const nameChanged = this.state.updatedName !== this.state.user.name
    const emailChanged = this.state.updatedEmail !== this.state.user.email
    if (!nameChanged && !emailChanged) {
      // Nothing to update
      return;
    }

    const response = await axios.patch(`${process.env.REACT_APP_PUBLIC_API_URL}/users/${this.props.match.params.userId}`, {
      name: this.state.updatedName,
      email: this.state.updatedEmail
    });

    const user = response.data;
    this.setState({
      user,
      updatedName: user.name,
      updatedEmail: user.email
    });

    toast.show({title: 'Saved!', position: 'topcenter', type: 'info'});
  }

  render() {
    return (
      <div>
        <h1>User information</h1>
        <p>ID: {this.state.user.id}</p>
        <p>Name: <input type="text" value={this.state.updatedName} onChange={(event) => this.handleNameChange(event.target.value)} onBlur={() => this.handleNameOrEmailBlur()}/></p>
        <p>Email: <input type="email" value={this.state.updatedEmail} onChange={(event) => this.handleEmailChange(event.target.value)} onBlur={() => this.handleNameOrEmailBlur()}/></p>

        <SearchDropdown
          inputId='food-search'
          inputPlaceholder='Search for foods...'
          dropdownId='searched-foods'
          optionClassName='food'
          optionTextField='description'
          optionIdField='id'
          onInputChange={this.searchFood.bind(this)}
          onOptionClick={this.addFood.bind(this)}
        />

        <h2>Foods</h2>
        <table>
          <thead>
            <tr><th>ID</th><th>Description</th><th>Publication date</th><th>Weekly servings</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {this.state.userFoods.map(userFood =>
              <tr key={userFood.id}>
                <td>{userFood.food.id}</td>
                <td>{userFood.food.description}</td>
                <td>{userFood.food.publicationDate}</td>
                <td>{userFood.servingsPerWeek ?? 0}</td>
                <td><button onClick={() => this.removeFood(userFood.food.id)}>Remove</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
