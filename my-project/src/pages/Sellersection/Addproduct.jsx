import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Addproduct = () => {
    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [offerPrice, setOfferPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const {axios} = useAppContext();

//     const handlesubmit = async (e) => {
//         try {
//            e.preventDefault();
           
//            const productData = {
//             name,
//             description: description.split('\n'),
//             category,
//             price: Number(price),
//             offerPrice: Number(offerPrice)
//            }
// // using this product data we will create the form data that will be send on the API request
//         const formData = new FormData()
//         formData.append('productData',JSON.stringify(productData));
//         // in this form data we have to append images also so we have multiple images so to add multiple images we add for loop
//         for (let i = 0; i < files.length; i++) {
//             formData.append('images', files[i])
//             //so it will add all the images in form data
//         }
//         // so  now we can send the form data to add product API
      
//       const {data} = await axios.post('/api/product/add',formData)
//       if(data.success){
//         toast.success(data.message)
//         // after that we reset all the form fields
//         setName("")
//         setDescription("")
//        setCategory("")
//        setOfferPrice("")
//      setPrice("")
//      setFiles([])
        
//       }else{
//         //if data.success is false
//         toast.error(data.message)

//       }
//         } catch (error) {
//         toast.error(error.message)
//         }

//     }

const handlesubmit = async (e) => {
    e.preventDefault();

    // prevent double click
    if (loading) return;

    try {
        setLoading(true);

        const productData = {
            name,
            description: description.split('\n'),
            category,
            price: Number(price),
            offerPrice: Number(offerPrice)
        };

        const formData = new FormData();

        formData.append('productData', JSON.stringify(productData));

        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        const { data } = await axios.post('/api/product/add', formData);

        if (data.success) {
            toast.success(data.message);

            setName("");
            setDescription("");
            setCategory("");
            setOfferPrice("");
            setPrice("");
            setFiles([]);
        } else {
            toast.error(data.message);
        }

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
};
    return (
        <div className="no-scrollbar flex-1 h[95vh] overflow-y-scroll flex flex-col justify-between">
            <form onSubmit={handlesubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} >
                                <input onChange={(e) => {
                                    const updatedfiles = [ ...files ]
                                    updatedfiles[index] = e.target.files[0]
                                    // so the uploaded image will be saved in the files state
                                    //  at the index position //
                                    setFiles(updatedfiles)
                                }}
                                    accept="image/*" type="file" id={`image${index}`} hidden />
                                <img className="max-w-24 cursor-pointer" src={files[index] ?
                                    URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="uploadArea" width={100} height={100} />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input onChange={(e) => setName(e.target.value)} value={name}
                        id="product-name" type="text" placeholder="product name + quanity / apple 1 kg" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                        id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select onChange={(e) => setCategory(e.target.value)} value={category}

                        id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.path}>{category.path}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input onChange={(e) => setPrice(e.target.value)} value={price}
                            id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                            id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                </div>
              <button
    disabled={loading}
    className={`px-8 py-2.5 bg-primary text-white font-medium rounded 
    ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
>
    {loading ? "Adding..." : "ADD"}
</button>
            </form>
        </div>
    )
}

export default Addproduct
