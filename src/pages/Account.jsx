import { useState, useEffect, useRef } from 'react'
import FormInput from '../components/FormInput.jsx'
import { useAuth } from '../context/AuthContext.jsx'
const Account = () => {
  const { user, updateUserInfo, message, setMessage, setUser } = useAuth();
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone1: '',
    phone2: '',
    address: '',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const rmprofileRef = useRef(false);

  // 1. First effect - Initialize form data only once
  useEffect(() => {
    if (user && !hasInitialized) {
      const savedData = localStorage.getItem('profile_info_update');
      const initialData = savedData
        ? JSON.parse(savedData)
        : {
          id: user.id || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          username: user.username || '',
          email: user.email || '',
          phone1: user.phone1 || '',
          phone2: user.phone2 || '',
          address: user.address || '',
        };

      setFormData(initialData);
      setImagePreview(user.image || null);
      setHasInitialized(true);
    }
  }, [user, hasInitialized]);

  // 2. Second effect - Persist form data changes
  useEffect(() => {
    if (hasInitialized) {
      localStorage.setItem('profile_info_update', JSON.stringify(formData));
    }
  }, [formData, hasInitialized]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({
          type: 'error',
          text: 'Image size must be less than 5MB'
        })
        return true;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setMessage({
          type: 'error',
          text: 'Please select a valid image file'
        })
        return
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      // setFormData(prev => ({...prev, image:imageFile}))
      // setUser(prev => ({ ...prev, image: imageFile }));
    }
  }

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    rmprofileRef.current = true;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone1) {
      setMessage({
        type: 'error',
        text: 'Required fields must be filled'
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setMessage({
        type: 'error',
        text: 'Please enter a valid email address'
      })
      return
    }

    // Phone validation (only digits, 10–15)
    const phoneRegex = /^\d{10,15}$/
    if (!phoneRegex.test(formData.phone1.replace(/\D/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Primary phone must be 10-15 digits'
      })
      return
    }

    if (formData.phone2 && !phoneRegex.test(formData.phone2.replace(/\D/g, ''))) {
      setMessage({
        type: 'error',
        text: 'Secondary phone must be 10-15 digits'
      })
      return
    }

    const data = new FormData();

    // Append all form data except rmprofileimage
    for (const key in formData) {
      if (key !== 'rmprofileimage') {
        data.append(key, formData[key]);
      }
    }

    // Append image file if exists
    if (imageFile) {
      data.append('image', imageFile);
    }

    // Append rmprofileimage if true
    console.log('check if there is rmpI', formData.rmprofileimage);

    if (rmprofileRef.current) {
      data.append('rmprofileimage', 'true');
    }
    console.log('test abde:::::::::::::::::::::::::::::::');
    console.log(imagePreview);
    console.log(imageFile);
    console.table(user);
    console.table(formData);
    console.log('test abde:::::::::::::::::::::::::::::::');
    try {
      const success = await updateUserInfo(data);
      if (success) {
        rmprofileRef.current = false;
        localStorage.removeItem('profile_info_update');
        setFormData(prev => ({ ...prev, image: imagePreview }));
        setMessage({
          type: 'success',
          text: 'Your information has been updated successfully!'
        });
        // setUser(formData);
        setUser(prev => ({ ...prev, image: imagePreview }));


        // Reset removal flag after successful update
      }
    } catch (error) {
      console.error(error)
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred.'
      })
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-royal-blue mb-6">Account Information</h1>

        {message.text ? (
          <div
            className={`p-4 rounded-md mb-6 ${message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
              }`}
          >
            {message.text}
          </div>
        ) : <div
          className={`p-4 rounded-md mb-6 bg-white-50 text-white`}
        >
          test
        </div>}

        {/* Profile Image Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Profile Image
          </label>
          <div className="flex items-center space-x-6">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                  <i className="fas fa-user text-5xl"></i>

                </div>
              )}
              {imagePreview && (
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <i className="fas fa-times text-xs"></i>
                </button>
              )}
            </div>
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
              >
                {imagePreview ? 'Change Image' : 'Upload Image'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <p className="text-sm text-gray-500 mt-2">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Primary Phone"
            name="phone1"
            value={formData.phone1}
            onChange={handleChange}
            required
          />

          <FormInput
            label="Secondary Phone (Optional)"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
          />
        </div>

        <FormInput
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={() => {
              handleSubmit(); setUser(prev => ({ ...prev, image: imagePreview }));
            }}
            className="bg-[#3B5BFF] hover:bg-blue-800 text-white font-medium py-2 px-6 rounded-md transition duration-150"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div >
  )
}

export default Account
