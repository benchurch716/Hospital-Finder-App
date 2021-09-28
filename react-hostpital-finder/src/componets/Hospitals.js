import Hospital from "./Hospital";

const Hospitals = ({ hospitals }) => {
  return (
    <>
        <h2>Results:</h2>
      {hospitals.map((hospital) => (
        <Hospital key={hospital.name} hospital={hospital} />
      ))}
    </>
  );
};

export default Hospitals;
