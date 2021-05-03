import React, { useState, Fragment } from 'react';
import Navbar from '../layout/Navbar';
import light from './img/car-light.svg';
import AddPendingMaintenance from '../forms/AddPendingMaintenance';


export default function MaintenanceOptions() {

    const monthlyItems = [
        'Check Lights', 
        'Tire inflation and tread',
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
        setItemType(itemType)
        setKey(key);
        setHidden(!hidden);
    }

    const [child, setChild] = React.useState(false);
    const handleChildState = React.useCallback(childState => {
      setChild(childState);
      console.log('MaintenanceOptions childState:', childState)
    }, []);


    const monthlyTasks = monthlyItems.map((item, index) => {
        return (
            <div 
                className={!hidden && itemType === "monthly" && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"} 
                key={index} 
                data-index={index}
                current-type="monthly" 
                onClick={hidden ? renderForm : undefined}
            >
                <div className="flex-container">
                    <img src={light} className="icon" />
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "monthly" && (
                    <Fragment>
                        <AddPendingMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />
                    </Fragment>
                )}
            </div>
        );
    });

    const threeMonthTasks = threeMonths.map((item, index) => {
        return (
            <div 
                className={!hidden && itemType === "threeMonths" && key === `${index}` ? "maintenance-item-expanded" : "maintenance-item"} 
                key={index} 
                data-index={index} 
                current-type="threeMonths" 
                onClick={hidden ? renderForm : undefined}
            >
                <div className="flex-container">
                    <img src={light} className="icon" />
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "threeMonths" && (
                    <Fragment>
                        <AddPendingMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />
                    </Fragment>
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
                <div className="flex-container">
                    <img src={light} className="icon" />
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "sixMonths" && (
                    <Fragment>
                        <AddPendingMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />
                    </Fragment>
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
                <div className="flex-container">
                <img src={light} className="icon" />
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "yearly" && (
                    <Fragment>
                        <AddPendingMaintenance handleChild={handleChildState} hidden={hidden} renderForm={renderForm} item={item} />
                    </Fragment>
                )}
            </div>
        );
    });

            

    return (
        <Fragment>
            <Navbar />
            <section className="maintenance-options">
                <h2>Monthly</h2>
                <div className="wrapper-1">
                    {monthlyTasks}
                </div>
                
                <h2>Every 3 months/<br/>3,000 miles</h2>
                <div className="wrapper-2">
                    {threeMonthTasks}
                    <div></div>
                    <div></div>
                </div>

                <h2>Every 6 months/<br/>6,000 miles</h2>
                <div className="wrapper-3">
                    {sixMonthTasks}
                </div>

                <h2>Every 12 months/<br/>12,000 miles</h2>
                <div className="wrapper-4">
                    {yearlyTasks}
                </div>
            </section>  
        </Fragment>
    )
}