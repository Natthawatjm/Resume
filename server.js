const express = require('express');
const mysql = require('mysql');
const path = require('path');

const _ = require('lodash');
const multer = require('multer');
const session = require('express-session');

const app = express();
const Path = path.join(__dirname, "resumes");
const admin = path.join(__dirname, "admin");

const bodyParser = require('body-parser')
const cors = require('cors');

app.use(express.static(Path));
app.use(express.static(admin));
app.use(express())
app.use(express.json());
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const con = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12625578",
    password: "fuCzi2qY1D", // เปลี่ยนรหัสผ่าน
    database: 'sql12625578' // เปลี่ยนชื่อ Database Name
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/home', (req, res) => {
    res.sendFile(path.join(Path, "index.html"))
})
app.get('/pleaselogin', (req, res) => {
    res.sendFile(path.join(Path, "home0.html"))
})
app.get('/resume', (req, res) => {
    res.sendFile(path.join(Path, "resume.html"))
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(Path, "login.html"))
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(Path, "register.html"))
})
app.get('/templet', (req, res) => {
    res.sendFile(path.join(Path, "templet.html"))
})
app.get('/categories', (req, res) => {
    res.sendFile(path.join(Path, "categories.html"))
})
app.get('/template1', (req, res) => {
    res.sendFile(path.join(Path, "templet7.html"))
})
app.get('/template2', (req, res) => {
    res.sendFile(path.join(Path, "templet8.html"))
})
app.get('/template3', (req, res) => {
    res.sendFile(path.join(Path, "templet11.html"))
})
app.get('/template4', (req, res) => {
    res.sendFile(path.join(Path, "templet12.html"))
})
app.get('/template5', (req, res) => {
    res.sendFile(path.join(Path, "templet13.html"))
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(Path, "contact.html"))
})
app.get('/createprofile', (req, res) => {
    res.sendFile(path.join(Path, "creatprofile.html"))
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(Path, "about.html"))
})
app.get('/image', (req, res) => {
    res.sendFile(path.join(Path, "image.html"))
})
app.get('/removeBG', (req, res) => {
    res.sendFile(path.join(Path, "removeBG.html"))
})
app.get('/acticle', (req, res) => {
    res.sendFile(path.join(Path, "acticle.html"))
})
app.get('/Acticle', (req, res) => {
    res.sendFile(path.join(Path, "acticle.html"))
})
app.get('/Profile', (req, res) => {
    res.sendFile(path.join(Path, "profile.html"))
})
//-------------------ADMIN------------------------------

app.get('/dashbord', (req, res) => {
    res.sendFile(path.join(admin, "index.html"))
})
app.get('/loginadmin', (req, res) => {
    res.sendFile(path.join(admin, "loginadmin.html"))
})
app.get('/registeradmin', (req, res) => {
    res.sendFile(path.join(admin, "registeradmin.html"))
})
app.get('/formsadmin', (req, res) => {
    res.sendFile(path.join(admin, "forms.html"))
})
app.get('/formuser', (req, res) => {
    res.sendFile(path.join(admin, "formuser.html"))
})

//------------------------------------------------USER----------------------------------------------------//

app.post('/login-user', (req, res) => {
    const { email, password } = req.body;

    con.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (error, result) => {
        if (result.length) {
            res.json(result[0]);
        } else {
            res.json('User not found');
        }
    })

})

