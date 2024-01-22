import React from 'react';
import ActualConsumptionForm from './ActualConsumptionForm';
import AnalysisChart from './AnalysisChart';

const Details = ({ session }) => {
const { meatWithBone, meatWithoutBone, totalOffals, adults, children } = session.resultData;

  return (
    <div className='session-details-container'>
    <div className="session-details">
      <span className='people-details'>
        <h3>Asado</h3>
        {adults > 0 && <p>Adultos: {adults}</p>}
        {children > 0 && <p>Niños: {children}</p>}
      </span>
      <span className='calc-details'>
        <h3>Cálculo</h3>
        {meatWithBone > 0 && <p>Carne con Hueso: {meatWithBone} kg</p>}
        {meatWithoutBone > 0 && <p>Carne sin Hueso: {meatWithoutBone} kg</p>}
        {totalOffals > 0 && <p>Achuras: {totalOffals} kg</p>}
      </span>
      <ActualConsumptionForm session={session}/>
    </div>
    <div className='session-analysis'>
      <AnalysisChart session={session}></AnalysisChart>
    </div>
    </div>
  );
};

export default Details;