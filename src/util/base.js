import axios from "axios"

export const deepCopify = (arr) => JSON.parse(JSON.stringify(arr))

export const dictify = (str) => {
  var dict = new Map(); //Can be done with simply {} //Update coming soon
  ([...str]).forEach((el, index) => dict.set(index, el));
  return dict
}

export const delay = ms => new Promise(
  (resolve) => setTimeout(resolve, ms)
);

export const randomWordAPI = async () => {
    const url = 'https://random-word-api.herokuapp.com/word?length=5'
    const res = await axios.get(url)
        .then(res => (res.data)[0].toUpperCase())
        .then(async (res) => { 
          if(await wordAPI(res)){
            return res
          }
          else{
            return randomWordAPI()
          }
        })
        .catch((error) => console.log(error))
    return res
}

export const wordAPI = async(word) => {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    const res = await axios.get(url + word)
        .then((response) => true)
        .catch((err) => false)
    return res
}

export const createStyleState = () => {
  let arr = []
  for(let i  = 0; i < 6; i++) {
    let row = []
    for(let j = 0; j < 5; j++) {
      row.push('bg-EMPTY')
    }
    arr.push(row)
  }
  return arr
}

export const createTestStyleState = () => {
  let arr = []
  for(let i  = 0; i < 6; i++) {
    let row = []
    for(let j = 0; j < 5; j++) {
      row.push(['bg-EMPTY'])
    }
    arr.push(row)
  }
  return arr
}

export const createColorState = () => {
  let arr = []
  for(let i  = 0; i < 6; i++) {
    let row = []
      for(let j = 0; j < 5; j++) {
          row.push("bg-EMPTY")
        }
        arr.push(row)
    }
  return arr
}

export const createGameState = () => {
  let arr = []
  for(let i  = 0; i < 6; i++) {
    let row = []
      for(let j = 0; j < 5; j++) {
          row.push("")
        }
        arr.push(row)
    }
  return arr
}