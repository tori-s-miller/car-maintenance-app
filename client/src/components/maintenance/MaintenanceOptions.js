import React, { useState, Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../layout/Navbar';
import light from './img/car-light.svg';
import tire from './img/tire.svg';
import coolant from './img/coolant.svg';
import windshield from './img/windshield.svg';
import engineoil from './img/engineoil.svg';
import fluid from './img/fluid.svg';
import battery from './img/battery.svg';
import belt from './img/belt.svg';
import lubrication from './img/lubrication.svg';
import filter from './img/filter.svg';
import exhaust from './img/exhaust.svg';
import brakes from './img/brakes.svg';
import fuelfilter from './img/fuel-filter.svg';
import steering from './img/steering.svg';
import polish from './img/polish.svg';
import alignment from './img/alignment.svg';
import brakefluid from './img/brake-fluid.svg';
import AddPendingMaintenance from '../forms/AddPendingMaintenance';
import { connect } from 'react-redux';


function MaintenanceOptions(props) {

    const id = props.id;

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
        'Tire rotation',
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

    const mediumView = useMediaQuery({ query: '(max-width: 768px)' });

    const [currentOption, setCurrentOption] = useState('monthly')


    function renderForm(e) {
        e.preventDefault();
        const key = e.currentTarget.getAttribute("data-index");
        const itemType = e.currentTarget.getAttribute("current-type")
        setItemType(itemType)
        setKey(key);
        setHidden(!hidden);
    }

    // const [child, setChild] = React.useState(false);
    // const handleChildState = React.useCallback(childState => {
    //   setChild(childState);
    // }, []);


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
                    {item === 'Check Lights' && <img src={light} className="icon" alt="headlight-icon" />}
                    {item === 'Tire inflation and tread' && <img src={tire} className="icon" alt="tire-icon" />}
                    {item === 'Check windshield wiper fluid' && <img src={windshield} className="icon" alt="windshield-icon" />}
                    {item === 'Check brake fluid' && <img src={fluid} className="icon" alt="brake-fluid-icon" />}
                    {item === 'Check coolant' && <img src={coolant} className="icon" alt="coolant-icon" />}
                    {item === 'Engine oil' && <img src={engineoil} className="icon" alt="engine-oil-icon" />}
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "monthly" && (
                    <Fragment>
                        <AddPendingMaintenance hidden={hidden} renderForm={renderForm} item={item} id={id} />
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
                    {item === 'Automatic transmission fluid' && <img src={fluid} className="icon" alt="fluid-icon" />}
                    {item === 'Battery and cables' && <img src={battery} className="icon" alt="battery-icon" />}
                    {item === 'Check belts and hoses' && <img src={belt} className="icon" alt="engine-belt-icon" />}
                    {item === 'Check power steering fluid' && <img src={fluid} className="icon" alt="fluid-icon" />}
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "threeMonths" && (
                    <Fragment>
                        <AddPendingMaintenance hidden={hidden} renderForm={renderForm} item={item} id={id} />
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
                    {item === 'Chassis lubrication' && <img src={lubrication} className="icon" alt="chassis-lubrication-icon" />}
                    {item === 'Tire rotation' && <img src={tire} className="icon" alt="car-tire-icon" />}
                    {item === 'Engine air filter' && <img src={filter} className="icon" alt="engine-air-filter-icon" />}
                    {item === 'Check exhaust system' && <img src={exhaust} className="icon" alt="exhaust-icon" />}
                    {item === 'Replace wiper blades' && <img src={windshield} className="icon" alt="windshield-icon" />}
                    {item === 'Brakes inspection' && <img src={brakes} className="icon" alt="brakes-icon" />}
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "sixMonths" && (
                    <Fragment>
                        <AddPendingMaintenance hidden={hidden} renderForm={renderForm} item={item} id={id} />
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
                    {item === 'Replace cabin air filter' && <img src={filter} className="icon" alt="cabin-air-filter-icon" />}
                    {item === 'Check fuel filter' && <img src={fuelfilter} className="icon" alt="fuel-filter-icon" />}
                    {item === 'Check steering and suspension' && <img src={steering} className="icon" alt="steering-suspension-icon" />}
                    {item === 'Flush brake fluid' && <img src={brakefluid} className="icon" alt="brake-fluid-icon" />}
                    {item === 'Check alignment' && <img src={alignment} className="icon" alt="car-alignment-icon" />}
                    {item === 'Polish windshield and headlights' && <img src={polish} className="icon" alt="headlight-icon" />}
                    <div className="flex-sub-container">
                        <p className="maintenance-task">{item}</p>
                        <p className="schedule-task">Schedule this task</p>
                    </div>
                </div>
                {!hidden && key === `${index}` && itemType === "yearly" && (
                    <Fragment>
                        <AddPendingMaintenance hidden={hidden} renderForm={renderForm} item={item} id={id} />
                    </Fragment>
                )}
            </div>
        );
    });

            

    return (
        <Fragment>
            <Navbar />
            {!mediumView && (
                <section className="maintenance-options">
                    <h2 className="maintenance-options-h2">Monthly</h2>
                    <div className="wrapper-1">
                        {monthlyTasks}
                    </div>
                    
                    <h2 className="maintenance-options-h2">Every 3 months/<br/>3,000 miles</h2>
                    <div className="wrapper-2">
                        {threeMonthTasks}
                        <div></div>
                        <div></div>
                    </div>

                    <h2 className="maintenance-options-h2">Every 6 months/<br/>6,000 miles</h2>
                    <div className="wrapper-3">
                        {sixMonthTasks}
                    </div>

                    <h2 className="maintenance-options-h2">Every 12 months/<br/>12,000 miles</h2>
                    <div className="wrapper-4">
                        {yearlyTasks}
                    </div>
                </section>
            )}
            {mediumView && (
                <section className="maintenance-options">
                    <h2 className={currentOption === 'monthly' ? "h2-med h2-active" : "h2-med" } onClick={() => setCurrentOption('monthly')}>Monthly</h2>
                    {currentOption === 'monthly' && (
                        <div className="wrapper-1">
                            {monthlyTasks}
                        </div>
                    )}
                    
                    <h2 className={currentOption === 'threeMonths' ? "h2-med h2-active" : "h2-med" } onClick={() => setCurrentOption('threeMonths')}>Every 3 months/<br/>3,000 miles</h2>
                    {currentOption === 'threeMonths' && (
                        <div className="wrapper-2">
                            {threeMonthTasks}
                        </div>
                    )}

                    <h2 className={currentOption === 'sixMonths' ? "h2-med h2-active" : "h2-med" } onClick={() => setCurrentOption('sixMonths')}>Every 6 months/<br/>6,000 miles</h2>
                    {currentOption === 'sixMonths' && (
                        <div className="wrapper-3">
                            {sixMonthTasks}
                        </div>
                    )}

                    <h2 className={currentOption === 'yearly' ? "h2-med h2-active" : "h2-med" } onClick={() => setCurrentOption('yearly')}>Every 12 months/<br/>12,000 miles</h2>
                    {currentOption === 'yearly' && (
                        <div className="wrapper-4">
                            {yearlyTasks}
                        </div>
                    )}
                </section>  
            )}
        </Fragment>
    )
}

const mapStateToProps = state => {
    if(state.auth.user != null) {
        return ({
            id: state.auth.user._id
        });
    } else {
        return ({});
    }
}

export default connect(mapStateToProps)(MaintenanceOptions);