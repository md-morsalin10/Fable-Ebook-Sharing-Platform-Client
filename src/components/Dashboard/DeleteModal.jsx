import { AlertDialog, Button } from '@heroui/react';
import React from 'react';
import toast from 'react-hot-toast';

const DeleteModal = ({ bookId }) => {
    const handleDelete = async () => {
        //    const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
        //     if (!confirmDelete) return; 

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/delete/${bookId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Ebook deleted successfully!");
                window.location.reload();
            } else {
                toast.error(data.message || "Failed to delete ebook.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong during deletion.");
        }
    };

    return (
        <AlertDialog>
            <Button  className="text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                    Delete
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete ebook permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>This Ebook</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                slot="close" variant="danger">
                                Confirm
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteModal;