import React, {useEffect, useState} from 'react';
import {Snackbar, TextareaAutosize, TextField} from "@mui/material";
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import Button from "@mui/material/Button";
import {fetchPostbyId, Post} from "../service/api/apiGet";
import {createPosts} from "../service/api/apiPost";
import {v4 as uuidv4} from 'uuid';
import {updatePosts} from "../service/api/apiPut";
import {useHistory} from "react-router-dom";


const initialFormData: Post = {
    id: '',
    title: '',
    summary: '',
    article: '',
    createDate: '',
};

interface PostFormProps {
    isEditMode?: boolean;
    postId?: string;
}

const PostForm: React.FC<PostFormProps> = ({isEditMode = false, postId}) => {
    const [formData, setFormData] = useState<Post>({});
    const [error, setError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const generateId = uuidv4();
    const history = useHistory();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
            id: isEditMode ? postId : generateId
        }));
    };

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
        <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    ));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isEditMode) {
            updatePosts(formData, postId).then(() => {
                setOpenSnackbar(true);
                setSnackbarMessage('Post edit successfully!');
                setSnackbarSeverity('success');
            })
                .catch((error: any) => {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Error edit post.');
                    setSnackbarSeverity('error');
                });
        } else {
            createPosts(formData)
                .then(() => {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Post created successfully!');
                    setSnackbarSeverity('success');
                    setFormData(initialFormData); // Reset the form data here
                })
                .catch((error: any) => {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Error creating post.');
                    setSnackbarSeverity('error');
                });
        }
    };

    useEffect(() => {
        if (isEditMode && postId) {
            fetchPostbyId(postId)
                .then((post: Post | null) => {
                    if (post !== null) {
                        console.log(post);
                        setFormData(post);
                    } else {
                        console.error('Post data is null.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching post data:', error);
                });
        }
    }, [isEditMode, postId]);

    return (
        <>
            <div className='bg-[#f8f9fb] h-screen'>
                <form className='m-auto w-[500px]' onSubmit={handleSubmit}>
                    <h1 className='flex justify-center'>{isEditMode ? 'EDIT POST' : 'CREATE NEW POST'}</h1>
                    <div>
                        <h2>Article Title</h2>
                        <TextField
                            required
                            name="title"
                            placeholder="Please input article title"
                            fullWidth
                            className='!my-4'
                            variant="standard"
                            value={formData.title || ''}
                            onChange={handleChange}
                            error={error}
                            helperText={error ? 'Field cannot be empty' : ''}
                        />
                    </div>
                    <div>
                        <h2>Article date</h2>
                        <TextField
                            required
                            name="createDate"
                            type='date'
                            fullWidth
                            className='!my-4'
                            variant="standard"
                            value={formData.createDate ? formData.createDate : ''}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                    <div>
                        <h2>Publisher Of Article *</h2>
                        <TextField
                            required
                            name="article"
                            placeholder="Please input text"
                            fullWidth
                            className='!my-4'
                            variant="standard"
                            value={formData.article || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <h2>Article Summary *</h2>
                        <TextareaAutosize
                            required
                            name='summary'
                            placeholder='Please input summary'
                            className='!my-4 w-full border-solid border-[1px] p-2'
                            minRows={4}
                            value={formData.summary || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex justify-center'>
                        <Button variant="contained" type='submit'>{isEditMode ? 'EDIT POST' : 'CREATE POST'}</Button>
                    </div>
                </form>
                <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
                    <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
                </Snackbar>
            </div>
        </>
    );
};

export default PostForm;