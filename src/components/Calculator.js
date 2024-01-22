import React, { useState } from "react";
import Results from "./Results";
import { calculateMeatNeeded } from "../utils/calculatorUtils";
import '../components/Calculator.css';
import { Checkbox } from "@mui/material";
import { red } from "@mui/material/colors";
import StaggeredText from "./StaggeredText";
import { motion } from "framer-motion";

const Calculator = () => {
  const initialState = {
    adults: 0,
    children: 0,
    includeOffal: false,
    withBone: false,
    withoutBone: false,
    carne: ""
  }

  const [inputs, setInputs] = useState({ ...initialState });
  const [status, setStatus] = useState("initial");

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
  
    if (type === "checkbox") {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: checked,
      }));
    } else if (type === "radio") {
      if (value === "sin-hueso") {
        setInputs((prevInputs) => ({
          ...prevInputs,
          withBone: false,
          withoutBone: true,
          carne: value,
        }));
      } else if (value === "con-hueso") {
        setInputs((prevInputs) => ({
          ...prevInputs,
          withBone: true,
          withoutBone: false,
          carne: value,
        }));
      } else if (value === "ambas") {
        setInputs((prevInputs) => ({
          ...prevInputs,
          withBone: true,
          withoutBone: true,
          carne: value,
        }));
      }
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: parseInt(value),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputs.adults <= 0) {
      setStatus("missingAdults");
      return;
    } else if (!inputs.withBone && !inputs.withoutBone) {
      setStatus("missingMeat");
      return;
    }

    setStatus("results");
  };

  const handleReset = () => {
     setInputs({...initialState})
     setStatus('initial')
  }

  return (
    <>
    <motion.div 
    className="calc-container"
    initial={{ y: -20 }}
    animate={{ y: 0 }}
    transition={{ type: "tween" }}
    >
      <StaggeredText text="Parrillómetro"></StaggeredText>
      <motion.h2
      className="calc-h2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      >calculadora de asado</motion.h2>
      <form className={status === 'results' ? 'hidden' : 'show'} onSubmit={handleSubmit}>
          <label>
            Adultos{' '}
            <input
              className="people-input"
              type="number"
              name="adults"
              value={inputs.adults}
              onChange={handleChange}
              min='0'
            />
          </label>
          <label>
            Niños{'  '} 
            <input
              className="people-input"
              type="number"
              name="children"
              value={inputs.children}
              onChange={handleChange}
              min='0'
            />
          </label>
          <label className="checkbox">
            Achuras
            <Checkbox
              checked={inputs.includeOffal}
              onChange={(event) => handleChange(event)}
              name="includeOffal"
              color="error"
              sx={{
                color: red[50],
                '&.Mui-checked': 
                {color: red[50]},
                '& .MuiSvgIcon-root':
                { fontSize: 30 }
              }
              }
            />
          </label>
          <div className="radio">
            <label><b>Tipo de Carne</b></label>
            <div>
              <label className="radio-label">
                Sin hueso
                <input
                  type="radio"
                  name="carne"
                  value="sin-hueso"
                  checked={inputs.carne === "sin-hueso"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Con hueso
                <input
                  type="radio"
                  name="carne"
                  value="con-hueso"
                  checked={inputs.carne === "con-hueso"}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Ambas
                <input
                  type="radio"
                  name="carne"
                  value="ambas"
                  checked={inputs.carne === "ambas"}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <motion.button 
          initial={{ opacity: 0, y: -20}}
          animate={{ opacity: 1, y: 0}}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut", type: "spring" }}
          type="submit">
          Calcular
          </motion.button>
      </form>
      {status === "results" && (
      <Results meatValues={calculateMeatNeeded(inputs)} onReset={handleReset} inputs={inputs}/>
    )}
    </motion.div>
    {status === "missingAdults" && (
      <p className="error-message">Introduce una cantidad válida de adultos.</p>
    )}
    {status === "missingMeat" && (
      <p className="error-message">Selecciona tipo de carne.</p>
    )}
    </>
  );
};

export default Calculator;
