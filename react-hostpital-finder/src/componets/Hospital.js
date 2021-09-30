const Hospital = ({ hospital }) => {
  return (
    <div className='hospital'>
      <li className='hospital h3'>{hospital.name}</li>
      <p>{hospital.address}</p>
    </div>
  );
};

export default Hospital;
