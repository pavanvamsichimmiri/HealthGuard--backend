
const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../model/Schema');
const jwt = require('jsonwebtoken');

//register route
router.post("/Register", async (req, res) => {
    let { name ,username, password } = req.body;
    //check the user already exist with this email
    const takenEmail = await User.findOne({ username: username });
    if (takenEmail) {
        return res.status(405).json("username already exists");
    } else {
        password = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name,
            username,
            password,            
        });
        if(newUser){
            res.status(201).json({
                name:newUser.name,
                username:newUser.username
            })
        }
        else{
            res.status(400)
            throw new Error("Error Occured!")
        }
        await newUser.save();
        return res.json("user account created sucessfully");
    }
});

//login user
router.post("/Login", async (req, res) => {
    try {
        const { username, password } = req.body;
        //confirm the user is register or not
        const userexist = await User.findOne({ username: username });
        if (!userexist) {
            return res.status(404).json('user not found');
        }
        bcrypt.compare(password, userexist.password).then((isCorrect) => {
            if (isCorrect) {
                let payload = {
                    user: {
                        id: userexist.id
                    }
                }
                jwt.sign(payload, 'newsecreate', { expiresIn: 360000000 }, (err, token) => {
                    if (err) throw err;
                    return res.status(200).json({ token: token, user: userexist.user });
                });
            }
            else {
                return res.status(405).json('password is incorrect');
            }
        }
        );
    } catch (error) {
        return res.status(500).json("server error")
    }

});




module.exports = router;
