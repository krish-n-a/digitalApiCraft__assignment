const axios = require('axios')

async function fetchRandomUser(){
  var config = {
    method: 'get',
    url: 'https://randomuser.me/api/',
  };
  const data = await axios(config)    
  return data.data
}

async function findOccurrencesCount (){

  var config = {
    method:'get',
    url:'https://norvig.com/big.txt',
  };
  const documentFromApi = await axios(config)
  return documentFromApi.data

}

module.exports = {fetchRandomUser,findOccurrencesCount}
