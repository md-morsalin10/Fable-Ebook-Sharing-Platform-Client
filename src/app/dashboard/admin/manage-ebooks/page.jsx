import { getBooks } from '@/lib/api/books';
import React from 'react';
import EbooksTableClient from './EbooksTableClient';

const ManageAllEbooks = async () => {
  
    const books = await getBooks() || [];
    
    return (
        <div className="w-full space-y-4">
            <div>
                <h1 className="text-xl font-bold font-['Playfair_Display'] text-[#F0F4FF]">Manage All Ebooks</h1>
                <p className="text-xs text-[#8892A4] mt-0.5">Overview and controls of all library books.</p>
            </div>
            
            <EbooksTableClient initialBooks={books} />
        </div>
    );
};

export default ManageAllEbooks;