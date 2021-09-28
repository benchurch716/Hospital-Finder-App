import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useState } from 'react';
// Hopsital array for testing
const testList = [
  {
      "name": "College of Veterinary Medicine",
      "address": "Magruder Hall, 700 Southwest 30th Street, Corvallis"
  },
  {
      "name": "Good Samaritan Regional Medical Center",
      "address": "3600 Northwest Samaritan Drive, Corvallis"
  },
  {
      "name": "Samaritan Heart Center",
      "address": "& 100B, 3640 Northwest Samaritan Drive Suites 100A, Corvallis"
  }
]


//Componet for a form
class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    var address = "http://localhost:8080/?address=" + this.state.value;
    let data;
    // GET request using fetch with error handling
    fetch(address)
        .then(async response => {
            data = await response.json();
            console.log(data);

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            this.setState({ totalReactPackages: data.total })
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
    
    event.preventDefault();
    return (
      <DisplayHospital hospitals = {data} />
    )
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Address:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form> 
      </div>  
    );
  }
}


// Function that takes in an array of hopsitals and displays them
function DisplayHospital(props){
  const hospitals = props.hospitals
  const hospitalList = hospitals.map((hospital) =>
    <li>{hospital.name} - {hospital.address}</li>
  );
  return(
    <div>
      <h3> Results:</h3>
      <p>Closest to Farthest</p>
      <ol>{hospitalList}</ol>
    </div>
  )
};

//Main function to render the compents into one page
function App() {
  const [hospitals, setHostpitals] = useState(null);
  return (
    <div>
      <AddressForm /> 
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root')
);
