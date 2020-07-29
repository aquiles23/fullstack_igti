import { promises as fs } from 'fs';

let obj = []
async function createJSON() {
  try {
    const city = JSON.parse(
        await fs.readFile('./cidades-estados-brasil-json/Cidades.json')
      ),
      state = JSON.parse(
        await fs.readFile('./cidades-estados-brasil-json/Estados.json')
      );
    async function processRow(element,i){
      let curState = element,
      fileState = city.filter((el) =>{
        return el.Estado === curState.ID  
      })
      obj.push({uf: curState.Sigla,uf_id: curState.ID , cities: fileState})
      await fs.writeFile(`./cidades-estados-brasil-json/${curState.Sigla}.json`,JSON.stringify(fileState));
    }
    state.forEach(processRow);
    return obj;
  } catch (err) {
    console.log(err);
  }
}


function printCountCity(uf) {
}

function printMost5City() {}

function printlesser5City() {}

function bigestNameCityAll() {}

function smallestNameCityAll() {}

function bigestNameCity() {}

function smallestNameCity() {}

async function main() {
  await createJSON();
  //console.log(obj);
}
export default {
  main,
  printCountCity,
  printlesser5City,
  printMost5City,
  bigestNameCity,
  bigestNameCityAll,
  smallestNameCity,
  smallestNameCityAll
};
