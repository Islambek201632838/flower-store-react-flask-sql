import React from 'react';
import Logo from '../img/Logo.png'
import Location from '../img/Location.png'
import Message from '../img/Message.png'
import Calling from '../img/Calling.png'
import SocialMedia from '../img/Social Media.png'
import payment from '../img/payment.png'
import footerPic1 from '../img/footer-pic1.png'
import footerPic2 from '../img/footer-pic2.png'
import footerPic3 from '../img/footer-pic3.png'

const ft_pt3_Data = [
  {'className': 'footer_part3-sc1', 'sectionName':'My Account' },
  {'className': 'footer_part3-sc2', 'sectionName':'Help & Guide' },
  {'className': 'footer_part3-sc3', 'sectionName':'Categories' },
]

const footerLinks = {
  'My Account': ['My Account', 'Our Stores', 'Contact us', 'Career', 'Specials'],

  'Help & Guide': ['Help Center', 'How to Buy', 'Shipping & Delivery', 
                  'Product Policy', 'How to Return'],

  'Categories': ['House Plants', 'Potter Plants', 'Seeds', 
                 'Small Plants', 'Accessories']
}

const ft_pt1_Data = [
   {
    'image': footerPic1, 
    'title': 'Garden Care',
    'description': 'We are an online plant shop offering a wide range of cheap and trendy plants.',
   },

   {
    'image': footerPic2,
    'title': 'Plant Renovation',
    'description': 'We are an online plant shop offering a wide range of cheap and trendy plants.',
   },

   {
    'image': footerPic3,  
    'title': 'Watering Graden',
    'description': 'We are an online plant shop offering a wide range of cheap and trendy plants.',
   },
]

const ft_pt2_Data = [
      {
        'image': Logo,
        'info': ''
      }, 
      {
        'image': Location,
        'info': `70 West Buckingham Ave.
        Farmingdale, NY 11735`
      }, 
      {
        'image': Message,
        'info': 'contact@greenshop.com'
      },

      { 
        'image': Calling,
        'info': '+88 01911 717 490'
      }


]

const Footer = () => {
  return (
    <footer style={{width:'1200px', marginBottom:'13px'}}>
      <div className='footer_part1'>
        {ft_pt1_Data.map((item, index) => (
        <>
          <div className={(index==0) ? `ft-pt1-section1-noLeft` : 'ft-pt1-section1' } key={index}>
            <img src={item['image']} alt="" />
            <div className='ft-pt1-section1-h1'>
              {item['title']}
            </div>
            <div className='ft-pt1-section1-p'>
              {item['description']}
            </div>
          </div>
          {
            (index != ft_pt1_Data.length - 1) ? (
              <div className='ft-pt1-rec' key={index}></div>
            ) : '' 
          }
        </>
      ))}

        <div className='ft-pt1-section2'>
          <div className='ft-pt1-section2-h1'>
              Would you like to join newsletters?
          </div>
          <div style={{display:'flex', flexDirection:'row', marginBottom:'17px'}}>
            <input type="text"
                   placeholder='user your email adress...' />
            <button>Join</button>
          </div>
        
        <div className='ft-pt1-section2-p'>
            We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! 
        </div>
        </div>
      </div>

      <div className='footer_part2'>
        {ft_pt2_Data.map((item, index) => { 
          return (
            <div className={(index==0) ? 'ft-pt2-sc1' : 'ft-pt2-sc2'}>
              <img src={item['image']} alt="ass" />
              <div>{item['info']}</div>
            </div>
          )})}
      </div>

      <div className='footer_part3'>
        {ft_pt3_Data.map(sectionItem =>{
          return (
            <div className={sectionItem['className']}>
              <div className={`${sectionItem['className']}-h1`}>{sectionItem['sectionName']}</div>
              {footerLinks[sectionItem['sectionName']].map(footerItem => {
                return (
                  <div className={`${sectionItem['className']}-p`}>{footerItem}</div>
                )})} 
              </div>
          )
        })}
        
        <div className='footer_part3-sc4' >
          <div className='footer_part3-sc4-h1-1' >Social Media</div>
          <div>
            <img className='footer_part3-sc4-img' src={SocialMedia} alt="" />
          </div>
          <div className='footer_part3-sc4-h1-2'>We accept</div>
          <img src={payment} alt="" />
        </div>
      </div>
      <div className='footer_part4'>
      © 2021 GreenShop. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
