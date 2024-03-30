import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();

  return (
    <footer className='lg:h-[15vh] md:h-[15vh] h-auto border-t flex justify-center items-center p-4 text-center'>
        <div className='w-[90%]'>
        <p>&copy; All rights reserved <span className='text-[#3939b2] font-bold my-2'>0xKhemmie-Ray.ETH</span>.</p>
        <p>Web3Bridge-X {currentYear}</p>
        </div>
    </footer>
  )
}

export default Footer