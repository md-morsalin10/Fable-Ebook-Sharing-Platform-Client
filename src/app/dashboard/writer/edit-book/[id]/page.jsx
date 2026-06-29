'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getClientToken } from '@/lib/core/tokenClient';

const EditEbookPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const fileInputRef = useRef(null);
    
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        genre: '',
        price: '',
        coverImage: '' 
    });

    const [imagePreview, setImagePreview] = useState(''); 

    const genres = [
        { id: "fiction", name: "Fiction" },
        { id: "mystery", name: "Mystery" },
        { id: "romance", name: "Romance" },
        { id: "sci-fi", name: "Sci-Fi" },
        { id: "fantasy", name: "High Fantasy" },
        { id: "horror", name: "Horror" }
    ];

    useEffect(() => {
        const fetchBookData = async () => {
             
            try {
                const token = await getClientToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/${id}`,{
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });
                const data = await res.json();
                
                if (res.ok) {
                    setFormData({
                        title: data.title || '',
                        description: data.description || '',
                        genre: data.genre || '',
                        price: data.price || '',
                        coverImage: data.coverImage || ''
                    });
                    if (data.coverImage) {
                        setImagePreview(data.coverImage);
                    }
                } else {
                    toast.error("Failed to load book data.");
                }
            } catch (error) {
                console.error("Error fetching book:", error);
                toast.error("Error connecting to server.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBookData();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file (PNG/JPG)');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
            setFormData(prev => ({ ...prev, coverImage: reader.result })); 
        };
        reader.readAsDataURL(file);
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        const token = await getClientToken();
        console.log(token, "from token")
    
        let finalImageUrl = formData.coverImage; 

        const isNewFileSelected = formData.coverImage.startsWith('data:image');

        if (isNewFileSelected) {
            try {
                const file = fileInputRef.current.files[0];
                if (file) {
                    const imgData = new FormData();
                    imgData.append("image", file);

                    const imgBbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
                    const imgBbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBbKey}`, {
                        method: "POST",
                        body: imgData,
                    });
                    const imgBbResult = await imgBbResponse.json();

                    if (imgBbResult.success) {
                        finalImageUrl = imgBbResult.data.display_url; 
                    } else {
                        toast.error("ImgBB upload failed. Try again.");
                        setUpdating(false);
                        return;
                    }
                }
            } catch (error) {
                console.error("Image upload error:", error);
                toast.error("Something went wrong while uploading the new image.");
                setUpdating(false);
                return;
            }
        }

      
        try {
            const updatedEbookData = {
                title: formData.title,
                description: formData.description,
                genre: formData.genre,
                price: parseFloat(formData.price),
                coverImage: finalImageUrl 
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/update/${id}`, {
               
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                 },
                body: JSON.stringify(updatedEbookData),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Ebook updated successfully!");
                router.push('/dashboard/writer/my-book');
            } else {
                toast.error(data.message || "Failed to update ebook.");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong during update.");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return <div className="text-center py-20 text-gray-400">Loading book data...</div>;
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center py-10 px-4 bg-[#06090F]">
           
            <div className="w-full max-w-xl bg-[#111625] border border-[#1e2640] p-8 rounded-2xl shadow-2xl">
                
                <h2 className="text-2xl font-semibold text-[#e5b869] font-serif mb-6">
                    Update Ebook
                </h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Book Title */}
                    <div className="flex flex-col">
                        <label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Book Title</label>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. The Midnight Alchemist"
                            className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 outline-none w-full focus:border-[#e5b869] transition text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Describe the soul of your story..."
                            className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 outline-none w-full focus:border-[#e5b869] transition resize-none text-sm"
                        />
                    </div>

                    {/* Genre এবং Price গ্রিড */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Literary Genre */}
                        <div className="flex flex-col">
                            <label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Literary Genre</label>
                            <select 
                                name="genre" 
                                value={formData.genre}
                                onChange={handleChange}
                                required
                                className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 outline-none w-full focus:border-[#e5b869] transition text-sm cursor-pointer"
                            >
                                <option value="">Select Genre</option>
                                {genres.map((g) => (
                                    <option key={g.id} value={g.id}>
                                        {g.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col">
                            <label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Price</label>
                            <div className="relative flex items-center">
                                <span className="absolute left-3 text-[#e5b869] font-medium">$</span>
                                <input 
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    placeholder="29.99"
                                    className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 pl-7 outline-none w-full focus:border-[#e5b869] transition text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 🖼️ Cover Image আপলোড এবং লাইভ প্রিভিউ এরিয়া */}
                    <div>
                        <label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Cover Image</label>
                        
                        {/* হিডেন ফাইল ইনপুট */}
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden" 
                        />

                        {/* ক্লিকযোগ্য কাস্টম ড্রাগ অ্যান্ড ড্রপ এরিয়া */}
                        <div 
                            onClick={() => fileInputRef.current.click()}
                            className="flex flex-col items-center justify-center w-full min-h-[144px] border-2 border-dashed border-[#e5b869]/30 rounded-xl cursor-pointer bg-[#161c2e]/40 hover:bg-[#161c2e]/80 hover:border-[#e5b869] transition text-center px-4 py-4"
                        >
                            {imagePreview ? (
                                <div className="flex flex-col items-center gap-2">
                                    <img 
                                        src={imagePreview} 
                                        alt="Book Cover Preview" 
                                        className="h-24 w-16 object-cover rounded shadow-md border border-[#1e2640]"
                                    />
                                    <span className="text-xs text-[#e5b869] font-medium bg-[#e5b869]/10 px-2.5 py-1 rounded">
                                        Click to Change Image
                                    </span>
                                </div>
                            ) : (
                                <>
                                    <svg className="w-8 h-8 mb-2 text-[#e5b869]/70" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M3 15a9 9 0 1118 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1z" />
                                    </svg>
                                    <p className="text-sm text-[#a0aec0] font-medium">
                                        Drag & drop or click to upload cover image
                                    </p>
                                    <p className="text-xs text-zinc-500 mt-1">Recommended: 1600x2560px (JPG, PNG)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={updating}
                        className="w-full mt-2 bg-[#e5b869] hover:bg-[#d4a34f] text-[#0b0f19] font-bold py-3 rounded-lg shadow-lg shadow-[#e5b869]/10 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                        {updating ? "Saving Changes..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEbookPage;