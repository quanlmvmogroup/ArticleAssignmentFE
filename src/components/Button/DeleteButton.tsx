import { Button, Modal } from '@mui/material';
import React from "react";
import {deletePosts} from "../../service/api/apiDelete";

interface DeleteButtonProps {
    itemId?: string;
    onSuccess: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ itemId, onSuccess }) => {
    const [open, setOpen] = React.useState(false);

    const handleDelete = async () => {
        if (itemId !== undefined) {
            await deletePosts(itemId);
            onSuccess();
            setOpen(false);
        }
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" color="error" onClick={handleOpen} sx={{margin:1}}>
                Delete
            </Button>
            <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className='bg-white border border-' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', borderRadius:'4px' }}>
                    <p>Are you sure you want to delete this item?</p>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button variant="contained" color="error" onClick={handleDelete} sx={{marginRight:2}}>
                            Delete
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeleteButton;