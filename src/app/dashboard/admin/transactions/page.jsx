import { getAllPayment } from '@/lib/api/bookPayment';
import React from 'react';
import TransactionsClient from './TransactionsClient';
import { getWritersPayment } from '@/lib/api/writerPayment';


const TransactionsPage = async () => {
    const payments = await getAllPayment() || [];
    const writersPayment = await getWritersPayment() || [];
    
    return (
        <div className="w-full space-y-6">
            <TransactionsClient payments={payments} writersPayment={writersPayment} />
        </div>
    );
};

export default TransactionsPage;