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

const Footer = () => {
  return (
    <footer style={{width:'1200px', marginBottom:'13px'}}>
      <div className='footer_part1'>
        <div className='ft-pt1-section1-noLeft'>
          <img src={footerPic1} alt="" />
          <div className='ft-pt1-section1-h1'>
          Garden Care
          </div>
          <div className='ft-pt1-section1-p'>
          We are an online plant shop offering a wide range of cheap and trendy plants.
          </div>
        </div>
        <div className='ft-pt1-rec'></div>
        <div className='ft-pt1-section1'>
          <img src={footerPic2} alt="" />
          <div className='ft-pt1-section1-h1'>
            Plant Renovation 
            </div>
            <div className='ft-pt1-section1-p'>
            We are an online plant shop offering a wide range of cheap and trendy plants.
            </div>
          </div>
        <div className='ft-pt1-rec'></div>
        <div className='ft-pt1-section1'>
          <img src={footerPic2} alt="" />
          <div className='ft-pt1-section1-h1'>
                Watering Graden
            </div>
          <div className='ft-pt1-section1-p'>
              We are an online plant shop offering a wide range of cheap and trendy plants.
            </div>
        </div>
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
        <div className='ft-pt2-sc1'>
          <img src={Logo} alt="ass" />
          </div>
        <div className='ft-pt2-sc2' >
          <img src={Location} alt="" />
          <div>
            70 West Buckingham Ave.
            Farmingdale, NY 11735
          </div>
        </div>
        <div className='ft-pt2-sc2' >
          <img src={Message} alt="" />
          <div>
            contact@greenshop.com
          </div>
        </div>
        <div className='ft-pt2-sc2'>
          <img src={Calling} alt="" />
          <div>
          +88 01911 717 490
          </div>
        </div>

     
      </div>
      <div className='footer_part3'>
        <div className='footer_part3-sc1'>
          <div className='footer_part3-sc1-h1'>My Account</div> 
          <div className='footer_part3-sc1-p'>My Account</div>
          <div className='footer_part3-sc1-p'>Our stores</div>
          <div className='footer_part3-sc1-p'>Contact us</div>
          <div className='footer_part3-sc1-p'>Career</div>
          <div className='footer_part3-sc1-p'>Specials</div>
        </div>
        <div className='footer_part3-sc2'>
          <div className='footer_part3-sc2-h1'>Help & Guide</div> 
          <div className='footer_part3-sc2-p'>Help Center</div>
          <div className='footer_part3-sc2-p'>How to Buy</div>
          <div className='footer_part3-sc2-p'>Shipping & Delivery</div>
          <div className='footer_part3-sc2-p'>Product Policy</div>
          <div className='footer_part3-sc2-p'>How to Return</div>          
        </div>
        <div className='footer_part3-sc3'>
          <div className='footer_part3-sc3-h1'>Categories</div> 
          <div className='footer_part3-sc3-p'>House Plants</div>
          <div className='footer_part3-sc3-p'>Potter Plants</div>
          <div className='footer_part3-sc3-p'>Seeds</div>
          <div className='footer_part3-sc3-p'>Small Plants</div>
          <div className='footer_part3-sc3-p'>Accessories</div>                                                  
        </div>
        <div className='footer_part3-sc4' >
          <div className='footer_part3-sc4-h1-1' >Social Media</div>
          <div><img className='footer_part3-sc4-img' src={SocialMedia} alt="" /></div>
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