app.post('/api/register', (req, res) => {
    const { fname, lname, name, password, phone, address, email} = req.body;
    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    try {
        con.query('INSERT INTO users (fname, lname, name, password, phone, address, email) VALUES (?, ?, ?, ?, ?, ?, ?)', [fname, lname, name, password, phone, address, email],
            (err, results) => {
                if (err) {
                    console.error('Error inserting user data:', err);
                    return res.status(500).json({ message: 'Server error' });
                }
                console.log('User data inserted successfully');
                return res.status(200).json({ message: 'Success' });
            }
        );
    } catch (error) {
        console.error('Error generating JWT:', error);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.get('/api/data', (req, res) => {
    const query = 'SELECT COUNT(*) AS member_count FROM users WHERE is_member = 1';
    con.query(query, (error, results, fields) => {
        if (error) {
            console.error('Failed to fetch data from MySQL:', error);
            res.status(500).send('Failed to fetch data from MySQL');
            return;
        }
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'success',
            Result: results[0]
        })
    });
});

app.get('/api/getuser', (req, res) => {
    try {
        con.query('SELECT * FROM users', [],
        (err, data, fil) => {
            if(data && data[0]) {

                // for (let i = 0; i < data.length; i++) {
                //     delete data[i].id                    
                // }

                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'success',
                    Result: data
                })
            }
            else {
                console.log('ERR 1! : not found data')
                return res.status(200).json({
                    RespCode: 400,
                    RespMessage: 'bad: not found data',
                    Log: 1
                })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

app.delete('/api/deleteuser', (req, res) => {
    var id = _.get(req, ["body", "id"]);

    try {
        if(id) {
            con.query('delete from users where id = ? ', [
                parseInt(id)
            ], (err, resp, fil) => {
                if(resp) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                    })
                }
                else {
                    console.log('ERR 2! : bad sql')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: bad sql',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR 1! : Invalid id')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid id',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})
app.put('/api/updateuser', (req, res) => {
    var id = _.get(req, ["body", "id"]);
    var fname = _.get(req, ["body", "fname"]);
    var lname = _.get(req, ["body", "lname"]);
    var name = _.get(req, ["body", "name"]);
    var phone = _.get(req, ["body", "phone"]);
    var address = _.get(req, ['body', 'address']);
    var email = _.get(req, ['body', 'email']);

    try {
        if(fname && lname &&name && phone && address && email ) {
            con.query('update users set fname = ? ,lname = ?,name = ? , phone = ?, address = ? , email = ? where id =?', [fname,lname,name,phone,address,email,parseInt(id)], (err, resp, field) => {
                if(resp) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success'
                    })
                }
                else {
                    console.log('ERR 2! : Bad sql')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: bad sql',
                        Log: 2
                    })
                }
            }) 
        }
        else {
            console.log('ERR 1! : Invalid request')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid request',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

//-------------------------ADMIN--------------------------------------

app.post('/login-admin', (req, res) => {
    const { emails, password } = req.body;

    con.query('SELECT * FROM admin WHERE emails = ? AND password = ?', [emails, password], (error, result) => {
        if (result.length) {
            res.status(200).json(result[0]);
        } else {
            res.status(500).json('User not found');
        }
    })

})

app.get('/api/dataadmin', (req, res) => {
    const query = 'SELECT COUNT(*) AS member_countadmin FROM admin WHERE is_member = 1';
    con.query(query, (error, results, fields) => {
        if (error) {
            console.error('Failed to fetch data from MySQL:', error);
            res.status(500).send('Failed to fetch data from MySQL');
            return;
        }
        return res.status(200).json({
            RespCode: 200,
            RespMessage: 'success',
            Result: results[0]
        })
    });
});


var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './admin/images/imageadmin/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
var upload = multer({
    storage: storage
});

app.post('/api/registeradmin', upload.single('image'),  (req , res) => {

    const { username, password, phones, emails} = req.body;

    if (!req.file) {
        console.log("No file upload");
    }else {
        var imageType = req.file.filename
        var image = 'http://127.0.0.1:4200/images/imageadmin/' + imageType
        var insertData = "INSERT INTO admin(username,password,image,phones,emails)VALUES(?,?,?,?,?)"
        con.query(insertData, [username,password,image,phones,emails], (err, result) => {
            if (err) throw err
            console.log("Register Success")
        })
    }
    return res.redirect('/loginadmin')
});


app.get('/api/getadmin', (req, res) => {
    try {
        con.query('SELECT * FROM admin', [],
        (err, data, fil) => {
            if(data && data[0]) {

                // for (let i = 0; i < data.length; i++) {
                //     delete data[i].id                    
                // }

                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'success',
                    Result: data
                })
            }
            else {
                console.log('ERR 1! : not found data')
                return res.status(200).json({
                    RespCode: 400,
                    RespMessage: 'bad: not found data',
                    Log: 1
                })
            }
        })
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

app.put('/api/updateadmin', (req, res) => {
    var id = _.get(req, ["body", "id"]);
    var username = _.get(req, ["body", "username"]);
    var emails = _.get(req, ["body", "emails"]);
    var phones = _.get(req, ['body', 'phones']);

    try {
        if(id && username && phones && emails ){
            con.query('update admin set username = ? , phones = ? , emails = ? where id =?', [username,phones,emails,parseInt(id)], (err, data, fil) => {
                if(data) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'success',
                    })
                }
                else {
                    console.log('ERR 2! : Update fail')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: Update fail',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR 1! : Invalid data')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid data',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

app.delete('/api/delete', (req, res) => {
    var id = _.get(req, ["body", "id"]);

    try {
        if(id) {
            con.query('delete from admin where id = ? ', [
                parseInt(id)
            ], (err, resp, fil) => {
                if(resp) {
                    return res.status(200).json({
                        RespCode: 200,
                        RespMessage: 'good',
                    })
                }
                else {
                    console.log('ERR 2! : bad sql')
                    return res.status(200).json({
                        RespCode: 400,
                        RespMessage: 'bad: bad sql',
                        Log: 2
                    })
                }
            })
        }
        else {
            console.log('ERR 1! : Invalid id')
            return res.status(200).json({
                RespCode: 400,
                RespMessage: 'bad: Invalid id',
                Log: 1
            })
        }
    }
    catch(error) {
        console.log('ERR 0! :', error)
        return res.status(200).json({
            RespCode: 400,
            RespMessage: 'bad',
            Log: 0
        })
    }
})

app.listen(4200, (req, res) => {
    console.log('http://localhost:4200/')
})

module.exports = app