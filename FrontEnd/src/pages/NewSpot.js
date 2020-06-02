import React, { useState, useMemo } from 'react';
import camera from '../assets/camera.svg'

import api from '../services/api';
import './NewSpot.css';

export default function NewSpot({ history }) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        const user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spot', data, {headers: { user_id }} )

        history.push('/dashboard');

    }

    return(
          <form onSubmit={handleSubmit}>
               <label className={thumbnail ? 'has-thumbnail' : ''} id="thumbnail" style={{ backgroundImage: `url(${preview})` }}>
                   <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                   <img src={camera} alt="Select img" />
               </label>



              <label htmlFor="company">Company</label>
              <input
                 id="company"
                 placeholder="Your Incredible Company"
                 value={company}
                 onChange={event => setCompany(event.target.value)}
             />

              <label htmlFor="techs">Techs * <span>(separade with comma)</span></label>
              <input
                 id="techs"
                 placeholder="What technologies do you use?"
                 value={techs}
                 onChange={event => setTechs(event.target.value)}
             />

              <label htmlFor="price">Charge per day * <span>(left blank for free)</span></label>
              <input
                 id="price"
                 placeholder="Price per day"
                 value={price}
                 onChange={event => setPrice(event.target.value)}
             />

             <button type="submit" className="btn">Add Spot</button>
             <button className="logoff" onClick={() => history.push('/dashboard') } > Back </button>

          </form>
    );
}