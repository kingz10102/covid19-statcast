import React, {useState, useEffect} from 'react';
import numeral from 'numeral';
import { Line } from 'react-chartjs-2';


const options = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
    
    },
},
maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};



  function LineGraph({casesType = 'cases', ...props}) {
    const [data, setData] = useState({});
    
    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;
    
         for(let date in data.cases){
            if(lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        };
        return chartData;
    }

    useEffect(() => {
    const fetchData =async () => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((res) => res.json())
        .then((data) => {
        console.log(data)

        let chartData = buildChartData(data, 'cases');
        console.log(chartData);
        setData(chartData);
    })
};
    fetchData();
}, [casesType]);


    
    return (
        <div className={props.className}>
           {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "#DD0000",
                borderColor: "#FF7A11",
                data: data,
              },
            ],
          }}
          options={options} 
          />
          )}
        </div>
    )
}

export default LineGraph
