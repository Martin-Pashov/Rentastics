import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, setSignOutMessage } from "../redux/user/userSlice";
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

    uploadTask.on(
      'state_changed', 
      (snapshot) => {
        const progress = 
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
          setFormData({ ...formData, avatar: downloadURL })
        );
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      
      //const signOutMessage = 'Your profile was successfully updated. Changes have been saved.';
      //dispatch(setSignOutMessage(signOutMessage));
      setTimeout(() => {
        //dispatch(setSignOutMessage(''));
        setUpdateSuccess(false);
      }, 3000);
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
  };


  return (
    <div className="p-3 max-w-2xl mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={() => fileRef.current.click()} src={formData.avatar || (currentUser && currentUser.avatar) || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"} alt='profile' className="rounded-full h-24 w-24 object-cover border border-slate-600 cursor-pointer self-center mt-2 hover:opacity-50" />
        <p onClick={() => fileRef.current.click()} className="text-gray-500 text-sm text-center mt-2 cursor-pointer hover:opacity-50" id="text">Update photo</p>

        <p className="test-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">Error with image upload! Also the image should be less than 2 mb!</span>) : (
            filePercentage > 0 && filePercentage < 100) ? (
              <span className="text-black">{`Uploading ${filePercentage}% `}</span>
            ) : filePercentage === 100 ? (
              <span className="text-green-700">Image successfully uploaded!</span>
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

      <p className="text-red-700 mt-5 self-center">{error ? error : ''}</p>
      <p className="text-green-700 mt-5 mb-6 justify text-center">{updateSuccess ? 'Your profile was successfully updated. Changes have been saved.' : ''}</p>
      <button onClick={() => {handleShowListings(); setShowListingsClicked(true);}} className="flex flex-col items-center justify-center p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 w-50% mx-auto">View Your Properties</button>
      
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
      
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-6">
          <h1 className="text-center mt-7 text-2xl font-semibold">Your Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
            {userListings.map((listing) => (
              <div key={listing._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg">
                <Link to={`/listing/${listing._id}`} className="block">
                  <img src={listing.imageUrls[0]} alt="listing cover" className="w-full object-cover h-48 sm:h-56 md:h-64 lg:h-64 xl:h-64 hover:scale-105 transition-scale duration-300 filter brightness-90 hover:brightness-100" />
                </Link>

                <div className="p-4">
                  <Link to={`/listing/${listing._id}`} className="block text-center text-slate-700 font-semibold text-lg sm:text-xl hover:underline truncate">
                    {listing.name}
                  </Link>

                  <div className="flex items-center justify-center mt-4 space-x-5">
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="px-6 py-3 text-sm lg:text-base text-green-700 border border-green-700 rounded-lg uppercase hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">Edit</button>
                    </Link>
                    <button onClick={() => handleListingDelete(listing._id)} className="px-6 py-3 text-sm lg:text-base text-red-700 border border-red-700 rounded-lg uppercase hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}