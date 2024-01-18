import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Post} from "../service/api/apiGet";
import DeleteButton from "./Button/DeleteButton";
import {Link, useHistory} from "react-router-dom";
import Button from "@mui/material/Button";

interface PostProps {
    myPost: Post;
}
const CardItem: React.FC<PostProps> = ({myPost}) => {
    const handleDeleteSuccess = () => {
        window.location.reload();
    };
    const history = useHistory();

    const handleEdit = (postId:any) => {
        history.push(`/edit/${postId}`);
    }
    return (
        <>
            <Card key={myPost.id} className='mb-5'>
                <div className='float-right pt-10'>
                    <Button variant='contained' onClick={() => handleEdit(myPost.id)} sx={{margin:1}}>Edit</Button>
                    <DeleteButton itemId={myPost.id} onSuccess={handleDeleteSuccess} />
                </div>
                <CardContent>
                    <Typography
                        sx={{fontSize: 14}}
                        color="text.secondary"
                        gutterBottom
                    >
                        {myPost.article}
                    </Typography>
                    <Typography variant="h5" component="div" className='text-primary'>
                        {myPost.title}
                    </Typography>
                    <Typography sx={{mb: 1.5}} color="text.secondary">
                        {myPost.createDate}
                    </Typography>
                    <Typography variant="body2">
                        {myPost.summary}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default CardItem;