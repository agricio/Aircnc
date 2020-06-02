import React, { useEffect, useState, useMemo } from 'react';
import { Link, useHistory} from 'react-router-dom';
import api from '../services/api';
import socketio from 'socket.io-client';

import './Dashboard.css';

export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    const history = useHistory();
    
    const user_id = localStorage.getItem('user');

    const socket = useMemo(() => socketio('http://10.0.0.33:3333', {
        query: { user_id },
    }), [user_id]);
    
    useEffect(() => {
        socket.on('booking_request', data => {
          setRequests([...requests, data]);
        })
      }, [requests, socket]);

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

    async function handleAccept(id) {
        await api.post(`/bookings/${id}/approval`);
        setRequests(requests.filter(request => request._id !== id ));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejection`);
        setRequests(requests.filter(request => request._id !== id ));

    }

    return(
        <>
        <p>Welcome: <strong>{`${ localStorage.getItem('user_email')}`}</strong></p>
        
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                      <strong>{request.user.email}</strong> is requesting a reservation in: <strong>{request.spot.company}</strong> for the date: <strong>{request.date}</strong> 
                    </p>
                    <button className="accept" onClick={ () => handleAccept(request._id) } >accept</button>
                    <button className="reject" onClick={ () => handleReject(request._id) } >reject</button>
                </li>
            ))}
        </ul>
        
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