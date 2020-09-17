import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl } from '@material-ui/core';
import './App.css';

function App() {
  const [countries, setCountries] = useState(['']);
  
  // code insidewill run once []
  useEffect(() => {
    // usinf asyns to send a request
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
      // get the response then only have json 
      .then((response) => response.json())
        .then((data) => {
          // i just ant contries so this will deconstruct
          const countries = data.map((country) => ({
            // getting country then assign it to key name
            // United States, Canada
            name: country.country,
            // this gives abbrev USA, CAN
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
      };
      // caling async inside useEffect
    getCountriesData();
  }, []);



  return (
    <div className="app">
      <div className="app__heading">
     <h1>COVID19-STATCAST</h1>
     {/* Material UI element  */}
     {/* Creates a form like box for list */}
     <FormControl className="app__dropdownbox">
            {/* Select shows droupdown with different attributes */}
            <Select
              variant="outlined"
              value='zyz'
            >
              {/* mapping through to get country name and value from useEffect */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div> 
     {/* Heading */}
     {/* COVID19  Title*/}

    </div>
  );
}

export default App;
