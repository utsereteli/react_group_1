import React, { Fragment } from "react";
import RecycleBin from './Img/recycle-bin.svg';

const Tasks = ({ dayId, tasks, removeTask }) => {
    return (
        <Fragment>
            {tasks.map((task, i) => (
                <li key={i}>
                    <p>{task.description}</p>
                    <div className="delete" onClick={(event) => removeTask(dayId, task.id)}>
                        <img src={RecycleBin} alt="delete" />
                    </div>
                </li>
            ))}
        </Fragment>
    );
};

export default Tasks;
