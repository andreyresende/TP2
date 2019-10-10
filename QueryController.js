import fs from 'fs'
//import queryJson from "../../../public/apiRequest/request.json";
import axios from 'axios'
import KwicController from "./KwicController";

class QueryController {
  async query (req, res) {
    //constroi a url
    const query = req.body.query
    console.log(query)
    const url = "http://dblp.org/search/publ/api?q="+ query +"&format=json"
    //faz um GET para a api e escreve o json obtido em request.json
    const response = await axios.get(url)
    fs.writeFileSync('public/apiRequest/request.json', JSON.stringify(response.data) + '\n', (err) => {
      if (err) throw err;
    })
    //escreve o filtro de titulos, de inicio zerando o arquivo original titles.txt
    const path = 'public/titles/titles.txt'
    fs.writeFileSync(path, '', (err) => {
      if (err) throw err;
    })
    const queryJson = response.data
    var text = ''
    queryJson.result.hits.hit.forEach((element, index, array) => {
      fs.appendFileSync(path, element.info.title + '\n', (err) => {
        if (err) throw err
      })
      text += JSON.stringify(element.info.title) + '\n'
      //console.log(index + " = " + element.info.title)
    })
    const title = text.split('\n')
    var quantidadeDeTitulos = title.length;
    KwicController.titleFilter(quantidadeDeTitulos, title);
    for(var i = 0; i < quantidadeDeTitulos; i++){//Uma iteracao para cada titulo, representado por title[i]
      var palavras = KwicController.splitWords(title[i]);//palavras = array com as palavras do title[i]
      var quantidadeDePalavras = palavras.length;
      console.log("Titulo nº" + i + " possui " + quantidadeDePalavras + " palavras");
      for(var j = 0; j < quantidadeDePalavras; j++){
        console.log("Palavra: " + palavras[j]);
      }
    }
    const stopWords = KwicController.loadStopWords();
    return res.json(title)
  }

}
export default new QueryController()
