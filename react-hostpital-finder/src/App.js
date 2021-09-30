import Header from "./componets/Header";
import AddressSearch from "./componets/AddressSearch";
import Hospitals from "./componets/Hospitals";
import { useState } from "react";

function App() {
  const [hospitals, setHostpitals] = useState([
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
  
  ]);

  const searchHopsitals = (address) => {
    fetchHospitals(address);
  };

  const fetchHospitals = async (address) => {
    const res = await fetch(
      "http://localhost:8080/?address=" + address.searchText
    );
    const data = await res.json();
    setHostpitals(data);
  }
  
  return (
    <div className='container'>
      <Header />
      <AddressSearch onClick={searchHopsitals} />
      <Hospitals hospitals={hospitals} />
    </div>
  );
}

export default App;
