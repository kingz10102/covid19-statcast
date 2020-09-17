import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, Card, CardContent } from '@material-ui/core';
import StatBox from './components/StatBox';
import TableChart from './components/TableChart';
import MapChart from './components/MapChart';
import './App.css';
function App() {
  const [countries, setCountries] = useState(['']);
  // using state to have global stats the default on page 
  const [ country, setCountry] = useState(['global']);
  // getting info from indivudal country.
  const [ countryInfo, setCountryInfo] = useState({});
  // setting a state to make a table for data from api 
  const [tableData, setTableData] = useState([]);
  // this useEffect gets the info for global data fetching it from the url 
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);






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
          setTableData(data);
        });
      };
      // caling async inside useEffect
    getCountriesData();
  }, []);

// function for dropdown box every click on nation is will mapp to country code from api
const onCountryChange = async (e) => {
  const countryCode = e.target.value;

  // console.log('this is', countryCode);

  // country selected will stay on dropdown box
  setCountry(countryCode);

  const urlSite = countryCode === 'global' ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  // async the function with await
    await fetch(urlSite)
    .then(res => res.json())
    .then(data => {
      setCountryInfo(countryCode);
      // all data from country json 
      setCountryInfo(data);
    });

};

console.log('Country info data', countryInfo);
  
return (
    <div className="app">
      <div className="app__leftside"> 
        <div className="app__heading">
     <h1>COVID19-STATCAST</h1>
     {/* Material UI element  */}
     {/* Creates a form like box for list */}
     <FormControl className="app__dropdownbox">
            {/* Select shows droupdown with different attributes */}
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="global">Global</MenuItem>
              {/* mapping through to get country name and value from useEffect */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          </div> 
     
     <div className="app__infostats">
         {/* StatBoxs--> COVID19 cases) */}
      <StatBox title="Confirmed COVID-19 Cases" cases= {countryInfo.todayCases} total={countryInfo.cases}/>
         {/* StatBoxs--> COVID19 recoveries) */}
        <StatBox title="Recoveries" cases= {countryInfo.todayRecovered} total={countryInfo.recovered}/>
          {/* StatBoxs--> COVID19 deaths) */}
        <StatBox title="Mortalities" cases= {countryInfo.todayDeaths} total={countryInfo.deaths}/>
     </div>


     {/* MAP */}
     <MapChart/>
    </div>


    {/* Right Side of page */}
    <Card className="app__rightside">
      <CardContent>
        <h3>Live Case by Nation</h3>
        {/* Table */}
        <TableChart countries={tableData}/>

        <h3>New cases by Global</h3>
      </CardContent>
    </Card>
    </div>
  );
}

export default App;
