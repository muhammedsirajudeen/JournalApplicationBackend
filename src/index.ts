import express from 'express';
import cors from "cors"
const app = express();
const port = 3000;
import AuthRoute from "@/routes/AuthenticationRoutes"
import JournalRoutes from './routes/JournalRoutes';
//authentication routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//remember to change this later
app.use(cors(
    {
        credentials:true
    }
))

app.use('/auth',AuthRoute)
app.use('/journal',JournalRoutes)
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
