import React from 'react';
import numeral from 'numeral';
import { Popup, Circle } from "react-leaflet";



const casesTypeColors = {
    cases: {
      hex: "#FFE300",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };
  
export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((x, y) => {
if (x.cases > y.cases) {
    return -1;
    } else {
    return 1;
    }
});
    return sortedData;
};


export const niceStyleStat  = (stat) => 
    stat ? `+${numeral(stat).format(",")}` : "+0";




// Making circles on leaflet map to indicate cases

export const giveDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
        >
        <Popup>
        <div className="info-Container">
          <div
            className="info-FlagNation"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-NationName">{country.country}</div>
          <div className="info-NationConfirmed">
            Cases: {numeral(country.cases).format("0.0")}
          </div>
          <div className="info-NationRecovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-NationDeaths">
          Mortalities: {numeral(country.deaths).format("0,0")}
          </div>
        </div>


        </Popup>

        </Circle>

        
    ))
)