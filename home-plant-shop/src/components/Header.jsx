import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import Logo from '../img/Logo.png';
import Vector from '../img/Vector.png';
import Basket from '../img/Vector (3).png';
import Login from '../img/Login.png';

function Header({searchTerm, setSearchTerm}) {
  const [page, setPage] = useState('Home');
  const navData = [
    {
      'link': '/',
      'page': 'Home',
      'style': '329px'
    },
    {
      'link': '/shop',
      'page': 'Shop',
      'style': '424px'
    },
    {
      'link': '/plantcare',
      'page': 'Plant Care',
      'style': ' 512px'
    },
    {
      'link': '/blogs',
      'page': 'Blogs',
      'style': '638px'
    }
  ];

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
        {navData.map((item, index) => {
          return (
            <li style={{left: item.style}} key={index}>
              <NavLink
                to={item.link}
                className={page === item.page ? 'headerNavActive' : 'headerNav'}
                onClick={() => setPage(item.page)}
              >
                {item.page}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div style={{ display:'flex', alignItems:'center', position:'absolute', right:0}}>
        <div className='header-search-box'>
          <input
            className='header-search'
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
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
