import Header from "./componets/Header";
import AddressSearch from "./componets/AddressSearch";
import Hospitals from "./componets/Hospitals";
import { useState } from "react";

function App() {
  const [hospitals, setHostpitals] = useState([]);

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
    <div>
      <Header />
      <AddressSearch onClick={searchHopsitals} />
      <Hospitals hospitals={hospitals} />
    </div>
  );
}

export default App;
