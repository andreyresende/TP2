import fs from 'fs'
//import queryJson from "../../../public/apiRequest/request.json";
import axios from 'axios'
import KwicController from "./KwicController";
import titlesJson from '../../../public/titles/titles.json';

class QueryController {
  async query (req, res) {
    //constroi a url
    const query = req.body.query
    console.log(query)
    const url = "http://dblp.org/search/publ/api?q="+ query +"&format=json"
    //faz um GET para a api e escreve o json obtido em request.json
    const response = await axios.get(url)
    fs.writeFileSync('public/apiRequest/request.json', JSON.stringify(response.data), (err) => {
      if (err) throw err;
    })
    //escreve o filtro de titulos, de inicio zerando o arquivo original titles.txt
    const path = 'public/titles/titles.json'
    fs.writeFileSync(path, '', (err) => {
      if (err) throw err;
    })
    const queryJson = response.data
    var text = {};
    text.array = []
    queryJson.result.hits.hit.forEach((element, index, array) => {
      //text += '"' + index + '": ' + JSON.stringify(element.info.title) + '\n';
      text.array[index] = element.info.title; 
      //console.log(index + " = " + element.info.title)
    })//Error: Server returned nothing (no headers, no data)
    //const title = text.split('\n');
    
    console.log(text[0])
    const writeJson = JSON.stringify(text)
    fs.writeFileSync(path, writeJson)
    /* var quantidadeDeTitulos = title.length;
    const stopWords = KwicController.loadStopWords();
    const a = await KwicController.shifting(title, stopWords); */
    return res.json({message: 'Check /titles to see all titles'});
  }

  async show(req, res) {
    return res.json(titlesJson)
  }
  
}
export default new QueryController()
