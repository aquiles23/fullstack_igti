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
  let count = obj.find(element =>{
    return element.uf === uf
  });
  console.log(count.cities.length);
}

function printMost5City() {
  let local = obj,max,items =[],idx;
  for(let i = 0;i<5;i++){
    max = local.reduce((acc,el)=>{
      return Math.max(acc,el.cities.length);
    },0)
    idx = local.findIndex(el =>{
      return el.cities.length === max;
    })
    items.push(`${local[idx].uf} - ${max}`);
    local.splice(idx,1)
  }
  console.log(items);
}

function printlesser5City() {
  let local = obj,min,items =[],idx;
  for(let i = 0;i<5;i++){
    min = local.reduce((acc,el)=>{
      return Math.min(acc,el.cities.length);
    },10000)
    idx = local.findIndex(el =>{
      return el.cities.length === min;
    })
    items.push(`${local[idx].uf} - ${min}`);
    local.splice(idx,1)
  }
  console.log(items);
}

function bigestNameCityAll() {}

function smallestNameCityAll() {}

function bigestNameCity() {}

function smallestNameCity() {}

async function main() {
  await createJSON();
  //console.log(obj);
  printCountCity('MG');
  printMost5City();
  printlesser5City();
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
