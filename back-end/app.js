//load express
const express = require('express');
const app = express();
let port = process.env.PORT || 3000;

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");

const { encrypt, decrypt } = require('./db/models/crypto');
const jwt = require('jsonwebtoken')


//Load in the mongoose models using index.js file instead load one at a time
const { Test, User, Social, ProductPost, Address, VariantsOption, Product } = require("./db/models");

/** MIDDLEWARE */

//load Middleware
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }))

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

// check whether the request has a valid JWT access token
// means that the id of session is an authenticated user    
let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

// Verify Refresh Token Middleware (which will be verifying the session)
let verifySession = (req, res, next) => {
        // grab the refresh token from the request header
        let refreshToken = req.header('x-refresh-token');

        // grab the _id from the request header
        let _id = req.header('_id');

        User.findByIdAndToken(_id, refreshToken).then((user) => {
            if (!user) {
                // user couldn't be found
                return Promise.reject({
                    'error': 'User not found. Make sure that the refresh token and user id are correct'
                });
            }


            // if the code reaches here - the user was found
            // therefore the refresh token exists in the database - but we still have to check if it has expired or not

            req.user_id = user._id;
            req.userObject = user;
            req.refreshToken = refreshToken;

            let isSessionValid = false;

            user.sessions.forEach((session) => {
                if (session.token === refreshToken) {
                    // check if the session has expired
                    if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                        // refresh token has not expired
                        isSessionValid = true;
                    }
                }
            });

            if (isSessionValid) {
                // the session is VALID - call next() to continue with processing this web request
                next();
            } else {
                // the session is not valid
                return Promise.reject({
                    'error': 'Refresh token has expired or the session is invalid'
                })
            }

        }).catch((e) => {
            res.status(401).send(e);
        })
    }
    /** END MIDDLEWARE */


app.get('/', (req, res) => {
    Test.find({} /** no query fields */ ).then((tests) => {
        res.send("<h1>Eureka!</h1><h4>Tutto fuziona corettamente!</h4><br><h2>Test Data</h2><p>" + tests + "</p>");
    }).catch((e) => {

    });
})

/**
 * GET /test
 * Purpose: get all list
 */
app.get('/test', (req, res) => {
    //return an array of the tests in the database
    Test.find({} /** no query fields */ ).then((tests) => {
        res.send(tests)
    }).catch((e) => {

    });
})

/**
 * POST /test
 * Purpose: create a test
 */
app.post('/test', (req, res) => {
    //create a new test and return the new test document back to the user (wich includes the id)
    //the list information (fields) will be passed in via the JSON request body
    let name = req.body.name; //for to do this. is require install and setup body-parser
    let newTest = new Test({
        name
    });

    newTest.save().then((testDoc) => {
        //the full document is returned
        res.send(testDoc);
    });
})

/**
 * PATCH /list/:id
 * Purpose: Update specified test
 */
app.patch('/test/:id', (req, res) => {
    //update the spcecified test with the new values specified in the JSON body of the request
    Test.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })
})

/**
 * DELETE /test/:id
 * Purpose: Delete specified test
 */
app.delete('/test/:id', (req, res) => {
    //delete the specified test
    Test.findOneAndRemove({
        _id: req.params.id
    }).then((removedTestDoc) => {
        res.send(removedTestDoc);
    })
})

/* USER ROUTES */

/**
 * POST /users
 * Purpose: Sign up
 */
