const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
//    let naturalLanguageUnderstanding = getNLUInstance();
//    return res.send({"happy":"90","sad":"10"});
    const nlu = getNLUInstance();
    const analyzeParams = {
        "url": req.query.url,
        "features": {
            'emotion': {}
        }
    }; 
    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
    })
        .catch(err => {
            console.log('error', err);
    })            
});

app.get("/url/sentiment", (req,res) => {
//    return res.send("url sentiment for "+req.query.url);
const nlu = getNLUInstance();
    const analyzeParams = {
        "url": req.query.url, 
        "features": {
            'sentiment': {}
        } 
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error', err);
        })
});

app.get("/text/emotion", (req,res) => {
//    return res.send({"happy":"10","sad":"90"});
    const nlu = getNLUInstance();
    const analyzeParams = {
        "text": req.query.text, 
        "features": {
            'emotion': {}
        } 
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.emotion.document.emotion);
        })
        .catch(err => {
            console.log('error', err);
        })
});

app.get("/text/sentiment", (req,res) => {
    //    return res.send("text sentiment for "+req.query.text);
    const nlu = getNLUInstance();
    const analyzeParams = {
        "text": req.query.text, 
        "features": {
            'sentiment': {}
        } 
    };

    nlu.analyze(analyzeParams)
        .then(analysisResults => {
            return res.send(analysisResults.result.sentiment.document.label);
        })
        .catch(err => {
            console.log('error', err);
        })
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

