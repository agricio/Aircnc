import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import api from '../services/api';

import './Dashboard.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function loadSpots(){
        const user_id = localStorage.getItem('user');
        const response = await api.get('/dashboard', {
            headers: { user_id }
        });

        setSpots(response.data);
    }
    loadSpots();

    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <>
        <p>Welcome: <strong>{`${ localStorage.getItem('user_email')}`}</strong></p>
         <ul className="spot-list">
             {spots.map( spot => (
                 <li key={spot._id}>
                     <header  style={{ backgroundImage: `url(${spot.thumbnail_url})` }}/>
                     <strong>{spot.company}</strong>
                     <span>{spot.price ? `$${spot.price}/day`: 'Free'}</span>
                 </li>
             ))}
         </ul>
         <Link to="/NewSpot">
            <button className="btn">Add new Spot</button> 
         </Link>
         <button className="logoff" onClick={() => handleLogout() } >logout</button> 
        </>
    );
}