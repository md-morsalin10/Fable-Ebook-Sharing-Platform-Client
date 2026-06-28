import { verifyRole } from '@/lib/core/Session';


const AdminLayout = async ({ children }) => {
    await verifyRole('admin');
    
    return children;
};

export default AdminLayout;