import axios from "axios"

export const deepCopify = (arr) => JSON.parse(JSON.stringify(arr))

export const dictify = (str) => {
  var dict = new Map(); //Can be done with simply {} //Update coming soon
  ([...str]).forEach((el, index) => dict.set(index, el));
  return dict
}

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

    //Create Row
    for(let i  = 0; i < 6; i++) {
      let row = []

      //Create Boxes
      for(let j = 0; j < 5; j++) {
        let box = []

        //Create Multiple Styles for Each box
        for(let k = 0; j < 2; k++){
          box.push("bg-EMPTY")
          box.push('')
        } 
        row.push(box)
      } 

      arr.push(row)
    }
    return arr
  }

  /**
   *  [ 
   *     [[Empty, No-Letter] , , , , , ],
   *     [[Empty, No-Letter] , , , , , ]
   *  ]


  **/

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
