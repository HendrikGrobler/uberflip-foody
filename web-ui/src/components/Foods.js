import React from 'react';
import axios from 'axios';

import '../less/global.less';
import '../less/foods.less'

export default class Foods extends React.Component {
  state = {
    foods: [],
    page: 1,
    pageSize: 15,
    count: 0,
    pages: 1,
    isLoading: false
  }

  componentDidMount() {
    this.fetchFoods();
  }

  async fetchFoods() {
    await this.setState({isLoading: true});
    const responses = await Promise.all([
      axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/foods?page=${this.state.page}&limit=${this.state.pageSize}`),
      axios.get(`${process.env.REACT_APP_PUBLIC_API_URL}/foods/count`)
    ]);
    const foods = responses[0].data;
    const count = parseInt(responses[1].data) || 0;
    const pages = Math.ceil(count / this.state.pageSize);
    this.setState({
      foods,
      count,
      pages,
      isLoading: false
    });
  }

  canPaginatePrevious() {
    return this.state.page > 1;
  }

  async handlePaginationFirstClick() {
    if (!this.canPaginatePrevious()) {
      return;
    }
    await this.setState({page: 1});
    this.fetchFoods();
  }

  async handlePaginationPreviousClick() {
    if (!this.canPaginatePrevious()) {
      return;
    }
    await this.setState({page: this.state.page - 1});
    this.fetchFoods();
  }

  canPaginateNext() {
    return this.state.page < this.state.pages;
  }

  async handlePaginationNextClick() {
    if (!this.canPaginateNext()) {
      return;
    }
    await this.setState({page: this.state.page + 1});
    this.fetchFoods();
  }

  async handlePaginationLastClick() {
    if (!this.canPaginateNext()) {
      return;
    }
    await this.setState({page: this.state.pages});
    this.fetchFoods();
  }

  renderTable() {
    return (<table>
      <thead>
        <tr><th>ID</th><th>Description</th><th>Publication Date</th><th>Actions</th></tr>
      </thead>
      <tbody>
        {this.state.foods.map((food, index) => 
          <tr key={food.id} data-index={index}>
            <td>{food.id}</td>
            <td>{food.description}</td>
            <td>{food.publicationDate}</td>
            <td><a href={`/foods/${food.id}`}>Edit</a></td>
          </tr>)}
      </tbody>
    </table>);
  }

  renderPagination() {
    const canPaginatePrevious = this.canPaginatePrevious();
    const previousLinkClasses = [];
    if (!canPaginatePrevious) {
      previousLinkClasses.push('disabled');
    }
    const canPaginateNext = this.canPaginateNext();
    const nextLinkClasses = [];
    if (!canPaginateNext) {
      nextLinkClasses.push('disabled');
    }
    const itemsStart = ((this.state.page - 1) * this.state.pageSize) + 1;
    const itemsEnd = itemsStart + (this.state.foods.length - 1);
    return (
      <div className={'pagination-container'}>
        <a className={previousLinkClasses.join(' ')} onClick={() => this.handlePaginationFirstClick()}>First</a>
        &nbsp;|&nbsp;
        <a className={previousLinkClasses.join(' ')} onClick={() => this.handlePaginationPreviousClick()}>Prev</a>
        &nbsp;|&nbsp;
        <span>Showing items {itemsStart} - {itemsEnd} of {this.state.count}</span>
        &nbsp;|&nbsp;
        <span>Page {this.state.page} of {this.state.pages}</span>
        &nbsp;|&nbsp;
        <a className={nextLinkClasses.join(' ')} onClick={() => this.handlePaginationNextClick()}>Next</a>
        &nbsp;|&nbsp;
        <a className={nextLinkClasses.join(' ')} onClick={() => this.handlePaginationLastClick()}>Last</a>
      </div>
    );
  }

  renderNoResults() {
    return (<p>No foods</p>)
  }

  renderLoading() {
    return (
      <div className='loading'>
        <img src='spinner.gif'></img>
      </div>
    );
  }

  render() {
    const loading = this.renderLoading();
    const noResults = this.renderNoResults();
    const table = this.renderTable();
    const pagination = this.renderPagination();
    
    return (
      <div className='foody-foods-component'>
        <h1>Foods</h1>
        {this.state.isLoading && loading}
        {!this.state.isLoading && !this.state.foods.length && noResults}
        {!this.state.isLoading && this.state.foods.length && table}
        {!this.state.isLoading && this.state.foods.length && pagination}
      </div>
    )
  }
}
