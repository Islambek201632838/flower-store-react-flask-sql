import Slider from 'react-slider';
import {useState} from 'react'

const PriceRange = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {

    const [localMinPrice, setLocalMinPrice] = useState(minPrice);
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

    const handleSliderChange = (values) => {
      setLocalMinPrice(values[0]);
      setLocalMaxPrice(values[1]);
    };

    const handleFilter = (min, max) => {
      setMinPrice(localMinPrice);
      setMaxPrice(localMaxPrice);
    }
  
    return (
      <div style={{marginTop:'30px'}}>
        <div className='categories-h2'>Price Range</div>
        <Slider
          className={'slider'}
          min={0}
          max={200}
          value={[localMinPrice, localMaxPrice]}
          onChange={handleSliderChange}
  
        />
        <p>Price ${localMinPrice} - ${localMaxPrice}</p>
        <button className='filter-button'
                onClick={handleFilter}>Filter</button>
      </div>
    );
  };
export default PriceRange