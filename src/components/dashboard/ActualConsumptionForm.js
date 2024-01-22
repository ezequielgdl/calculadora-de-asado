import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../authentication/firebase';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const ActualConsumptionForm = ({ session }) => {
  const [editing, setEditing] = useState(false);
  const [sessionConsumption, setSessionConsumption] = useState({});
  const [loading, setLoading] = useState(null);

  const fetchSessionData = async () => {
    if (session) {
      setLoading("Loading...");
      const sessionRef = doc(db, 'bbq_sessions', session.id);
      const snapshot = await getDoc(sessionRef);
      if (snapshot.exists()) {
        const updatedSessionData = snapshot.data();
        setSessionConsumption({ ...updatedSessionData.actualConsumption });
        setLoading(null);
      }
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, [session]);

  const fieldLabels = {
    meatWithBone: 'Carne con Hueso',
    meatWithoutBone: 'Carne sin Hueso',
    offalsConsumed: 'Achuras',
  };

  const fieldOrder = ['meatWithBone', 'meatWithoutBone', 'offalsConsumed'];
  
  const handleEdit = (field) => {
    setEditing(field);
  };

  const handleSave = async () => {
    setLoading("Saving...");
  
    const sessionRef = doc(db, 'bbq_sessions', session.id);
    try {
      await updateDoc(sessionRef, {
        actualConsumption: sessionConsumption,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  
    setLoading(null); 
  };

  const handleCancel = () => {
    setEditing(false);
    setSessionConsumption({ ...session.actualConsumption });
  };

  const handleInputChange = (field, newValue) => {
    setSessionConsumption((prevConsumption) => ({
      ...prevConsumption,
      [field]: newValue,
    }));
  };

  const renderField = (field, value) => {
    if (editing === field) {
      return (
        <>
          <span>{fieldLabels[field]}:</span>
          <input
            className='consumption-input'
            type="number"
            value={value}
            onChange={(e) => handleInputChange(field, e.target.value)}
            min="0"
          />
          <span>kg</span>
          <button className="input-icons" onClick={handleSave}><DoneIcon fontSize="0.8em" /></button>
          <button className="input-icons" onClick={handleCancel}><CloseIcon fontSize="0.8em" /></button>
        </>
      );
    } else {
      if (field === 'meatWithBone' && session.resultData.meatWithBone > 0) {
        return (
          <>
            <span>{fieldLabels[field]}: {value} kg</span>
            <button className="input-icons" onClick={() => handleEdit(field)}><EditIcon fontSize="0.8em"/></button>
          </>
        );
      } else if (field === 'meatWithoutBone' && session.resultData.meatWithoutBone > 0) {
        return (
          <>
            <span>{fieldLabels[field]}: {value} kg</span>
            <button className="input-icons" onClick={() => handleEdit(field)}><EditIcon fontSize="0.8em"/></button>
          </>
        );
      } else if (field === 'offalsConsumed' && session.resultData.totalOffals > 0) {
        return (
          <>
            <span>{fieldLabels[field]}: {value} kg</span>
            <button className="input-icons" onClick={() => handleEdit(field)}><EditIcon fontSize="0.8em"/></button>
          </>
        );
      } else {
        return null;
      }
    }
  };

  return (
    <span className='input-form'>
      <h3>Consumo Real</h3>
      {loading ? (
        <p>{loading}</p>
      ) : (
        fieldOrder.map((field) => (
          <span key={field} className='input-fields'>
            {renderField(field, sessionConsumption[field])}
          </span>
        ))
      )}
    </span>
  );
};

export default ActualConsumptionForm;
