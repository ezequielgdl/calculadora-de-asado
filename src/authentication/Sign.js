import { useState } from 'react';
import Login from "./Login";
import Register from './Register';

const Sign = () => {
    const [status, setStatus] = useState(true);

    return (
        <div className="sign-options">
            <div>
                <button className='sign-buttons' onClick={() => setStatus(true)}>Login</button>
                <button className='sign-buttons' onClick={() => setStatus(false)}>Registrarse</button>
            </div>
            {status && 
            <Login/>
            }
            {!status &&
            <Register/>
            }
        </div>
    )
}

export default Sign;