import fs from 'fs'

class KwicController {
  loadStopWords () {
    const array = fs.readFileSync('public/stopWords/stopWords.txt').toString().split('\n')
    console.log(array)
    return array
  }

  splitWords(title) {
    const palavras = title.split(' ');
    return palavras;
  }

  titleFilter(quantidadeDeTitulos, titulos){
    for(var i = 0; i < quantidadeDeTitulos; i++){
      var palavras = this.splitWords(title[i]);
      
    }
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
