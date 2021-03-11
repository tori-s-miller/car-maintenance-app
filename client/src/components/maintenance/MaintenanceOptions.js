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


    const yearlyItems = [
        'Replace cabin air filter',
        'Check fuel filter',
        'Check steering and suspension',
        'Flush brake fluid',
        'Check alignment',
        'Polish windshield and headlights'
    ]



    const [hidden, setHidden] = useState(true);
    const [key, setKey] = useState(null);
    const [itemType, setItemType] = useState(null);

    function renderForm(e) {
        e.preventDefault();
        const key = e.currentTarget.getAttribute("data-index");
        const itemType = e.currentTarget.getAttribute("current-type")
        console.log('renderForm itemType:', itemType)
        setItemType(itemType)
        setKey(key);
        setHidden(!hidden);
    }

    const monthlyTasks = monthlyItems.map((item, index) => {
        return (
            <div 
                className={!hidden && itemType === "monthly" && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"} 
                key={index} 
                data-index={index} 
                current-type="monthly" 
                onClick={hidden ? renderForm : undefined}
            >
                <img src={light} className="icon" />
                <p className="maintenance-task">{item}</p>
                <p className="schedule-task">Schedule this task</p>
                {!hidden && key === `${index}` && itemType === "monthly" && (
                    <form className="maintenance-item-form">
                        <label htmlFor="date" className="date-label">Date to be scheduled</label>
                        <input type="date" name="start-date" className="date-input" />
                        <label htmlFor="notes" className="notes-label"></label>
                        <input type="textarea" name="notes" className="input-notes" />
                        <input type="submit" value="Schedule Task" className="submit-button" />
                        <input type="button" value="Cancel" className="cancel-button" onClick={renderForm} />
                    </form>
                )}
            </div>
        );
    });

    const threeMonthTasks = threeMonths.map((item, index) => {
        return (
            <div 
                className={!hidden && itemType === "threeMonths" && key === `${index}` ? "maintenance-item-expanded" : index === 4 || index === 5 ? "maintenance-item-hidden" : "maintenance-item"} 
                key={index} 
                data-index={index} 
                current-type="threeMonths" 
                onClick={hidden ? renderForm : undefined}
            >
            {console.log('threeMonthTasks itemType:', itemType)}
                <img src={light} className="icon" />
                <p className="maintenance-task">{item}</p>
                <p className="schedule-task">Schedule this task</p>
                {!hidden && key === `${index}` && itemType === "threeMonths" && (
                    <form className="maintenance-item-form">
                        <label htmlFor="date" className="date-label">Date to be scheduled</label>
                        <input type="date" name="start-date" className="date-input" />
                        <label htmlFor="notes" className="notes-label"></label>
                        <input type="textarea" name="notes" className="input-notes" />
                        <input type="submit" value="Schedule Task" className="submit-button" />
                        <input type="button" value="Cancel" className="cancel-button" onClick={renderForm} />
                    </form>
                )}
            </div>
        );
    });

    const sixMonthTasks = sixMonths.map((item, index) => {
        return (
            <div 
                className={!hidden && itemType === "sixMonths" && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"} 
                key={index} 
                data-index={index} 
                current-type="sixMonths" 
                onClick={hidden ? renderForm : undefined}
            >
                <img src={light} className="icon" />
                <p className="maintenance-task">{item}</p>
                <p className="schedule-task">Schedule this task</p>
                {!hidden && key === `${index}` && itemType === "sixMonths" && (
                    <form className="maintenance-item-form">
                        <label htmlFor="date" className="date-label">Date to be scheduled</label>
                        <input type="date" name="start-date" className="date-input" />
                        <label htmlFor="notes" className="notes-label"></label>
                        <input type="textarea" name="notes" className="input-notes" />
                        <input type="submit" value="Schedule Task" className="submit-button" />
                        <input type="button" value="Cancel" className="cancel-button" onClick={renderForm} />
                    </form>
                )}
            </div>
        );
    });

    const yearlyTasks = yearlyItems.map((item, index) => {
        return (
            <div 
                className={!hidden && itemType === "yearly" && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"} 
                key={index} 
                data-index={index} 
                current-type="yearly" 
                onClick={hidden ? renderForm : undefined}>
                <img src={light} className="icon" />
                <p className="maintenance-task">{item}</p>
                <p className="schedule-task">Schedule this task</p>
                {!hidden && key === `${index}` && itemType === "yearly" && (
                    <form className="maintenance-item-form">
                        <label htmlFor="date" className="date-label">Date to be scheduled</label>
                        <input type="date" name="start-date" className="date-input" />
                        <label htmlFor="notes" className="notes-label"></label>
                        <input type="textarea" name="notes" className="input-notes" />
                        <input type="submit" value="Schedule Task" className="submit-button" />
                        <input type="button" value="Cancel" className="cancel-button" onClick={renderForm} />
                    </form>
                )}
            </div>
        );
    });

            

    return (
        <Fragment>
            <Navbar />
            <section className="maintenance-options">
                <h2>Monthly</h2>
                <div className={itemType === "monthly" ? "wrapper-1" :  "wrapper-1 auto-rows"}>
                    {monthlyTasks}
                </div>
                
                <h2>Every 3 months/<br/>3,000 miles</h2>
                <div className={itemType === "threeMonths" ? "wrapper-2" :  "wrapper-2 auto-rows"}>
                    {threeMonthTasks}
                    <div></div>
                    <div></div>
                </div>

                <h2>Every 6 months/<br/>6,000 miles</h2>
                <div className={itemType === "sixMonths" ? "wrapper-3" :  "wrapper-3 auto-rows"}>
                    {sixMonthTasks}
                </div>

                <h2>Every 12 months/<br/>12,000 miles</h2>
                <div className={itemType === "yearly" ? "wrapper-4" :  "wrapper-4 auto-rows"}>
                    {yearlyTasks}
                </div>
            </section>  
        </Fragment>
    )
}