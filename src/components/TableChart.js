import React from 'react';
import '../css/TableChart.css';
import numeral from 'numeral';

function TableChart({countries}) {
    return (
        <div className="tableChart">
            {/* mapping through each country to get country and case of choice */}
            {countries.map(({country, cases}) => (
                <tr>
                    <td><em>{country}</em></td>
                    <td><strong>{numeral(cases).format(',')}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default TableChart;
