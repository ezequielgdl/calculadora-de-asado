import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../authentication/firebase';
import { Bar } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);

const AnalysisChart = ({ session }) => {
  const [sessionConsumption, setSessionConsumption] = useState({});
  const [loading, setLoading] = useState(null);

  const fetchSessionData = async () => {
    if (session) {
      setLoading("Loading...");
      const sessionRef = doc(db, 'bbq_sessions', session.id);
      const snapshot = await getDoc(sessionRef);
      if (snapshot.exists()) {
        const updatedSessionData = snapshot.data();
        setSessionConsumption({ ...updatedSessionData});
        setLoading(null);
      }
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, [session]);

  if (!session || !sessionConsumption) {
    return <p>No hay información disponible sobre este asado.</p>;
  }

  const { resultData = {}, actualConsumption = {} } = sessionConsumption;
  const filteredResultData = {
    totalOffals: resultData.totalOffals,
    meatWithBone: resultData.meatWithBone,
    meatWithoutBone: resultData.meatWithoutBone,
  };
  const filteredActualConsumption = {
    totalOffals: actualConsumption.offalsConsumed,
    meatWithBone: actualConsumption.meatWithBone,
    meatWithoutBone: actualConsumption.meatWithoutBone,
  }

  const labels = ["Achuras", "Carne Con Hueso", "Carne Sin Hueso"]

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Actual Consumption',
        backgroundColor: 'rgba(255,99,132,0.5)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: Object.values(filteredResultData),
      },
      {
        label: 'Result Data',
        backgroundColor: 'rgba(255,219,88,0.5)',
        borderColor: 'rgba(255,219,8,1)',
        borderWidth: 1,
        data: Object.values(filteredActualConsumption), 
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 2,
    scales: {
      x: {
        grid: {
          color: 'rgba(255,255,240,0.6)', 
        },
        ticks: {
          color: 'ivory', 
        },
      },
      y: {
        grid: {
          color: 'rgba(255,255,240,0.6)', 
        },
        ticks: {
          color: 'ivory', 
        },
      },
    },
  };
  

  return (
    <>
    {loading ? <p>{loading}</p> : <div className='bar-graph-container'>
      <h4>Comparativa</h4>
      <Bar data={chartData} options={options} />
    </div>}
    </>
  );
};

export default AnalysisChart;
