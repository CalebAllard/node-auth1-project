const bc = require('bcryptjs');
const router = require('express').Router();
const db = require('./users-modle.js');
router.get('/', (req,res) => {
    if (req.headers.authorization) {
        bc.hash(req.headers.authorization, 8, (err, hash) => {
            if (err) {
                res.status(500).json({ oops: "it broke" });
            } else {
                db.find()
                .then(ret => {
                     res.status(200).json(ret);
                })
                .catch(err => {
                    console.log(err);
                     res.status(500).json({err:'server err when getting users'});
                });
            }
        });
    } else {
        res.status(400).json({ error: "missing header" });
    }
});

router.post("/register", (req, res) => {
    let user = req.body;

    const hash = bc.hashSync(req.body.password, 8);

    user.password = hash;

    db.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    db.findBy({ username })
        .first()
        .then(user => {
            if (user && bc.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
            } else {
                res.status(401).json({ message: "You shall not pass" });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});


module.exports = router;