import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
      const toggleVisibility = ()=>{
        if (window.scrollY > 500) {
            setVisible(true)
        }else{
            setVisible(false)
        }
      };

      window.addEventListener("scroll", toggleVisibility);
      return()=>window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const ScrollToTop = ()=>{
        window.scrollTo({
            top:0,
            behavior: 'smooth'
        })
    }
    

  return (
    visible &&(
    <motion.button 
    initial={{opacity: 0, y: 50}}
    animate={{opacity: 1, y: 0}}
    exit={{opacity: 0, y: 50}}
    transition={{duration: 0.3}}
    onClick={ScrollToTop}
    className='fixed bottom-6 cursor-pointer bg-white z-50 right-6 p-3 flex justify-center items-center transition-all rounded-md shadow-xl hover:bg-yellow-500 hover:text-white'>
            <FaArrowUp size={20}/>
    </motion.button>
    )
  )
}
