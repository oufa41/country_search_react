import React, { Component } from 'react';
class GetOnlinePosts extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchString: "",
            error : null,
            isLoaded : false,
            countries : []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // I will use fake api from jsonplaceholder website
        // this return 100 posts

        fetch('http://52.43.89.167:8000/countries')
        .then( response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded : true,
                    countries : result,
                });
            })


    }
    handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }
    render() {

    const {error, isLoaded, countries} = this.state;
    let _countries = this.state.countries;

    console.log(_countries);
    let search = this.state.searchString.trim().toLowerCase();
    if (search.length > 0) {
      _countries = _countries.filter(function(country) {
      let searchItem = country.code + country.name;
      return searchItem.toLowerCase().match(search);
      });
    }

    console.log(countries);
    if(error){
        return <div>Error in loading</div>
    }else if (!isLoaded) {
        return <div>Loading ...</div>
    }else{
        return(
            <div>
            <input
              type="text"
              value={this.state.searchString}
              ref="search"
              onChange={this.handleChange}
              placeholder="Country"
              />
                <ol className="item">
                {
                    _countries.map(country => (
                        <li key={country.id} align="start">
                            <div>
                               {country.code}: {country.name}
                            </div>
                        </li>
                    ))
                }
                </ol>
            </div>
        );
    }

}
  }
 export default GetOnlinePosts;
