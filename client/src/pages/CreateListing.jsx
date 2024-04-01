import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { useState } from 'react'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 150,
        discountedPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fileNames, setFileNames] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    

    //console.log(formData);


    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 16) {
            setUploading(true);
            setImageUploadError(false);

            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
                setUploading(false);
            }).catch((error) => {
                setImageUploadError('Failed to upload image. Please ensure each image is no larger than 3MB.');
                setUploading(false);
            });
        } 

        else {
            setImageUploadError('You can upload a maximum of 15 images for each listing. Please remove any excess images.');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            setFileNames((prevFileNames) => [...prevFileNames, file.name]);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error)=>{
                    reject(error);
                }, 
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const  handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({...formData, type: e.target.id});
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({...formData, [e.target.id]: e.target.checked});
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({...formData, [e.target.id]: e.target.value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (formData.imageUrls.length < 1) {
                return setError('Listing creation requires at least one uploaded image. Please add an image to proceed.')
            }

            if (+formData.regularPrice < +formData.discountedPrice) {
                return setError('The discounted price should be less than the regular price. Please adjust and try again.');
            }
            
            setLoading(true);
            setError(false);
            
            const response = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (data.success === false) {
                setError(data.message);
            }

            navigate(`/listing/${data._id}`);
        }

        catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }


    return (
        <main className='p-6 max-w-4xl mx-auto'>
            <h1 className='text-4xl font-semibold text-center mb-8'>Create a New Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-8'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='Property Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name}/>
                    <textarea type='text' placeholder='Property Description' className='border p-3 rounded-lg h-32' id='description' maxLength='5000' minLength='10' required onChange={handleChange} value={formData.description}/>
                    <input type='text' placeholder='Property Address' className='border p-3 rounded-lg' id='address' maxLength='1000' minLength='10' required onChange={handleChange} value={formData.address}/>

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='sale' className='w-4 h-4' onChange={handleChange} checked={formData.type === 'sale'}/>
                            <label htmlFor='sale'>For Sale</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='rent' className='w-4 h-4' onChange={handleChange} checked={formData.type === 'rent'}/>
                            <label htmlFor='rent'>For Rent</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='parking' className='w-4 h-4' onChange={handleChange} checked={formData.parking}/>
                            <label htmlFor='parking'>Parking Spot</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='furnished' className='w-4 h-4' onChange={handleChange} checked={formData.furnished}/>
                            <label htmlFor='furnished'>Is Furnished</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='offer' className='w-4 h-4' onChange={handleChange} checked={formData.offer}/>
                            <label htmlFor='offer'>Special Offer</label>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedrooms' min='1' max='20' required className='p-3 border border-gray-300 rounded-lg w-24' onChange={handleChange} value={formData.bedrooms}/>
                            <p>Bedrooms</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='number' id='bathrooms' min='1' max='20' required className='p-3 border border-gray-300 rounded-lg w-24' onChange={handleChange} value={formData.bathrooms}/>
                            <p>Bathrooms</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='150' max='100000000000000' required className='p-3 border border-gray-300 rounded-lg w-24' onChange={handleChange} value={formData.regularPrice}/>
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                {formData.type === 'rent' && (
                                    <span className='text-xs'>($ / month)</span>
                                )}
                            </div>
                        </div>

                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input type='number' id='discountedPrice' min='0' max='100000000000000' required className='p-3 border border-gray-300 rounded-lg w-24' onChange={handleChange} value={formData.discountedPrice}/>
                                <div className='flex flex-col items-center'>
                                    <p>Discounted Price</p>
                                    {formData.type === 'rent' && (
                                    <span className='text-xs'>($ / month)</span>
                                )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:</p>
                    <p className='font-normal text-gray-600 ml-2'>The first image selected will be the main cover, you can upload up to fifteen images.</p>

                    <div className="flex gap-4">
                        <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                        <button type='button' disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>

                    <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
                    
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                            <div key={url} className='flex justify-between p-3 border items-center'>
                                <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                                    <div className='truncate text-center w-[10rem]'>
                                        <p>{fileNames[index]}</p>
                                    </div>
                                <button type="button" onClick={()=>handleRemoveImage(index)} className='p-3 text-red-500 rounded-lg uppercase hover:opacity-75'>Remove</button>
                            </div>
                        ))
                    }

                    <button disabled={loading || uploading} className='p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Creating...' : 'Create Listing'}</button>
                    {error && <p className='text-red-700'>{error}</p>}
                </div>
            </form>
        </main>
    );
}