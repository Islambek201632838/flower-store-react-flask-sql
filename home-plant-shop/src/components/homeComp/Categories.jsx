import {useState, useEffect} from 'react'
import axios from 'axios'

function Categories ({selectedCategory, setSelectedCategory}) {
  const parameter = 'category';
  const [parArr, setParArr] = useState([]);

  useEffect(() => {

    const getCount = async (parameter, parName) => {
      try {
        const data = await axios.get(`http://127.0.0.1:5000/list/${parameter}/${parName}`);
        const newItem = { name: parName, count: data.data[0] };
        setParArr(prevArr => {
          const isDuplicate = prevArr.some(item => item.name === parName);
          if (isDuplicate) {
            return prevArr;
          }
          return [...prevArr, newItem];
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const getCategories = async () => {

      try {
        const data = await axios.get(`http://127.0.0.1:5000/list/${parameter}`);
        const response = data.data;
        // console.log('Response:', response);
        // console.log('Current parArr:', parArr);
        const promises = response.map(parName => getCount(parameter, parName[0]));
        await Promise.all(promises);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getCategories();
  }, []);

    return (
      <div>
        <div className='categories-h2'>Categories</div>
            {parArr.map((item, index) => (
            <div className='categories-row' key={index}>
                <div onClick={()=>setSelectedCategory(item.name)}
                     className={(selectedCategory == item.name) ? 'active-size':'size'}
                     >
                  {item.name}
                </div>
                <div className={(selectedCategory == item.name) ? 'active-size':'size'}
                    >
                  ({item.count})
                </div>
            </div>
            ))} 
    </div>   
   );
  }
export default Categories
  
  