app.post('/users', (req, res) => {
    // User sign up


    let body = req.body;
    let newUser = new User(body);

    let id = newUser._id;
    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        // Session created successfully - refreshToken returned.
        // now we geneate an access auth token for the user

        return newUser.generateAccessAuthToken().then((accessToken) => {
            // access auth token generated successfully, now we return an object containing the auth tokens
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        //before send response send activation email
        let email = body.email;
        let transporter = nodemailer.createTransport({
            // service: 'Gmail',
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'christophe.roob57@ethereal.email', // ethereal user
                pass: 'eRzpWfMc6wHcabkkXY' // ethereal password
            },
        });

        const token = encrypt(email);
        // const idtoken = encrypt(id);
        console.log("id:", id);
        const idtoken = encrypt(id + '');
        console.log(idtoken.content);

        const msg = {
                from: 'christophe.roob57@ethereal.email', // sender address
                to: `${email}`, // list of receivers
                subject: "Activation Email", // Subject line
                text: "Test Prova", // plain text body
                html: `<a href="https://localhost:4200/account/mailVerification?id_token=${idtoken.content}-${idtoken.iv}&mail=${email}&v_token=${token.content}-${token.iv}">clicca per verificare l'email</a>`
            }
            // send mail with defined transport object
        transporter.sendMail(msg).then(info => {
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        })

        // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
        res
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        console.log(e);
        res.status(400).send(e);
    })
})


/**
 * POST /users/login
 * Purpose: Login
 */
app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // Session created successfully - refreshToken returned.
            // now we geneate an access auth token for the user

            return user.generateAccessAuthToken().then((accessToken) => {
                // access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
})

/** testing */
app.get('/users', (req, res) => {
    //return an array of the tests in the database
    User.find({} /** no query fields */ ).then((users) => {
        res.send(users)
    }).catch((e) => {

    });
})

app.get('/users/:user_id', authenticate, (req, res) => {
    //return an array of the tests in the database
    User.find({ _id: req.params.user_id } /** no query fields */ ).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.send(e);
    });
})

/** testing */
app.delete('/users/:email', (req, res) => {
    //delete the specified test
    User.findOneAndRemove({
        email: req.params.email
    }).then((removedTestDoc) => {
        res.send(removedTestDoc);
    })
})

/**
 * GET /users/me/access-token
 * Purpose: generates and returns an access token
 * _id and x-refresh-token in the header of req
 */
app.get('/users/me/access-token', verifySession, (req, res) => {
    // we know that the user/caller is authenticated and we have the user_id and user object available to us
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})


/**
 * SOCIAL ROUTE
 */

/**
 * GET /users/:userId/socials
 * Purpose: get all list
 */
app.get('/users/:userId/socials', (req, res) => {
    //return an array of the tests in the database
    Social.find({
        _userId: req.params.userId
    }).then((socials) => {
        res.send(socials)
    }).catch((e) => {

    });
})

/**
 * POST /users/:userId/socials
 * Purpose: create a test
 */
app.post('/users/:userId/socials', (req, res) => {
    //create a new social and return the new social document back to the user (wich includes the id)
    //the list information (fields) will be passed in via the JSON request body
    let name = req.body.name; //for to do this. is require install and setup body-parser
    let followers = req.body.followers;
    let nickName = req.body.nickName;
    let socialId = req.body.socialId;

    let newSocial = new Social({
        followers,
        name,
        nickName,
        socialId,
        _userId: req.params.userId
    });

    newSocial.save().then((socialDoc) => {
        //the full document is returned
        res.send(socialDoc);
    });
})

/**
 * PATCH /users/:userId/social/:socialId
 * Purpose: Update specified social
 */
app.patch('/users/:userId/socials/:socialId', (req, res) => {
    //update the spcecified Social with the new values specified in the JSON body of the request
    Social.findOneAndUpdate({
        _id: req.params.socialId,
        _userId: req.params.userId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })

})

/**
 * DELETE /users/:userId/social/:socialID
 * Purpose: Delete specified social
 */
app.delete('/users/:userId/socials/:socialId', (req, res) => {
    //delete the specified social
    Social.findOneAndRemove({
        _id: req.params.socialId,
        _userId: req.params.userId
    }).then((removedSocialDoc) => {
        res.send(removedSocialDoc);
    })
})


/**
 * PRODUCTPOST ROUTE
 */

/**
 * GET /users/:userId/productpost
 * Purpose: get all list
 */
