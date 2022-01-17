

async function postData(url = 'http://localhost:3450/sign-up',
    data = {
        email: "u1@me.in",
        name: "u1",
        password: "u2"
    }
) {

    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })

    return response.json()
}

let options = {
    method: "POST",
    cors:"*",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Accept': 'application/json'
    }
}
options.body = {
    password: "u1",
    name: "u1",
    email: "u1@12.in"
}


fetch(uri='http://localhost:3450/playlists', options)
    .then(response => {
        return response.json()
    })
    .then(json => {
        console.log(json);
    })