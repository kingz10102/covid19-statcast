import React, { useState, useEffect } from 'react';
import { MenuItem, Select, FormControl, Card, CardContent, Grid } from '@material-ui/core';
import StatBox from './components/StatBox';
import TableChart from './components/TableChart';
import MapChart from './components/MapChart';
import LineGraph from './components/LineGraph';
import 'leaflet/dist/leaflet.css';
import './App.css';
import { sortData, niceStyleStat  } from './service';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



function App() {
  const [countries, setCountries] = useState(['']);
  // using state to have global stats the default on page 
  const [ country, setCountry] = useState(['global']);
  // getting info from indivudal country.
  const [ countryInfo, setCountryInfo] = useState({});
  // setting a state to make a table for data from api 
  const [tableData, setTableData] = useState([]);
  // this useEffect gets the info for global data fetching it from the url 
  const [mapCenter, setMapCenter] = useState
  // center of global
  ({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  
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
          const sortedData = sortData(data);
          setCountries(countries);
          // sorted by cases from most to least from service.js
          setTableData(sortedData);
          setMapCountries(data);
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
      // below lets the zoom for the map to come when clicked nation is selected
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });

};

console.log('Country info data', countryInfo);
  
return (
    <div className="app">
      <div className="app__leftside"> 
        <div className="app__heading">
     <h1 className='title-name'>COVID19-STATCAST</h1>
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
                <MenuItem 
                value={country.value}>
                  {country.name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div> 
     <div className="app__infostats">
         {/* StatBoxs--> COVID19 cases) */}
      <StatBox 
        className='statBox-title'
        isYellow
        active={casesType === "cases"}
        onClick={(event) => setCasesType('cases')}
        title=" Confirmed COVID-19 Cases" 
        cases= {niceStyleStat(countryInfo.todayCases)} 
        total={niceStyleStat(countryInfo.cases)}/>
         {/* StatBoxs--> COVID19 recoveries) */}
        <StatBox 
        className='statBox-title'
        active={casesType === "recovered"}
        onClick={(event) => setCasesType('recovered')}
        title="Recoveries" 
        cases= {niceStyleStat(countryInfo.todayRecovered)} 
        total={niceStyleStat(countryInfo.recovered)}/>
          {/* StatBoxs--> COVID19 deaths) */}
        <StatBox 
        className='statBox-title'
        isRed
        active={casesType === "deaths"}
        onClick={(event) => setCasesType('deaths')}
        title="Mortalities" 
        cases= {niceStyleStat(countryInfo.todayDeaths)} 
        total={niceStyleStat(countryInfo.deaths)}/>
     </div>


     {/* MAP */}
     <MapChart
      casesType={casesType}
      countries = {mapCountries}
      center={mapCenter}
      zoom={mapZoom}/>

<div className='card-div'>
<Grid item xs={12} sm={6} md={4}>
          <Card>
      <CardActionArea className='card1'>
        <CardContent >
          <Typography className='card-head' gutterBottom variant="h4" component="h2">
            Coronavirus Facts
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          The COVID-19 pandemic is a serious global health threat, and CDC is committed to stopping its spread. CDC has a long history of strengthening public health capacity throughout the world to contain outbreaks at their source and minimize their impact.
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
          <Card className='card'>
      <CardActionArea className='card1'>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
           Who needs to Quarantine ?
          </Typography>
          <Typography className='card-head' variant="body2" color="textSecondary" component="p">
You were within 6 feet of someone who has COVID-19 for a total of 15 minutes or more
You provided care at home to someone who is sick with COVID-19
You had direct physical contact with the person (hugged or kissed them)
You shared eating or drinking utensils
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
          <Card className='card'>
      <CardActionArea className='card1'>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            Health Articles
          </Typography>
          <Typography className='card-head' variant="body2" color="textSecondary" component="p">
                <ul>
                  <li>
                    <a href='https://www.cdc.gov/coronavirus/2019-ncov/if-you-are-sick/quarantine.html'>Wear a mask:Save a Life</a>
                  </li><br></br>
                  <li>
                  <a href='https://www.nature.com/articles/d41586-020-02599-5'>How COVID-19 can damage the brain</a>
                  </li><br></br>
                  <li>
                  <a href='https://www.npr.org/2020/09/17/914103938/-a-very-serious-situation-who-says-coronavirus-cases-are-rising-in-europe-again'>WHO Says Coronavirus Cases Are Rising In Europe Again</a>
                  </li>
                </ul>
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>
      </Grid>
</div>

    </div>

    


    {/* Right Side of page */}
    <Card className="app__rightside">
      <CardContent>
         {/* Table */}
        <h3>Live Cases by Nation</h3>
        <TableChart countries={tableData}/>
       {/* Graph */}
        <h3>New Global {casesType}</h3>
        <LineGraph className="app__graph"casesType={casesType}/>
      </CardContent>
    </Card>
    
    </div>
  );
}

export default App;
