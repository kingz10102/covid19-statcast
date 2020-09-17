import React from 'react';
import { MenuItem, Select, FormControl } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="app_heading">
     <h1>COVID19-STATCAST</h1>
     {/* Material UI element  */}
     {/* Creates a form like box for list */}
     <FormControl className="app__dropdownbox">
            {/* Select shows droupdown with different attributes */}
            <Select
              variant="outlined"
              value='zyz'
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Country</MenuItem>
              <MenuItem value="worldwide">Nation</MenuItem>
            </Select>
          </FormControl>
          </div> 
     {/* Heading */}
     {/* COVID19  Title*/}

    </div>
  );
}

export default App;
