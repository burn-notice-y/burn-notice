import React from 'react';
import assignments from '../../data/assignmentArray';
import Assignment from './Assignment';
import Typography from "@material-ui/core/Typography/Typography";
import '../../css/Assignments.css';


const ManyAssignments = () => (

            <div className="assignments-cont">
                <div className="assignment-header">
                    <Typography component="h3" variant="h3" gutterBottom>
                        View your Assignments
                    </Typography>
                </div>
                <div className="assignments-content">
                    {assignments.reverse().map(assignment => <Assignment key={assignment.id} {...assignment}/>)}
                </div>
            </div>
);
export default ManyAssignments;