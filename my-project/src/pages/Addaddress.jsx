import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
//     INPUT FIELD COMPONENT    //
const InputField = ({type, placeholder, name, handlechange, address}) => (
  <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none
  text-grey-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handlechange}
    value={address[name]}
    required
  />
)

const Addaddress = () => {
  const { axios,user,navigate } = useAppContext()
const [address, setAddress] = useState({
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: ''
})

  const handlechange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }
    ))

  }
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      // API call
      const { data } = await axios.post('/api/address/add',{address});
      if(data.success){
        toast.success(data.message)
        navigate('/cart')
      }else{
        toast.error(data.message)
      }

      
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(()=>{
  if(!user){
    navigate('/cart')
  }
  },[])



  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='text-primary font-semibold'>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter firstname" name='firstName' />
                <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter lastname" name='lastName' />
            </div>

             <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter email" name='email' />
                 <InputField handlechange={handlechange} address={address} type="text"
                placeholder="street" name='street' />
                <div className='grid grid-cols-2 gap-4'>
                   <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter City" name='city' />
                 <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter State" name='state' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                   <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter zipcode" name='zipcode' />
                 <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter country" name='country' />
                </div>
                <InputField handlechange={handlechange} address={address} type="text"
                placeholder="enter phone number" name='phone' />
                <button className='w-full mt-6 bg-primary text-white py-3
                 hover:bg-primary-dull transition cursor-pointer uppercase'> 
                  Save Address
                </button>
          </form>
          
        </div>
        <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="address" />
      </div>
    </div>
  )
}

export default Addaddress
