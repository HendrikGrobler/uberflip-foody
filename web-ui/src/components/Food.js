import React from 'react';
import axios from 'axios';
import SearchDropdown from './SearchDropdown';

import '../less/global.less';
import '../less/food.less';

export default class Food extends React.Component {

  state = {
    food: {},
    foodNutrients: []
  }

  async addNutrientToFood(nutrientId) {    
    const amountPerServing = parseInt(prompt('Amount per serving', 1));
    if (!amountPerServing || isNaN(amountPerServing) || amountPerServing < 1) {
      alert('Please enter an positive integer value');
      return;
    }

    const dataPoints = parseInt(prompt('Data points', 1));
    if (!dataPoints || isNaN(dataPoints) || dataPoints < 1) {
      alert('Please enter an positive integer value');
      return;
    }

    const footnote = prompt('Footnote', '');

    await axios.put(`${process.env.REACT_APP_PUBLIC_API_URL}/foods/${this.props.match.params.foodId}/nutrients/${nutrientId}`, {
      amountPerServing,
      dataPoints,
      footnote
    });

    const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/foods/${this.props.match.params.foodId}/nutrients/${nutrientId}`);

    this.setState({
      foodNutrients: [...this.state.foodNutrients, response.data]
    });
  }

  async searchNutrients(search) {
    const response = await axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/nutrients?search=${search}`)

    const nutrients = response.data || [];
    const availableNutrients = nutrients.filter((nutrient) => {
      for (const foodNutrient of this.state.foodNutrients) {
        if (foodNutrient.nutrientId === nutrient.id) {
          return false;
        }
      }
      return true;
    })

    return availableNutrients;
  }

  async removeNutrientFromFood(nutrientId) {
    await axios.delete(`${process.env.REACT_APP_PUBLIC_API_URL}/foods/${this.props.match.params.foodId}/nutrients/${nutrientId}`)
    
    const foodNutrients = this.state.foodNutrients.filter(foodNutrient => {
      return foodNutrient.nutrientId !== nutrientId;
    });

    this.setState({foodNutrients});
  }

  componentDidMount() {
    this.fetchFoodAndNutrients();
  }

  async fetchFoodAndNutrients() {
    const responses = await Promise.all([
      axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/foods/${this.props.match.params.foodId}`),
      axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/foods/${this.props.match.params.foodId}/nutrients`) 
    ]);
    this.setState({
      food: responses[0].data,
      foodNutrients: responses[1].data
    });
  }

  render() {
    return (
      <div>
        <h1>Food information</h1>
        <p>ID: {this.state.food.id}</p>
        <p>Description: {this.state.food.description}</p>
        <p>Publication Date: {this.state.food.publicationDate}</p>

        <SearchDropdown
          inputId='nutrients-search'
          inputPlaceholder='Search for nutrients...'
          dropdownId='searched-nutrients'
          optionClassName='nutrient'
          optionTextField='name'
          optionIdField='id'
          onInputChange={(search) => this.searchNutrients(search)}
          onOptionClick={(nutrientId) => this.addNutrientToFood(nutrientId)}
        />

        <h2>Nutrients</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Unit Name</th>
              <th>Nutrient Code</th>
              <th>Rank</th>
              <th>Amount per Serving</th>
              <th>Data Points</th>
              <th>Footnote</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.foodNutrients.map((foodNutrient, index) =>
              <tr key={foodNutrient.nutrientId} data-index={index}>
                <td>{foodNutrient.nutrientId}</td>
                <td>{foodNutrient.nutrient.name}</td>
                <td>{foodNutrient.nutrient.unitName}</td>
                <td>{foodNutrient.nutrient.nutrientCode}</td>
                <td>{foodNutrient.nutrient.rank}</td>
                <td>{foodNutrient.amountPerServing}</td>
                <td>{foodNutrient.dataPoints}</td>
                <td>{foodNutrient.footnote}</td>
                <td><button onClick={() => this.removeNutrientFromFood(foodNutrient.nutrientId)}>Remove</button></td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
