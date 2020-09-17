import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function StatBox({title, cases, total}) {
    return (
    //    using Card Material UI element to make Status Boxes
       <Card className="statBox">
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
