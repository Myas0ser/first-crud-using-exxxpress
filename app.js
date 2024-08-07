        // 1478530123
const express = require('express')
const app = express();
const { nanoid } = require('nanoid')
let users = [
    { id: 1, name: "hamda", email: "hamda@gmail.com", age: 50 },
    { id: 2, name: "mahmoud", email: "mahmoud@gmail.com", age: 22 },
    { id: 3, name: "ans", email: "ans@gmail.com", age: 20 },
    { id: 4, name: "youssef", email: "youssef@gmail.com", age: 19 }

]
let auth = (req, res, next) => {
    let flag = true
    if (flag) {
        next();
    } else {
        res.json({ message: "not auth user" })
    }
}
app.use(express.json())
    // app.use(auth)

app.get('/', (req, res) => {
    // res.send('wwww')
    res.json({
        message: "welcomeexpress "
    })
})
app.get('/about', auth,
    (req, res, next) => {
        res.json({
            message: "about page"
        })
    })
app.post('/addUser', (req, res) => {
    console.log(req.body);
    const { name, email } = req.body
    const findUser = users.find((ele) => {
        return ele.email == email
    })

    if (findUser) {
        res.json({ message: "user/email already exist" })
    } else {
        let assignObj = {
            id: nanoid(),
            name,
            email
        }
        users.push(assignObj)
        res.json({
            message: "Done",
            data: users
        })
    }


})



app.get('/getUserByID/:id', (req, res) => {

    console.log(req.params);
    // const id = req.params.id
    const { id } = req.params
    console.log(id);
    const user = users.find((ele) => {
        return ele.id == id
    })
    console.log(user);
    if (user) {
        res.json({ message: "Done", user })
    } else {
        res.json({ message: "in-valid id" })
    }
})

app.put('/updateUser/:id', auth, (req, res) => {
    const { id } = req.params
    const { name, age, email } = req.body;
    const user = users.find((ele) => { return ele.id == id })
    if (user) {
        const emailExist = users.find((ele) => { return ele.email == email })
        if (emailExist) {
            res.json({ message: "email already exist" })
        } else {
            user.name = name
            user.age = age
            user.email = email
            users = users.map((ele) => { return ele.id == user.id ? user : ele })
            res.json({ message: "Done", users })
        }
    } else {
        res.json({ message: "in-valid id email" })
    }
})


app.delete('/deleteUser/:id', auth, (req, res) => {


        const { id } = req.params

        const user = users.find((ele) => {
            return ele.id == id
        })


        if (user) {
            users = users.filter((ele) => {
                return ele.id !== user.id
            })
            res.json({ message: "done", data: users })
        } else {
            res.json({ message: "in-valid userID" })
        }

    })
    // app.get('/addUser', (req, res) => {
    //     const { name, email } = req.query
    //     const findUser = users.find((ele) => {
    //         return ele.email == email
    //     })

//     if (findUser) {
//         res.json({ message: "user/email already exist" })
//     } else {
//         let assignObj = {
//             id: nanoid(),
//             name,
//             email
//         }
//         users.push(assignObj)
//         res.json({
//             message: "Done",
//             data: users
//         })
//     }


// })


app.listen(3000, () => {
    console.log('runinnnng..................');
})