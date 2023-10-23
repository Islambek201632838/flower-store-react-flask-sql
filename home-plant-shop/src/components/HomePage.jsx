import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Banner from './homeComp/Banner';
import FlowerList from './homeComp/FlowerList';
import Categories from './homeComp/Categories';
import PriceRange from './homeComp/PriceRange';
import Size from './homeComp/Size';

import SuperSale from '../img/superSale.png'

function HomePage({searchTerm}) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  
  return (
    <div style={{width:'1200px', boxSizing:'border-box'}}>
        <Banner />
        <div style={{display:'flex', flexDirection:'row'}}>
          <div className='categories'>
              <Categories
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} />
              <PriceRange
                minPrice={minPrice} 
                setMinPrice={setMinPrice} 
                maxPrice={maxPrice} 
                setMaxPrice={setMaxPrice} />
              <Size
                selectedSize={selectedSize} 
                setSelectedSize={setSelectedSize} />
              
              <img style={{width: '270px',
                           height: '420px',
                           marginTop:'10px'}}  
                   src={SuperSale} alt="" />

              
            </div>

            <FlowerList 
              minPrice={minPrice} 
              maxPrice={maxPrice} 
              selectedCategory={selectedCategory} 
              selectedSize={selectedSize}
              searchTerm ={searchTerm}
              />
        </div>
          
    </div>)
}

export default HomePage







