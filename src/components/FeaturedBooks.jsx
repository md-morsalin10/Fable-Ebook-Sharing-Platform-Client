import { getFeaturedBooks } from '@/lib/api/books';
import React from 'react';
import BooksCard from './Books/BooksCard';
import FadeIn from './MotionWrapper/FadeIn';

const FeaturedBooks = async () => {
  const featuresBook = await getFeaturedBooks();
  // const featuresBook = [];

  if (!featuresBook || !Array.isArray(featuresBook)) {
    return <div className="text-gray-400 text-center p-6">No featured books found.</div>;
  }
return (

  <div className="w-full text-white py-14 px-6 md:px-12">
    <div className="max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
         <div>
            <h2 className="text-2xl font-semibold tracking-wide text-[#E5BA73]">
              Featured Ebooks
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Handpicked literary gems from our curated collection.
            </p>
         </div>
         <button className="text-xs text-[#E5BA73] hover:underline tracking-wider font-medium">
           View All Collection
         </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {featuresBook.map((book, index) => (
           <FadeIn key={book._id?.$oid || book._id} delay={index * 0.1}>
             <BooksCard book={book} />
           </FadeIn>
         ))}
       </div>
    </div>
  </div>
);
}; 

export default FeaturedBooks;