app.get('/users/:userId/productposts', (req, res) => {
    //return an array of the productpost in the database of specific user
    ProductPost.find({
        _userId: req.params.userId,
        isADraft: req.query.isADraft 
    }).then((productposts) => {
        res.send(productposts)
    }).catch((e) => {

    });
})

/**
 * POST /users/:userId/productposts
 * Purpose: create a productpost
 */
app.post('/users/:userId/productposts', (req, res) => {
    //create a new social and return the new productposts document back to the user (wich includes the id)
    //the list information (fields) will be passed in via the JSON request body
    let title = req.body.title; //for to do this. is require install and setup body-parser
    let summary = req.body.summary;
    let linkSocial = req.body.linkSocial;
    let description = req.body.description;
    let customFilter = req.body.customFilter;
    let isADraft = true; //if created in this way is a draft
    let img = req.body.img;

    let newProductPost = new ProductPost({
        title,
        summary,
        linkSocial,
        description,
        customFilter,
        isADraft,
        img,
        _userId: req.params.userId
    });

    newProductPost.save().then((productPostDoc) => {
        //the full document is returned
        res.send(productPostDoc);
    });
})

/**
 * PATCH /users/:userId/productposts/:productpostId
 * Purpose: Update specified productpost
 */
app.patch('/users/:userId/productposts/:productpostId', (req, res) => {
    //update the spcecified ProductPost with the new values specified in the JSON body of the request
    ProductPost.findOneAndUpdate({
        _id: req.params.productpostId,
        _userId: req.params.userId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })

})

/**
 * DELETE /users/:userId/productposts/:productpostId
 * Purpose: Delete specified productpost
 */
app.delete('/users/:userId/productposts/:productpostId', (req, res) => {
    //delete the specified social
    ProductPost.findOneAndRemove({
        _id: req.params.productpostId,
        _userId: req.params.userId
    }).then((removedProductPostDoc) => {
        res.send(removedProductPostDoc);
    })
})


/**
 * ADDRESS ROUTE
 */

/**
 * GET /users/:userId/adresses
 * Purpose: get all addresses of specific user
 */
app.get('/users/:userId/addresses', (req, res) => {
    //return an array of the productpost in the database of specific user
    Address.find({
        _userId: req.params.userId
    }).then((address) => {
        res.send(address)
    }).catch((e) => {

    });
})

/**
 * POST /users/:userId/addresses
 * Purpose: create a address
 */
app.post('/users/:userId/addresses', (req, res) => {
    //create a new social and return the new address document back to the user (wich includes the id)
    //the list information (fields) will be passed in via the JSON request body
    let country = req.body.country; //for to do this. is require install and setup body-parser
    let city = req.body.city;
    let zipCode = req.body.zipCode;
    let street = req.body.street;
    let CAP = req.body.CAP;
    let type = req.body.type;

    let newAddress = new Address({
        country,
        city,
        zipCode,
        street,
        CAP,
        type,
        _userId: req.params.userId
    });

    newAddress.save().then((AddressDoc) => {
        //the full document is returned
        res.send(AddressDoc);
    });
})

/**
 * PATCH /users/:userId/addresses/:addressId
 * Purpose: Update specified address
 */
app.patch('/users/:userId/addresses/:addressId', (req, res) => {
    //update the spcecified address with the new values specified in the JSON body of the request
    Address.findOneAndUpdate({
        _id: req.params.addressId,
        _userId: req.params.userId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })

})

/**
 * DELETE /users/:userId/addresses/:addressId
 * Purpose: Delete specified address
 */
app.delete('/users/:userId/addresses/:addressId', (req, res) => {
    //delete the specified social
    Address.findOneAndRemove({
        _id: req.params.addressId,
        _userId: req.params.userId
    }).then((removedAddressDoc) => {
        res.send(removedAddressDoc);
    })
})



/**
 * VARIATNSOPTION ROUTE
 */

/**
 * GET /users/:userId/variantsoptions
 * Purpose: get all variantsoptions of user:userId
 */
