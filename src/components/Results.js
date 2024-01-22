import React, {useState, useEffect } from "react";
import '../components/Results.css'
import { auth, db } from "../authentication/firebase";
import { collection, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import format from "date-fns/format";


const Results = ({ meatValues, onReset, inputs }) => {
const {adults, children } = inputs;
const {totalOffals, meatWithBone, meatWithoutBone } = meatValues
const [user, setUser] = useState(auth.currentUser)
const [showSuccessMessage, setShowSuccessMessage] = useState(false);
const [showButton, setShowButton] = useState(true);
const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); 
    });
    return () => {
      unsubscribe(); 
    };
  }, []);

  const handleSaveResult = async () => {
    if (!auth.currentUser) {
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const userDate = format(selectedDate, 'dd-MM-yyyy')
      const date = new Date().toISOString();
      const actualConsumption = {
        meatWithBone: 0,
        meatWithoutBone: 0,
        offalsConsumed: 0
      }
      const resultData = {
        userId,
        userDate,
        date,
        meatWithBone,
        meatWithoutBone,
        totalOffals,
        adults,
        children,
      };

      await addDoc(collection(db, "bbq_sessions"), {resultData, actualConsumption});
      setShowSuccessMessage(true);
      setShowButton(false);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2500)
      console.log("BBQ session saved successfully!");
    } catch (error) {
      console.error("Error saving BBQ session:", error);
    }
  };

  return (
    <div className="results">
      <AnimatePresence>
      <h3><u>Resultados</u></h3>
      {meatWithBone > 0 && <p>Carne Con Hueso: <b>{meatWithBone}</b> kg</p>}
      {meatWithoutBone > 0 && <p>Carne Sin Hueso: <b>{meatWithoutBone}</b> kg</p>}
      {totalOffals > 0 && <p>Achuras: <b>{totalOffals}</b> kg</p>}
      <p>Adultos: <b>{adults}</b></p>
      {children > 0 && <p>Niños: <b>{children}</b></p>}
      {user && showButton && 
        <>
        <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd-MM-yyyy"
        className="date-picker-input"
      />
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="results-button" 
          onClick={handleSaveResult}>
          Guardar Resultado
        </motion.button>
        </>}
      <motion.button 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="reset-button" 
      onClick={onReset}
      >
      Reset
      </motion.button>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="success-message"
          >
            Asado guardado con éxito!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Results;