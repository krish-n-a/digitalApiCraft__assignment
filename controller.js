const service = require('./services')
var Promise = require("bluebird");

exports.getData = async(request,response) => {
    try{
        let responseArr = []
        let numberOfRandomUsersData = Array.from({ length: 10 }, (index,value) => ++value)
        await Promise.map(numberOfRandomUsersData, async(num) => {
            let data = await service.fetchRandomUser()
            outputData = {
                'name':data.results[0].name.title+' '+ data.results[0].name.first + data.results[0].name.last,
                'DOB':data.results[0].dob.date,
                'email':data.results[0].email,
              } 
            responseArr.push(outputData)
        },{concurrency:4})
        response.send(responseArr)
    }
    catch(err){
        console.log(err)
        response.status(500).send(err)
    }
}

exports.occurrences = async (request,response) => { 
    try{
        let outputStr = await service.findOccurrencesCount()
        let wordsCountObj = {}
        let tempWord=""
        let regex = /[A-Z,a-z]/g
        for(let i=0; i<outputStr.length; i++){
            if(!(outputStr[i].match(regex)  && outputStr[i] != ";" && outputStr[i] != "" && outputStr[i] != "," && outputStr[i] != "'")){
                if(wordsCountObj[tempWord]){
                    wordsCountObj[tempWord]++
                }else{
                    wordsCountObj[tempWord] = 1
                }
                tempWord = ""
            }else{
                tempWord += outputStr[i]
            }
        }       
        const sortedObj={}
        Object.keys(wordsCountObj).sort((a,b) => wordsCountObj[b]-wordsCountObj[a]).forEach((key) =>{if(key.length > 1){sortedObj[key] = wordsCountObj[key]}})
        let outputObj = Object.fromEntries(Object.entries(sortedObj).slice(0, 10));
        response.send(outputObj)
    }
    catch(err){
        console.log(err)
        response.status(500).send(err)
    }
}