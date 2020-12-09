import React, { useState, Fragment } from 'react';
import Navbar from '../layout/Navbar';
import light from './img/car-light.svg';

export default function MaintenanceOptions() {
    // toggle schedule task; open/close

    const [clickedItem, currentClickedItem] = useState({});

    // each div item needs an id

    const handleItemClick = e => {
        e.preventDefault();
        e.currentTarget.classList.toggle("purple")
        console.log('e.currentTarget:', e.currentTarget)
        console.log('e.currentTarget.style:', e.currentTarget.style)
        console.log('e.currentTarget.classList:', e.currentTarget.classList)
        currentClickedItem(e.currentTarget)
        console.log('clickedItem:', clickedItem)
    }
    const [hidden, setHidden] = useState(true);

    return (
        <Fragment>
            <Navbar />
            <section className="maintenance-options">
            <h1>Maintenance Options</h1>
            <h2>Monthly</h2>
            <div className="wrapper-1">
                <div className="maintenance-item" onClick={() => setHidden(false)}>
                    <img src={light} className="icon" />
                    <p className="maintenance-task">Check Lights</p>
                    <p className="schedule-task">Schedule this task</p>
                    {!hidden && <form>
                        <input type="text"/>
                    </form>}
                </div>
                <div className="maintenance-item" onClick={() => setHidden(false)}>
                    <img src={light} className="icon" />
                    <p className="maintenance-task">Tire inflation, tread, and general condition</p>
                    <p className="schedule-task">Schedule this task</p>
                    {!hidden && <form>
                        <input type="text"/>
                    </form>}
                </div>
                <div className="maintenance-item">
                    <img src={light} className="icon" />
                    <p className="maintenance-task">Engine oil</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check windshield wiper fluid</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check brake fluid</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check coolant</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
            </div>
            
            <h2>Every 3 months/<br/>3,000 miles</h2>
            <div className="wrapper-2">
                <div className="maintenance-item">
                    <img src={light} className="icon" />
                    <p className="maintenance-task">Automatic transmission fluid</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Battery and cables</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check belts and hoses</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check power steering fluid</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
            </div>

            <h2>Every 6 months/<br/>6,000 miles</h2>
            <div className="wrapper-3">
                <div className="maintenance-item">
                    <p className="maintenance-task">Chassis lubrication</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Thorough detail</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Engine air filter</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check exhaust system</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Replace wiper blades</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Brakes inspection</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
            </div>

            <h2>Every 12 months/<br/>12,000 miles</h2>
            <div className="wrapper-4">
                <div className="maintenance-item">
                    <p className="maintenance-task">Replace cabin air filter</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check fuel filter</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check steering and suspension</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Flush brake fluid</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Check alignment</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
                <div className="maintenance-item">
                    <p className="maintenance-task">Polish windshield and headlights</p>
                    <p className="schedule-task">Schedule this task</p>
                </div>
            </div>
            </section>  
        </Fragment>
    )
}