var express = require('express');
var app = express();

//Serves resources from public folder
app.use(express.static('public'));

app.listen(3000);