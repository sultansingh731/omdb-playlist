const express = require('express')
const app = express()
require('dotenv').config()

const jwt = require('jsonwebtoken')
app.use(express.json())


const users = [
    {
        "user": "user1",
        "email": "user@dev.in",
        "password": "user1",
        "visibility": "public",
        "playlist": [
            {
                "playlist_name": "play1",
                "visibility": "public",
                "movieIdList": ["movei1", "movie2"]
            }
        ]
    },
    {
        "user": "sultan",
        "password": "sultan",
        "email": "sultan@dev.in",
        "playlist": [
            {
                "playlist_name": "play1",
                "visibility": "public",
                "movieIdList": ["movei1", "movie2"]
            }
        ]
    }
]



function createUser(name, email, password) {
    return {
        name: name,
        email: email,
        password: password,
        playlist: []
    }
}

function createPlaylist(playlist_name, private = true, movieId = null) {
    return {
        playlist_name: playlist_name,
        visibility: private ? "private" : "public",
        "movieIdList": movieId ? [movieId] : []
    }
}


app.get('/playlists', (req, res) => {

    playlists = []
    users.forEach(user => {
        user.playlist.forEach((play) => {
            if (play.visibility == "public") {
                playlists.push(play)
            }
        })
    })
    console.log(playlists);

    res.json(playlists)
})


app.post('/sign-up', (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password

    users.find((user1) => {
        if (user1.email == email) {
            res.sendStatus(409)
        }
    })
    const user = { "email": email }

    const accessToken = generateAccessToken(user)
    const user1 = createUser(
        name,
        email,
        password
    )
    users.push(
        user1
    )
    res.json({
        accessToken: accessToken,
        user_data: user1
    })
    console.log(users);
})

app.post('/sign-in', authenticateToken, (req, res) => {
    const email = req.body.email
    const password = req.body.password
    var current_user = null
    const user = { "email": email }

    users.find((user1) => {
        if (user1.email == email) {
            if (user1.password == password) {
                current_user = user1
            } else {
                res.sendStatus(401)
            }
        }
    })
    if (current_user == null) {
        res.sendStatus(403)
    } else {
        const accessToken = generateAccessToken(user)
        res.json({
            accessToken: accessToken,
            user_data: current_user
        })
    }

})


function authenticateToken(req, res, nex) {
    const token = req.headers['token']
    if (token == null) {
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.error(err);
        if (err) return res.sendStatus(403)
        req.user = user
        nex()
    })

}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`port started...@${port}`)
})