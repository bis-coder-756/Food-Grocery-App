// import React from 'react'

// const Loading = () => {
//   return (
//    <div className="flex justify-center items-center h-screen bg-white">
//   <div className="relative flex items-center justify-center">
    
//     {/* Outer Ring */}
//     <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>

//     {/* Inner Pulse */}
//     <div className="absolute w-10 h-10 bg-primary rounded-full animate-ping opacity-30"></div>

//     {/* Center Dot */}
//     <div className="absolute w-6 h-6 bg-primary-dull rounded-full"></div>

//   </div>
// </div>
//   )
// }

// export default Loading




import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const Loading = () => {

//  show only few seconds then redirect user on myorders page
const { navigate } = useAppContext()
let { search } = useLocation()
const query = new URLSearchParams(search)
const nextUrl = query.get('next');

useEffect(()=>{
 if(nextUrl){
    setTimeout(()=>{
        navigate(`/${nextUrl}`)
    },5000)
 }
},[nextUrl])

  return (
   <div className="flex justify-center items-center h-screen">
  <div className="relative w-16 h-16 animate-spin">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#3fae7a]" />
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#36996b]" />
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#3fae7a]" />
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#36996b]" />
  </div>
</div>
  )
}

export default Loading
