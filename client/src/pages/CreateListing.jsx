import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage';
import { useState } from 'react'
import { app } from '../firebase';

export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });

    console.log(formData);

    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
            });
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
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
            )
        });
    }

    return (
        <main className='p-6 max-w-4xl mx-auto'>
            <h1 className='text-4xl font-semibold text-center mb-8'>Create a New Listing</h1>
            <form className='flex flex-col sm:flex-row gap-8'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='Property Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                    <textarea type='text' placeholder='Property Description' className='border p-3 rounded-lg h-32' id='description' maxLength='5000' minLength='10' required />
                    <input type='text' placeholder='Property Address' className='border p-3 rounded-lg' id='address' maxLength='1000' minLength='10' required />

                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='sale' className='w-4 h-4' />
                            <label htmlFor='sale'>For Sale</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='rent' className='w-4 h-4' />
                            <label htmlFor='rent'>For Rent</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='parking' className='w-4 h-4' />
                            <label htmlFor='parking'>Parking Spot</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='furnished' className='w-4 h-4' />
                            <label htmlFor='furnished'>Is Furnished</label>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='checkbox' id='offer' className='w-4 h-4' />
                            <label htmlFor='offer'>Special Offer</label>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-24' />
                            <p>Bedrooms</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='number' id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-24' />
                            <p>Bathrooms</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-24' />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($/month)</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <input type='number' id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300 rounded-lg w-24' />
                            <div className='flex flex-col items-center'>
                                <p>Discounted Price</p>
                                <span className='text-xs'>($/month)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold'>Images:</p>
                    <p className='font-normal text-gray-600 ml-2'>The first image selected will be the main cover, you can upload up to six images.</p>

                    <div className="flex gap-4">
                        <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                        <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>

                    <button className='p-3 bg-green-500 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
                </div>
            </form>
        </main>
    );
}