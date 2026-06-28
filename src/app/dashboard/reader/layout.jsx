import { verifyRole } from '@/lib/core/Session';


const ReaderLayout = async ({ children }) => {
    await verifyRole('reader');
    
    return children;
};

export default ReaderLayout;