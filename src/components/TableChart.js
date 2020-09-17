import React from 'react'


function TableChart({countries}) {
    return (
        <div className="tableChart">
            {/* mapping through each country to get country and case of choice */}
            {countries.map(({country, cases}) => (
                <tr>
                    <td><em>{country}</em></td>
                    <td><strong>{cases}</strong></td>
                </tr>
            ))}
        </div>
    )
}

export default TableChart
