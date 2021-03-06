'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const poalim = require('./poalimapi');

const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const clientId = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const google_map_key = process.env.GOOGLE_KEY;

var app = express();
app.set('port', process.env.PORT || 5000);
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/getBranchInfo', async function(req, res) {
    console.log('got request for: ' + JSON.stringify(req.query));
    console.log('bank: ' + req.query.bank_id + ', branch: ' + req.query.branch_id);

    var access_token = await poalim.auth();
    var branch_info = await poalim.getBranchInfo(access_token, req.query.bank_id, req.query.branch_id)

    res.render('branchinfo', { 
        branchName: branch_info.branchName,
        googleMapKey: google_map_key,
        latitude: branch_info.latitude,
        longitude: branch_info.longitude
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
