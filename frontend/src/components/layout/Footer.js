import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <Fragment>
            <footer className="py-1 main_footer">
                <div className='row'>
                    <div className='col-sm-6'>
                        <div className='block'>
                            <div className='block_title'>
                                <h3>Links</h3>
                            </div>
                            <div className='block_content'> 
                            <ul className='links'>
                               <li><p> <Link to="/aboutus" style={{ textDecoration: 'none' }} className="ml-2 header_link">
                                        About Us
                                </Link></p></li>
                                <li>
                               <p> <Link to="/aboutus" style={{ textDecoration: 'none' }} className="ml-2 header_link">
                                        Contact Us
                                </Link></p></li>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div  className='col-sm-6'>
                    <div className="block">
                        <div className='block_title'>
                        <h3> Contact Information </h3>
                        </div>
                        <div className='block_content'>
                        <ul className='contant-info'>
                        <li><p>Address: </p>
                        <p>Khichapokhari, Newroad, Kathmandu</p></li>
                        <li>
                        <p> Phone</p>
                        <p>+9779808909009</p></li>
                        <li><p>Email</p>
                        <p>info@rajamatibags.gmai.com</p></li>
                        </ul>
                        </div>
                    </div>                   
                </div>
                </div>                              
            </footer>
            <div className='footer-bottom'>
                    <p className="text-center mt-1">
                    Shopping Cart - 2019-2020, All Rights Reserved
                    </p>
            </div>  
        </Fragment>
    )
}

export default Footer
