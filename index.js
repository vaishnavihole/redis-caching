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
async function getRepos(req, res, next) {
    try{
        console.log('Fetching Data...');

    const  { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`)

    const data = await response.json();
    const repos = data.public_reops;


// Set Response
function  setResponse(username, repos) {
     return `<h2>${username} has ${repos} Github repos</h2>`;
}
// set data to Redis 
client.setEx(username, 3600,repos);


    res.send(setResponse(username, repos));
    }catch (err) {
        console.log(err);
        res.status(500)
    }
}
app.get('/reops/:username', getRepos)


app.listen(5000, ()=> {
    console.log(`App listening on port ${PORT}`);
});