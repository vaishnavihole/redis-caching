import express from 'express';
import fetch from 'node-fetch';
import redis from 'redis';
import dotenv from 'dotenv'
dotenv.config();


const PORT = process.env.PORT || 5000;


const client =  redis.createClient({
    url: process.env.REDIS_URL
})
const app = express();

// make request to Github for data
function getRepos(req, res, next) {
    try{
        console.log('Fetching Data...');

    

    }catch (err) {
        console.log(err);
        res.status(500)
    }
}
app.get('/reops/:username', getRepos)

app.listen(5000, ()=> {
    console.log(`App listening on port ${PORT}`);
});