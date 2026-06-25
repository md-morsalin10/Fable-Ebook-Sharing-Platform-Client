import UsersTableClient from '@/components/Dashboard/admin/UsersTableClient';
import { getAllUsers } from '@/lib/api/users';
import React from 'react';


const AllUsersPage = async () => {
    // সার্ভার সাইড থেকে ডাটা ফেচ করা
    const allUsers = await getAllUsers() || [];
  
    return (
        <div className="min-h-screen bg-[#06090F] p-4 md:p-8 text-slate-100">
            <div className="max-w-6xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#E5BA73] font-serif">Manage Users</h1>
                    <p className="text-xs text-gray-400 mt-1">Overview and role control of all platform participants.</p>
                </div>

    
                <UsersTableClient initialUsers={allUsers} />
            </div>
        </div>
    );
};

export default AllUsersPage;