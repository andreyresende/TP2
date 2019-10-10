import fs from 'fs'

import json from '../../../public/titles/titles.json';

class KwicController {
  loadStopWords () {
    const array = fs.readFileSync('public/stopWords/stopWords.txt').toString().split('\n')
    console.log(array)
    return array
  }

  /* splitWords(title) {
    const palavras = title.split(' ');
    return palavras;
  } */

  async shifting(req, res){
    const stopwords = fs.readFileSync('public/stopWords/stopWords.txt').toString().split('\n');
    var keyword = true;
    var text     = {};
    text.array   = [];
    json.array.forEach((titulo, index) => {
      var palavras = titulo.split(' ');
      var frases   = [];
      console.log(palavras.length);
      for(var i = 0; i < palavras.length; i++){
        console.log("testando " + palavras[0]);
        stopwords.forEach(stopword => {
          if(stopword == palavras[0]){
            console.log(palavras[0] + " eh uma stopword");
            keyword = false;
          }
        })
        if(keyword){
          console.log(palavras[0] + " eh uma keyword");
          frases += palavras.join(' ');
          frases += "\n";
          console.log("frase salva: " + palavras.join(' '));
          palavras.push(palavras.shift());
          console.log("Palavras agora eh " + palavras);
        }
        else{
          palavras.push(palavras.shift());
          console.log("Palavras agora eh " + palavras);
          keyword = true;
        }
      }
      console.log("Frases encontradas: " + frases);
      text.array[index] = frases.split('\n');
      //text.array = '============================================================================';
    })
    return res.json(text);
  }

  wordFilter(quantidadeDePalavras, palavras){

  }

  testWords(stopWords, word){
    stopWords.forEach(stopword => {
      if(stopword == word)
        return true;
    });
    return false;
  }
  
}
export default new KwicController()
