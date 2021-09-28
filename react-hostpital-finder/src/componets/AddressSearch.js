import { useState } from "react";

const AddressSearch = ({ onClick }) => {

const [searchText, setSearchText] = useState('')

const onSubmit = (e) => {
    e.preventDefault()
    
    if(!searchText) {
        alert('please enter an address')
        return
    }
    onClick({ searchText })
    setSearchText('')
}

  return (
      <form onSubmit={onSubmit}>
        <label>Address:</label>
        <input type="text" placeholder='Zip Code or City, State' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        <input type="submit" value="Search" />
      </form>
  );
};

export default AddressSearch;
