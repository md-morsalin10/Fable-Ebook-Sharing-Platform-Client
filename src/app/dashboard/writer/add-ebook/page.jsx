"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, TextArea, Select, ListBox, Button, FieldError } from "@heroui/react";
import { createBook } from "@/lib/action/books";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function AddEbook() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

   const { data: session} = authClient.useSession() 
   const user = session?.user
   console.log(user)

  const genres = [
    { id: "fiction", name: "Fiction" },
    { id: "mystery", name: "Mystery" },
    { id: "romance", name: "Romance" },
    { id: "sci-fi", name: "Sci-Fi" },
    { id: "fantasy", name: "High Fantasy" },
    { id: "horror", name: "Horror" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("title");
    const genre = formData.get("genre");
    const price = formData.get("price");
    const description = formData.get("description");
    const coverImageFile = formData.get("coverImage");

    if (!coverImageFile || coverImageFile.size === 0) {
      alert("Please select a cover image.");
      setLoading(false);
      return;
    }

    // ১. imgBB তে ছবি আপলোড করার প্রসেস
    const imgData = new FormData();
    imgData.append("image", coverImageFile);

    try {
      const imgBbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const imgBbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgBbKey}`, {
        method: "POST",
        body: imgData,
      });
      const imgBbResult = await imgBbResponse.json();

      if (imgBbResult.success) {
        const imageUrl = imgBbResult.data.display_url;

        // ২. ব্যাকএন্ড এপিআই অবজেক্ট তৈরি
        const ebookData = {
          title,
          genre,
          price: parseFloat(price),
          description,
          coverImage: imageUrl,
          status: "unpublished",
          isPurchased: false,
          dateUploaded: new Date().toISOString(),
          writerId: user?.id,
          writerName: user?.name,
          writerEmail: user?.email,
        };

        const response = await createBook(ebookData);
        console.log(response, "response");

        if (response.insertedId) {
          toast.success("Ebook added successfully!");
          form.reset();
          setFileName("");
        } else {
          toast.error("Database saving failed.");
        }
      } 
    } catch (error) {
      console.error(error);
        toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#111625] border border-[#1e2640] p-8 rounded-2xl shadow-2xl">
        
        <h2 className="text-2xl font-semibold text-[#e5b869] font-serif mb-6">
          Add Ebook
        </h2>

        <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          
          {/* Book Title */}
          <TextField isRequired name="title" type="text">
            <Label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Book Title</Label>
            <Input 
              placeholder="e.g. The Midnight Alchemist" 
              className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 outline-none w-full focus:border-[#e5b869] transition"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          {/* Synopsis / Description */}
          <TextField isRequired name="description">
            <Label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Description</Label>
            <TextArea 
              placeholder="Describe the soul of your story..." 
              rows={5}
              className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 outline-none w-full focus:border-[#e5b869] transition resize-none"
            />
            <FieldError className="text-red-400 text-xs mt-1" />
          </TextField>

          <div className="grid grid-cols-2 gap-4">
            {/* Literary Genre (Hero UI v3.1.0 Custom Select) */}
            <div className="flex flex-col">
              <Label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Literary Genre</Label>
              <Select name="genre" isRequired className="w-full" placeholder="Select Genre">
                <Select.Trigger className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 flex items-center justify-between focus:border-[#e5b869] transition">
                  <Select.Value className="text-white" />
                  <Select.Indicator className="text-[#a0aec0]" />
                </Select.Trigger>
                <Select.Popover className="bg-[#111625] border border-[#232d4b] rounded-lg shadow-xl mt-1">
                  <ListBox className="p-1 text-zinc-300">
                    {genres.map((g) => (
                      <ListBox.Item 
                        key={g.id} 
                        id={g.id} 
                        textValue={g.name}
                        className="p-2 hover:bg-[#161c2e] hover:text-[#e5b869] rounded cursor-pointer flex items-center justify-between"
                      >
                        {g.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Valuation / Price */}
            <TextField isRequired name="price" type="number">
              <Label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Price</Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-[#e5b869] font-medium">$</span>
                <Input 
                  placeholder="29.99" 
                  step="0.01"
                  min="0"
                  className="bg-[#161c2e] border border-[#232d4b] text-white rounded-lg p-2.5 pl-7 outline-none w-full focus:border-[#e5b869] transition"
                />
              </div>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>
          </div>

          {/* Cover Art Drag & Drop Area */}
          <div>
            <Label className="text-[#a0aec0] text-sm font-medium mb-1.5 block">Cover Image</Label>
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-[#e5b869]/30 rounded-xl cursor-pointer bg-[#161c2e]/40 hover:bg-[#161c2e]/80 hover:border-[#e5b869] transition group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                <svg className="w-8 h-8 mb-2 text-[#e5b869]/70 group-hover:text-[#e5b869] transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 8l-3-3m3 3l3-3M3 15a9 9 0 1118 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1z" />
                </svg>
                <p className="text-sm text-[#a0aec0] font-medium">
                  {fileName || "Drag & drop cover image"}
                </p>
                <p className="text-xs text-zinc-500 mt-1">Recommended: 1600x2560px (JPG, PNG)</p>
              </div>
              <input 
                type="file" 
                name="coverImage" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => setFileName(e.target.files[0]?.name || "")}
              />
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#e5b869] hover:bg-[#d4a34f] text-[#0b0f19] font-bold py-3 rounded-lg shadow-lg shadow-[#e5b869]/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Uploading...." : "Add Ebook"}
          </Button>

        </Form>
      </div>
    </div>
  );
}