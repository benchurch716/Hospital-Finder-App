import Header from "./componets/Header";
import AddressSearch from "./componets/AddressSearch";
import Hospitals from "./componets/Hospitals";
import { useState } from "react";

function App() {
  const [hospitals, setHostpitals] = useState([]);
  const [searchText, setSearchText] = useState([]);

  const searchHopsitals = (address) => {
    setSearchText(address.searchText)
    fetchHospitals(address)
  };

  const fetchHospitals = async (address) => {
    const res = await fetch(
      "http://localhost:8080/?address=" + address.searchText
    );
    const data = await res.json();
    setHostpitals(data);
  };

  return (
    <div className="container">
      <Header />
      <AddressSearch onClick={searchHopsitals} />
      <Hospitals searchText={searchText} hospitals={hospitals} />
    </div>
  );
}

export default App;
