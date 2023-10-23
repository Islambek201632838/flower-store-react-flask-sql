import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import img1 from '../../img/image 1.png'

function FlowerList(props) {
  const { minPrice, maxPrice, selectedCategory, selectedSize, searchTerm} = props;

  const [isDiscount, setIsDiscount] = useState(null);
  const [isNew, setIsNew] = useState(null);
  const [filter, setFilter] = useState('All Plants');
  const [serverData, setServerData] = useState([]);
  
  const [page, setPage] = useState (1);
  const [maxPage, setMaxPage] = useState(4);
  const [sort, setSort] = useState('default');
  const [serverMessage, setServerMessage] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const generatePageNumbers = (maxPage) => {
    if(maxPage != 0) { 
      const pages = Array.from({ length: maxPage }, (_, i) => i + 1);
      return pages.slice(0, 4); // Initially display the first 4 pages
      
    }
    else {
      return []
    }
  };

  const [displayedPages, setDisplayedPages] = useState(([]));
 
  useEffect(()=>{
    setDisplayedPages(generatePageNumbers(maxPage)); 
    setPage(1);
  }, [maxPage]);

  useEffect(() => {
    const getObj = async () => {
      const params = {
        minPrice: minPrice,
        maxPrice: maxPrice,
        category: selectedCategory,
        size: selectedSize,
        isNew: isNew,
        isDiscount: isDiscount,
        sort: sort,
        searchTerm: searchTerm
      };

      const offset = 9*(page-1);
      let url = `http://127.0.0.1:5000/filter?limit=9&offset=${offset}&`;
      let url2 = `http://127.0.0.1:5000/filterlength?limit=9&`;
      let url3 = `http://127.0.0.1:5000/search?searchTerm=${searchTerm}`

      for (const key in params) {
        if (params[key]) {
          url += `${key}=${params[key]}&`;
          url2 += `${key}=${params[key]}&`;
        }
      }
        url = url.slice(0, -1);
        url2 = url2.slice(0, -1);  
     
      try {
        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        const response3 = await axios.get(url3);

        if (response3.data['message'] =='searchTerm is empty') {
          setServerData(response.data);
          setMaxPage (response2.data['max_page']);
          setSearchResults(response2.data['results']);
          setServerMessage('');
        }

        else if (response.data['message']=='No Match' 
            || response2.data['message']=='No Match' || response3.data['message'] =='No Match') {
          setServerData([]);
          setMaxPage(0);
          setSearchResults('');
          setServerMessage('No matching data');
          setDisplayedPages([]);
        }

        else if (response3.data['message'] !='No Match') {
          setServerData(response3.data);
          let len = response3.data.length;
          let max = (Math.ceil(len/9));
          setMaxPage(max);
          setSearchResults(len);
          setServerMessage('');
        }

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
     setTimeout(getObj, 200);
  }, [searchTerm, sort, minPrice, maxPrice, selectedCategory, selectedSize, isNew, isDiscount, page]);
  
  // const imageUrls = [
  //   '../../img/image 1.png',
  //   '../../img/image 2.png',
  //   '../../img/image 3.png'
  // ];
  
  // const getRandomImageUrl = () => {
  //   const randomIndex = Math.floor(Math.random() * imageUrls.length);
  //   return imageUrls[randomIndex];
  // };

  const handleNextClick = () => {
    const nextPage = page + 1;
    if (nextPage <= maxPage) {
      setPage(nextPage);
  
      if (displayedPages[2] === page) {
        const newDisplayedPages = [...displayedPages];
        
        if ((nextPage + 1) <= maxPage) {
          newDisplayedPages.shift(); 
          const lastPage = newDisplayedPages[newDisplayedPages.length - 1];
          newDisplayedPages.push(lastPage + 1);
        }
        setDisplayedPages(newDisplayedPages);
        console.log(newDisplayedPages);
      }
      }
    } 
    
    const handlePrevClick = () => {
      const prevPage = page - 1;
      if (prevPage >= 1) {
        setPage(prevPage);
    
        if (displayedPages[2] === page) {
          const newDisplayedPages = [...displayedPages];
    
          if (prevPage > 1) {
            newDisplayedPages.pop(); // Remove the last element
            const firstPage = newDisplayedPages[0];
            if(firstPage > 1) {
              newDisplayedPages.unshift(firstPage - 1);
            }
          }
    
          setDisplayedPages(newDisplayedPages);
          console.log(newDisplayedPages);
        }
      }
    };
    
  
  return (
    <div className='flower_list'>
      <div className='list_filter'>
        <div className='flower_list_ul'>
          <div onClick={() => {setIsDiscount(null); setIsNew(null); setFilter('All Plants')}}
               className= {(filter == 'All Plants') ? 'flowerItem-active' : 'flowerItem'}>
            All plants
          </div>
          <div onClick={() =>{setIsNew(true); setIsDiscount(null); setFilter('New Arrivals')} }
               className= {(filter == 'New Arrivals') ? 'flowerItem-active' : 'flowerItem'}>
            New Arrivals
          </div>
          <div onClick={() =>{setIsDiscount(true); setIsNew(null); setFilter('Sale')}}
               className= {(filter == 'Sale') ? 'flowerItem-active' : 'flowerItem'}>
            Sale
            </div>
        </div>
        <div className='flower_list_sort'>
          Show first:
          <select  onChange={(e)=> setSort(e.target.value)}>
            <option value='default'>Default setting</option>
            <option value='New'>New</option>
            <option value='Old'>Old</option>
            <option value='Cheap'>Cheap</option>
            <option value='Expensive'>Expensive</option>
          </select>
        </div>
      </div>
      <div style={{textAlign:'center', fontSize:'20px'}}>{serverMessage}</div>
      <div style={{fontSize:'20px', display : (searchResults =='') ? 'none' : ''}}>
            Result: {searchResults} items
        </div>
      <div className='list_items'>
        {Array.isArray(serverData) && serverData.map((item, index) => (
          <div className='list_item-wrapper' key={index}>
            <div className='list_item'>
              <div className='list_item-discount-wrapper'>
                <div className={(Number(item.discount.slice(0, -1)) > 0) ?
                                       'list_item-discount' : ''}>
                    {item.discount} OFF
                  </div>
              </div> 
              <img src={img1} alt="" />
            </div>
            <div className='list_item_info'>
              <div className='list_item_name'>{item.name}</div>
              <div className='list_item_price'>${item.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div className='list-pages-wrapper'>
        <div className='list-pages'>
          <div className='list-page'
                onClick={handlePrevClick}
                style={{
                  display : (page==1 || displayedPages.length == 0) ? 'none' : ''
                 }}>
              Prev
          </div>
        {displayedPages.map((pageNum) => (
          <div
            key={pageNum}
            className={(page === pageNum) ? 'list-page-active' : 'list-page'}
            onClick={() => setPage(pageNum)}
          >
            {pageNum}
          </div>
        ))}
          <div className='list-page'
               onClick={handleNextClick}
               style={{
                       marginRight:0,
                       display : (page==maxPage || displayedPages.length ==0) ? 'none' : ''
                      }}
               >
            Next
          </div>
        </div>
      </div>
    </div>
  )
  };
  
export default FlowerList;
