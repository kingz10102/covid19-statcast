import React from 'react;'
import { Popup, Circle } from "react-leaflet";

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
}

// Making circles on leaflet map to indicate cases

export const giveDataOnMap = (data, casesType='cases') => (
    data.map(country => (
        <Circle>
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
        </Circle>
    ))
)