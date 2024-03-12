import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [showListingsClicked, setShowListingsClicked] = useState(false);
  const [showListingsMessage, setShowListingsMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);


  useEffect(() => {
    let timeout;
    if (deleteSuccess || deleteError) {
      timeout = setTimeout(() => {
        setDeleteSuccess(false);
        setDeleteError(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [deleteSuccess, deleteError]);
  

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }));
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } 

    catch (error){
      dispatch(updateUserFailure(error.message));
    }
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const response = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } 
    
    catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await fetch('/api/auth/signout');
      const data = await response.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
    } 
    
    catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };


  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
      if (data.length === 0) {
        setShowListingsMessage("You haven't created any listings yet.");
        setTimeout(() => {
          setShowListingsMessage('');
        }, 3000);
      }
    }

    catch (error) {
      showListingsError(true);
    }
  };



  const handleListingDelete = async (listingId) => {
    try {
      const response = await fetch(`/api/listing/delete/${listingId}`, { method: 'DELETE' });
      const data = await response.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
      setDeleteSuccess(true);
    } 

    catch (error) {
      console.log(error.message);
      setDeleteError(true);
    }
  }


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" />
        
        <p className="test-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error with image upload! Also the image should be less than 2 mb!</span>) : (
            filePercentage > 0 && filePercentage < 100) ? (
              <span className="text-black">{`Uploading ${filePercentage}% `}</span>
            ) : filePercentage === 100 ? (
              <span className="text-green-700">Image successfully  uploaded!</span>
            ) : (
            ''
          )}
        </p>
        
        <input type="text" id="username" placeholder="username" defaultValue={currentUser.username} className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" id="email" placeholder="email" defaultValue={currentUser.email} className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" id="password" placeholder="password" className="border p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Confirm Update'}</button>
        <Link className="bg-green-500 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to={"/create-listing"}>Create A Listing</Link>
      </form>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>

      <p className="text-red-700 mt-5">{error ? error : ''}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? 'Your profile was successfully updated. Changes have been saved.' : ''}</p>
      <button onClick={() => {handleShowListings(); setShowListingsClicked(true);}} className="flex flex-col items-center justify-center p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto">Show Listings</button>
      
        {showListingsClicked && (
          <div>
            {userListings.length === 0 && (
              <p className="text-center text-red-700 mt-5">{showListingsMessage}</p>
            )}
          </div>
        )}

      <div className="flex justify-center">
        <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>
        <p className='text-green-700 mt-5 self-center'>{deleteSuccess ? 'Listing successfully deleted!' : ''}</p>
        <p className='text-red-700 mt-5'>{deleteError ? 'Error deleting listing' : ''}</p>
      </div>
      

      {userListings && userListings.length > 0 &&
        <div className="flex flex-col gap-4">
          <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
          {userListings.map((listing) => (
            <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt='listing cover' className='h-16 w-16 object-contain' />
              </Link>

              <Link className='text-slate-700 font-semibold hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button onClick={()=>handleListingDelete(listing._id)} className='justify-center p-3 text-red-700 border-red-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto'>Delete</button>
                <button className='justify-center p-3 text-green-700 border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto'>Edit</button>
              </div>
            </div>
        ))}
      </div>}
    </div>
  );
}