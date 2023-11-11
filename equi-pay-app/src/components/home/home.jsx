import {Container, Grid, Paper} from "@mui/material";
import Groups from "./Groups";
import Friends from "./Friends";
import NeedToPayFees from "./Expenselist";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
    const nav = useNavigate();
    const {userId} = useParams();
    const goToGroup = () => {
        nav(`/group/${userId}`, {state: {userId: userId}})
    }
    return (
        <div>
        <Container maxWidth="xl">
            <Paper elevation={2} style={{
                padding: '20px',
                marginTop: '100px'
            }}>
                <Grid container spacing={2}>
                <button onClick = {goToGroup}>create/view groups</button>
                    
                   
                </Grid>
            </Paper>
        </Container>
        </div>

    )
}
export default Home;