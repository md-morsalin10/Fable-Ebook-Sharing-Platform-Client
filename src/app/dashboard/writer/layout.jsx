import { verifyRole } from '@/lib/core/Session';


const WriterLayout = async ({ children }) => {
    await verifyRole('writer');
    
    return children;
};

export default WriterLayout;