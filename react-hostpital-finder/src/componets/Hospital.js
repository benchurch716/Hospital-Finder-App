const Hospital = ({ hospital }) => {
  return (
    <div>
      <h3>{hospital.name}</h3>
      <p>{hospital.address}</p>
    </div>
  );
};

export default Hospital;
