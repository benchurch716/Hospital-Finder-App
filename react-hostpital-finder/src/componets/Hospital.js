const Hospital = ({ hospital }) => {
  const mapsLink =
    "https://www.google.com/maps/place/?q=place_id:" + hospital.placeId;
  console.log(mapsLink);
  return (
    <div className="hospital">
      <li className="hospital h3">
        <a href={mapsLink}>{hospital.name}</a>
      </li>
      <p>{hospital.address}</p>
    </div>
  );
};

export default Hospital;
