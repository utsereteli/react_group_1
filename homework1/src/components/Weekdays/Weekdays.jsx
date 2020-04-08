import React, { Component } from "react";
import './Scss/Weekdays.scss';

import Tasks from '../Tasks/Tasks';
import AddTask from "../AddTask/AddTasks";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dayValue: "",
            daySelect: "",
            days: [
                    {
                        dayId: 1,
                        name: 'ორშაბათი'
                    },
                    {
                        dayId: 2,
                        name: 'სამშაბათი'
                    },
                    {
                        dayId: 3,
                        name: 'ოთხშაბათი'
                    },
                    {
                        dayId: 4,
                        name: 'ხუთშაბათი'
                    },
                    {
                        dayId: 5,
                        name: 'პარასკევი'
                    }
                ],
            tasks: [
                {
                    day_1: [
                        {
                            id: 1,
                            description: "ორშაბათის პირველი თასქი"
                        },
                        {
                            id: 2,
                            description: "ორშაბათის მეორე თასქი"
                        },
                    ],
                    day_2: [
                        {
                            id: 1,
                            description: "სამშაბათის პირველი თასქი"
                        },
                        {
                            id: 2,
                            description: "სამშაბათის მეორე თასქი"
                        },
                    ],
                    day_3: [
                        {
                            id: 1,
                            description: "ოთხშაბათის პირველი თასქი"
                        },
                        {
                            id: 2,
                            description: "ოთხშაბათის მეორე თასქი"
                        },
                    ],
                    day_4: [
                        {
                            id: 1,
                            description: "ხუთშაბათის პირველი თასქი"
                        },
                    ],
                    day_5: [
                        {
                            id: 1,
                            description: "პარასკევის პირველი თასქი"
                        },
                    ]
                }
            ]
        };
    }

    setValue = ( value ) => {
        this.setState({dayValue: value});
        return this.state.dayValue;
    };

    setSelect = ( id ) => {
        this.setState({daySelect: id});
        return this.state.daySelect;
    };

    addTask = ( event ) => {
        event.preventDefault();
        this.setState((prevState) => {
            const { tasks } = prevState;
            tasks[0]["day_" + this.state.daySelect].push({
                description: this.state.dayValue
            });
            return { tasks };
        });

        this.setState({dayValue: ''});
    };

    removeTask = (dayId, id) => {
        this.state.tasks.map(task => {
            if (!task["day_"+dayId]) {
                return task;
            }

            const filteredSeries = task["day_"+dayId].filter(s => s.id !== id);

            this.setState((prevState) => {
                const { tasks } = prevState;
                tasks[0]["day_" + dayId] = filteredSeries;
                return { tasks };
            });
        });
    };

    render() {
        return (
            <div>
                <AddTask days={this.state.days} dayValue={this.state.dayValue} daySelect={this.state.daySelect} setValue={this.setValue} addTask={this.addTask} setSelect={this.setSelect} />
                <div className="weekdays">
                    {this.state.days.map((message, i) =>
                        <div key={i} className="day">
                            <h1>{message.name}</h1>
                            <ul>
                                <Tasks dayId={message.dayId} tasks={this.state.tasks[0]["day_"+message.dayId]} removeTask={this.removeTask} />
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}