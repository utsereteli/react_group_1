import React, { Fragment } from "react";
import './Scss/AddTask.scss';


const AddTask = ({ days, dayValue, setValue, addTask, setSelect }) => (
    <Fragment>
        <div className="addTask">
            <form onSubmit={(event) => addTask(event)}>
                <div>
                    <select onChange={(event) => setSelect(event.target.value)} required>
                        <option hidden value=''>როდის?</option>
                        {days.map((day, i) =>
                            <option key={i} value={day.dayId}>
                                {day.name}
                            </option>
                        )}
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        value={dayValue}
                        onChange={(event) => setValue(event.target.value)}
                        placeholder={"რა გაქვს გასაკეთებელი?"}
                        required
                    />
                </div>
                <div>
                    <button>
                        დამატება
                    </button>
                </div>
            </form>
        </div>
    </Fragment>
);

export default AddTask;
