import React from "react";
import "./SearchBar.css";


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      location: "",
      sortBy: "best_match"

    };
    this.sortByOptions = {
      "Best Match": "best_match",
      "Highest Rated": "rating",
      "Most Reviewed": "review_count"
    };
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return "active";
    } 
    return "";
    //this.state.sortBy === sortByOption ? "active" : ""; -> raises ESLint error, can be fixed w/ if/else statement or disabling no-unused-expressions
  }

  handleSortByChange = (sortByOption) => {
    this.props.searchYelp(this.state.term, this.state.location, sortByOption);
    this.setState({sortBy: sortByOption});
  }

  handleTermChange = (e) => {
    this.setState({term: e.target.value});
  }

  handleLocationChange = (e) => {
    this.setState({location: e.target.value});
  }

  handleSearchClick = (e) => {
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    e.preventDefault(); //to prevent the default action of clicking a link from triggering at the end of the method
  }

  handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      e.preventDefault();
    }
  }

  renderSortByOptions = () => {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];
      return <li key={sortByOptionValue} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)}>{sortByOption}</li>
    });
  }

  render() {
    return (
      <div className="SearchBar" onKeyPress={this.handleSearchEnter}>
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearchClick} href="foo" >Let's Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar;