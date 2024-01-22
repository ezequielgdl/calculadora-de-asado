// InputForm.js
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../authentication/firebase';

const InputForm = ({ session }) => {
  const [meatWithBone, setMeatWithBone] = useState(0);
  const [meatWithoutBone, setMeatWithoutBone] = useState(0);
  const [offalConsumed, setOffalConsumed] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualConsumptionData = {
      meatWithBone,
      meatWithoutBone,
      offalConsumed,
    };

    const sessionRef = doc(db, 'bbq_sessions', session.id);
    await updateDoc(sessionRef, {
      actualConsumption: actualConsumptionData,
    });

    setMeatWithBone('');
    setMeatWithoutBone('');
    setOffalConsumed('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {session.resultData.meatWithBone > 0 && <div>
          <label>Carne con Hueso (kg):</label>
          <input
            type="number"
            value={meatWithBone}
            onChange={(e) => setMeatWithBone(e.target.value)}
          />
        </div>}
        {session.resultData.meatWithoutBone > 0 && <div>
          <label>Carne sin Hueso (kg):</label>
          <input
            type="number"
            value={meatWithoutBone}
            onChange={(e) => setMeatWithoutBone(e.target.value)}
          />
        </div>}
        {session.resultData.totalOffals > 0 &&<div>
          <label>Achuras consumidas (kg):</label>
          <input
            type="number"
            value={offalConsumed}
            onChange={(e) => setOffalConsumed(e.target.value)}
          />
        </div>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