app.get('/users/:userId/variantsoptions', (req, res) => {
    //return an array of the productpost in the database of specific user
    VariantsOption.find({
        _userId: req.params.userId
    }).then((variantsoptions) => {
        res.send(variantsoptions)
    }).catch((e) => {

    });
})

/**
 * POST /users/:userId/variantsoptions
 * Purpose: create a variantsoptions
 */
app.post('/users/:userId/variantsoptions', (req, res) => {
    //create a new social and return the new variantsoptions document back to the user (wich includes the id)
    //the list information (fields) will be passed in via the JSON request body
    let title = req.body.title; //for to do this. is require install and setup body-parser
    let options = req.body.options;

    let newVariantsOption = new VariantsOption({
        title,
        options,
        _userId: req.params.userId
    });

    newVariantsOption.save().then((variantsOptionDoc) => {
        //the full document is returned
        res.send(variantsOptionDoc);
    });
})

/**
 * PATCH /users/:userId/variantsoptions/:variantsoptionsId
 * Purpose: Update specified variantsoptions
 */
app.patch('/users/:userId/variantsoptions/:variantsoptionsId', (req, res) => {
    //update the spcecified ProductPost with the new values specified in the JSON body of the request
    VariantsOption.findOneAndUpdate({
        _id: req.params.variantsoptionsId,
        _userId: req.params.userId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })

})

/**
 * DELETE/users/:userId/variantsoptions/:variantsoptionsId
 * Purpose: Delete specified variantsoptions
 */
app.delete('/users/:userId/variantsoptions/:variantsoptionsId', (req, res) => {
    //delete the specified social
    VariantsOption.findOneAndRemove({
        _id: req.params.variantsoptionsId,
        _userId: req.params.userId
    }).then((removedVariantsOptiontDoc) => {
        res.send(removedVariantsOptiontDoc);
    })
})



/**
 * PRODUCT ROUTE
 */

/**
 * GET /users/:userId/productposts/:productpostId/product
 * Purpose: get all product of user:userId, productpost:productpostId
 */
app.get('/users/:userId/productposts/:productpostId/product', (req, res) => {
    //return an array of the product in the database of specific user/productpost
    Product.find({
        _userId: req.params.userId,
        _productpostId: req.params.productpostId
    }).then((products) => {
        res.send(products)
    }).catch((e) => {

    });
})

/**
 * POST /users/:userId/productposts/:productpostId/product
 * Purpose: create a product under user:userId, productpost:productpostId
 */
app.post('/users/:userId/productposts/:productpostId/product', (req, res) => {
    //create a new product and return the new product document back to the user (wich includes the id)
    //the list information (fields) will be passed in via the JSON request body
    let price = req.body.price; //for to do this. is require install and setup body-parser
    let quantity = req.body.quantity;
    let img = req.body.img;
    let thingsCategory = req.body.thingsCategory;

    let newProduct = new Product({
        price,
        quantity,
        img,
        thingsCategory,
        _userId: req.params.userId,
        _productpostId: req.params.productpostId
    });

    newProduct.save().then((productDoc) => {
        //the full document is returned
        res.send(productDoc);
    });
})

/**
 * PATCH /users/:userId/productposts/:productpostId/product/productId
 * Purpose: Update specified product
 */
app.patch('/users/:userId/productposts/:productpostId/product/:productId', (req, res) => {
    //update the spcecified Product with the new values specified in the JSON body of the request
    Product.findOneAndUpdate({
        _id: req.params.productId,
        _userId: req.params.userId,
        _productpostId: req.params.productpostId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    })

})

/**
 * DELETE/users/:userId/productposts/:productpostId/product/productId
 * Purpose: Delete specified Product
 */
app.delete('/users/:userId/productposts/:productpostId/product/productId', (req, res) => {
    Product.findOneAndRemove({
        _id: req.params.productId,
        _productpostId: req.params.productpostId,
        _userId: req.params.userId
    }).then((removedProducttDoc) => {
        res.send(removedProducttDoc);
    })
})





//start server on port 3000
app.listen(port, () => {
    console.log("Server is listening on port 3000\n");
})