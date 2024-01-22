import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../authentication/firebase';
import Details from './Details';
import './Dashboard.css';

const History = () => {
    const [sessionData, setSessionData] = useState([]);
    const [selectedSession, setSelectedSession] = useState(sessionData[0]);
    const [loading, setLoading] = useState(null)

    useEffect(() => {
      setLoading("Loading...")
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userId = user.uid;
            const sessionsRef = collection(db, 'bbq_sessions');
            const queryRef = query(sessionsRef, where('resultData.userId', '==', userId));
            const querySnapshot = await getDocs(queryRef);
            const sessions = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setSessionData(sessions);
            setLoading(null)
          } catch (error) {
            console.error('Error fetching sessions:', error);
          }
        } else {
          console.log('User is not authenticated');
        }
      });
  
      return () => unsubscribe();
    }, []);

      const handleDetails = session => {
        setSelectedSession(session)
      }
  
    return (
      <>
      {loading ?
      <p>{loading}</p>
      :
      <div className='historial'>
        <span className='historial-list'>
        <h3>Historial</h3>
        <ul>
        {sessionData
        .slice()
        .sort((a, b) => b.resultData.date.localeCompare(a.resultData.date))
        .map((session, index) => (
            <li key={index} onClick={() => handleDetails(session)}>
            <p>{session.resultData.userDate}</p>
            </li>
        ))}
        </ul>
        </span>
        {selectedSession &&
          <Details session={selectedSession} />
        }
      </div>}
      </>
    );
};

export default History;
