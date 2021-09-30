import Hospital from "./Hospital";

const Hospitals = ({ hospitals }) => {
  return (
    <>
      <h2>Results:</h2>
      <ol>
        {hospitals.map((hospital) => (
          <Hospital key={hospital.name} hospital={hospital} />
        ))}
      </ol>
    </>
  );
};

export default Hospitals;
