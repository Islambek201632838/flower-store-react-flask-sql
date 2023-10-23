import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Corrected import
import '../App.css';
import Logo from '../img/Logo.png';
import Vector from '../img/Vector.png';
import Basket from '../img/Vector (1).png';
import Login from '../img/Login.png';

function Header({searchTerm, setSearchTerm}) {
  const [page, setPage] = useState('Home');

  return (
    <div className="header">
      <img
        src={Logo}
        alt=""
        style={{
          width: '150px',
          height: '34.3px',
          flexShrink: 0
        }}
      />
      <ul style={{ listStyle: 'none', display: 'flex' }}>
        <li style={{left: '329px'}}>
          <NavLink
            to="/"
            className= {(page == 'Home') ? 'headerNavActive' : 'headerNav'}
            onClick={() => setPage('Home')}
          >
            Home
          </NavLink>
        </li>
        <li style={{left: '424px'}}>
          <NavLink
            to="/shop"
            className= {(page == 'Shop') ? 'headerNavActive' : 'headerNav'}
            onClick={() => setPage('Shop')}
          >
            Shop
          </NavLink>
        </li>
        <li style={{left: '512px'}}> 
          <NavLink
            to="/plantcare"
            className= {(page == 'Plant Care') ? 'headerNavActive' : 'headerNav'}
            onClick={() => setPage('Plant Care')}
          >
            Plant Care
          </NavLink>
        </li>
        <li style={{left: '638px'}}>
          <NavLink
            to="/blogs"
            className= {(page == 'Blogs') ? 'headerNavActive' : 'headerNav'}
            onClick={() => setPage('Blogs')}
          >
            Blogs
          </NavLink>
        </li>
      </ul>
      <div style={{ display:'flex', alignItems:'center', position:'absolute', right:0}}>
        <div className='header-search-box'>
          <input className='header-search' 
                 type="text"
                 value={searchTerm}
                 onChange={(e)=> setSearchTerm(e.target.value)}
                 placeholder="Search..."/>
          <div className='header-search-stick'></div>
          <img style={{ margin: '8px 10px 8px 0' }} src={Vector} alt="" />
        </div>
        
        <img style={{ margin: '8px 5px 8px 15px' }} src={Basket} alt="" />
        <img style={{ margin: '0 0 0 20px' }} src={Login} alt="" />
      </div>
    </div>
  );
}

export default Header;
