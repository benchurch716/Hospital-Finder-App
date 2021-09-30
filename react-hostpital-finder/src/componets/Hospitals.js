import Hospital from "./Hospital";

const Hospitals = ({ hospitals, searchText }) => {
  return (
    <>
      <h2>Results: {searchText}</h2>
      <ol>
        {hospitals.map((hospital) => (
          <Hospital key={hospital.name} hospital={hospital} />
        ))}
      </ol>
    </>
  );
};

export default Hospitals;
