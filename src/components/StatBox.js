import React from 'react';
import '../css/StatBox.css'
import { Card, CardContent, Typography } from '@material-ui/core';


function StatBox({title, active, isYellow, isRed, cases, total, ...props}) {
    return (
    //    using Card Material UI element to make Status Boxes
       <Card onClick={props.onClick}
       className={`statBox ${active && "statBox--selected"} 
       ${isYellow&& "statBox--yellow"} ${isRed&& 'statBox--red'}`}
    >
            <CardContent>
                {/* confirmed cases  */}
                <Typography className="statBox__title" color="textPrimary">
                    {title}

                </Typography>

                {/* number of confirmed cases */}
                <h2 className="statBox__cases">{cases}</h2>

                {/* total number of confirmed cases*/}
                <Typography className="statBox__total" color="textPrimary">
                    {total} Total 
                </Typography>

            </CardContent>
        </Card>
    )
}

export default StatBox
