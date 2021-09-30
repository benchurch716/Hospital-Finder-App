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
      <form className='form-control' onSubmit={onSubmit}>
        <label className='form-control label'>Search Address:</label>
        <input className='form-control input' type="text" placeholder='Zip Code or City, State' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        <input className="btn" type="submit" value="Search" />
      </form>
  );
};

export default AddressSearch;
