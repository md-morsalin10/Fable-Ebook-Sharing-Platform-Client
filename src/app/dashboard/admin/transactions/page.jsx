// src/app/dashboard/admin/transactions/page.jsx (আপনার পাথ অনুযায়ী)
import { getAllPayment } from '@/lib/api/bookPayment';
import React from 'react';
import TransactionsClient from './TransactionsClient';


const TransactionsPage = async () => {
    const payments = await getAllPayment() || [];
    
    return (
        <div className="w-full space-y-6">
            <TransactionsClient payments={payments} />
        </div>
    );
};

export default TransactionsPage;