import * as React from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useHistory} from "react-router-dom";
import CardItem from "../components/CardItem";
import {useEffect, useState} from "react";
import {fetchPosts, Post} from "../service/api/apiGet";

const theme = createTheme({
    palette: {
        primary: {
            main: "#027c7a",
        },
        secondary: {
            main: "#f8f9fb",
            light: "#F5EBFF",
            contrastText: "#47008F",
        },
    },
});

const Home = () => {
    const [data, setData] = useState<Post[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items to display per page
    const history = useHistory();
    const handleCreate = () => {
        history.push('/create');
    }

    useEffect(() => {
        const fetchData = async () => {
            const postsData = await fetchPosts();
            setData(postsData);
        };
        fetchData().then();
    }, []);
    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedItems = data.slice(startIndex, endIndex);

    return (
        <div className="bg-[#f8f9fb] h-screen">
            <ThemeProvider theme={theme}>
                <div className="mx-10 flex-grow">
                    <div className="my-2 w-full h-full flex justify-between">
                        <h1 className="text-[#027c7a] font-bold flex-start-item text-xl">
                            {data.length} ARITCLES FOUND
                        </h1>
                        <div className="flex-end-item">
                            <Button variant="contained" onClick={() => handleCreate()}>Create Post</Button>
                        </div>
                    </div>
                    {displayedItems.map((item) => (
                        <CardItem key={item.id} myPost={item} />
                    ))}
                    <Pagination
                        count={Math.ceil(data.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handleChangePage}
                    />
                </div>
            </ThemeProvider>
        </div>
    );
};

export default Home;
