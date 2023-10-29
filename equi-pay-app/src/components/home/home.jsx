import {Container, Grid, Paper} from "@mui/material";
import Groups from "./Groups";
import Friends from "./Friends";
import NeedToPayFees from "./Expenselist";


function Home() {
    return (
        <Container maxWidth="xl">
            <Paper elevation={2} style={{
                padding: '20px',
                marginTop: '100px'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Groups />
                    </Grid>
                    <Grid item xs={6}>
                        <NeedToPayFees />
                    </Grid>
                    <Grid item xs={3}>
                        <Friends />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
export default Home;