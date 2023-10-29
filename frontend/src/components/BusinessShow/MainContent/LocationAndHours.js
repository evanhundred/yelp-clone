const LocationAndHours = ({ business }) => {
  // const urlifiedBizName = business.name;
  const urlifiedBizCoords = `${business.latitude}%2C${business.longitude}`;
  // let googleMapParams = `query=${urlifiedBizName}&query_place_id=${business.placeId}`;
  let googleMapParams = `query=${urlifiedBizCoords}&query_place_id=${business.placeId}`;

  const urlifyBizName = () => {
    const nameArray = business.name.split(" ");

    const locationArray = business.city
      .concat("%2C")
      .concat(business.state)
      .split(" ");
    const filteredNameArray = nameArray.concat(locationArray).map((word) => {
      // let result;
      if (word) {
        const match = word.match(/[a-zA-Z0-9]/g);
        if (match) return match;
      }
      return "";
      // if (word.match(/[a-zA-Z0-9]/g))
      //   return word.match(/[a-zA-Z0-9]/g).join("");
      // return "";
    });
    const finalForm = filteredNameArray.join("+");
    return finalForm;
  };

  const urlifiedBizName = urlifyBizName();
  const stubMapParams = `query=${urlifiedBizName}`;

  const isStub = business.stub === "true";
  const mapSearchUrl = (params) =>
    `https://www.google.com/maps/search/?api=1&${params}`;
  const getParams = isStub ? stubMapParams : googleMapParams;

  // const mapSearchUrl = `https://maps.google.com/?ll=${business.latitude},${business.longitude}`;
  const neighborhoodString = business.neighborhood;
  // const neighborhoodString = business ? business.neighborhood : "text";

  return (
    <div className="location card-container">
      <div className="main-title">
        <h2>Location and Hours</h2>
      </div>

      <div className="main-content-div">
        <div className="left-side-map">
          {!isStub && <img src={business.imageUrls[6]} alt="google maps" />}
          <div className="bottom-left-side">
            <div className="address">
              <a
                href={mapSearchUrl(getParams)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="street-address">{business.address}</h3>
              </a>

              <h4 className="city-state-zip">
                {business.city}, {business.state} {business.zipcode}
              </h4>
              {/* <p>{business.neighborhood}</p> */}
              <p>{neighborhoodString}</p>
            </div>

            <div className="get-directions-container">
              <div className="get-directions-button">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={mapSearchUrl(getParams)}
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hours-div">
          <div className="day-container">
            <div className="day-name">Mon</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Tue</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Wed</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Thu</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Fri</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Sat</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          <div className="day-container">
            <div className="day-name">Sun</div>
            <div className="time-range">{`${business.openAt} - ${business.closedAt}`}</div>
          </div>
          {/* <a href="#">
            <div className="edit-info-button">
              <i className="fa-solid fa-pencil"></i>
              <div>Edit Business info</div>
            </div>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default LocationAndHours;
