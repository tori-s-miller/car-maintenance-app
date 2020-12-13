import React, { useState, Fragment } from 'react';
import Navbar from '../layout/Navbar';
import light from './img/car-light.svg';

export default function MaintenanceOptions() {

    const monthlyItems = [
        'Check Lights', 
        'Tire inflation, tread, and general condition',
        'Engine oil',
        'Check windshield wiper fluid',
        'Check brake fluid',
        'Check coolant'
    ]

    const threeMonths = [
        'Automatic transmission fluid',
        'Battery and cables',
        'Check belts and hoses',
        'Check power steering fluid'
    ]

    const sixMonths = [
        'Chassis lubrication',
        'Thorough detail',
        'Engine air filter',
        'Check exhaust system',
        'Replace wiper blades',
        'Brakes inspection'
    ]


    const twelveMonths = [
        'Replace cabin air filter',
        'Check fuel filter',
        'Check steering and suspension',
        'Flush brake fluid',
        'Check alignment',
        'Polish windshield and headlights'
    ]



    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);

    function renderForm(e) {
        e.preventDefault();
        console.log('e.currentTarget.getAttribute("data-index"):', e.currentTarget.getAttribute("data-index"))
        const key = e.currentTarget.getAttribute("data-index");
        setKey(key);
        setHidden(!hidden);
    }


    const monthlyTasks = monthlyItems.map((item, index) => {
        return (
            <div className="maintenance-item" key={index} data-index={index} onClick={renderForm}>
                <img src={light} className="icon" />
                <p className="maintenance-task">{item}</p>
                <p className="schedule-task">Schedule this task</p>
                {console.log('key:', key)}
                {console.log('index:', index)}
                {!hidden && key === `${index}` && (
                    <form>
                        <input type="text"/>
                    </form>
                )}
            </div>
        );
    });

            

    return (
        <Fragment>
            <Navbar />
            <section className="maintenance-options">
            <h1>Maintenance Options</h1>
            <h2>Monthly</h2>
            <div className="wrapper-1">
                {monthlyTasks}
            </div>
            
            <h2>Every 3 months/<br/>3,000 miles</h2>
            <div className="wrapper-2">

            </div>

            

            <h2>Every 6 months/<br/>6,000 miles</h2>
            <div className="wrapper-3">
            </div>
            

            <h2>Every 12 months/<br/>12,000 miles</h2>
            <div className="wrapper-4">
        
            </div>
            </section>  
        </Fragment>
    )
}