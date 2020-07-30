import { promises as fs } from 'fs';

let obj = [], cities = [];
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
    obj.sort((a,b)=>{
      return a.uf > b.uf
    });
    obj.forEach(el =>{
      el.cities.sort();
      cities = cities.concat(el.cities);
    });
    cities.sort();
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
  let local =Array.from(obj),max,items =[],idx;
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
  let local =Array.from(obj),min,items =[],idx;
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

function bigestNameCityAll() {
  let local =Array.from(obj),max,items =[],found;
  local.forEach(el =>{
    max = el.cities.reduce((acc,element) =>{
      return Math.max(acc,element.Nome.length);
    },0);
    found = el.cities.find(element =>{
      return max === element.Nome.length;
    });
    items.push(`${found.Nome} - ${el.uf}`);
  })
  console.log(items);
}

function smallestNameCityAll() {
  let local = Array.from(obj),min,items =[],found;
  local.forEach(el =>{
    min = el.cities.reduce((acc,element) =>{
      return Math.min(acc,element.Nome.length);
    },10000);
    found = el.cities.find(element =>{
      return min === element.Nome.length;
    });
    items.push(`${found.Nome} - ${el.uf}`);
  })
  console.log(items);
}

function bigestNameCity() {
  let uf, max, found;
  max = cities.reduce((acc,el) =>{
    return Math.max(acc,el.Nome.length);
  },0);
  found = cities.find(el=>{
    return max === el.Nome.length
  });
  uf = obj.find(el=>{
    return el.cities.includes(found);
  });
  console.log(`${found.Nome} - ${uf.uf}`)
}

function smallestNameCity() {
  let uf, min, found;
  min = cities.reduce((acc,el) =>{
    return Math.min(acc,el.Nome.length);
  },10000);
  found = cities.find(el=>{
    return min === el.Nome.length
  });
  uf = obj.find(el=>{
    return el.cities.includes(found);
  });
  console.log(`${found.Nome} - ${uf.uf}`)
}

async function main() {
  await createJSON();
  printCountCity('MG');
  printMost5City();
  printlesser5City();
  bigestNameCityAll();
  smallestNameCityAll();
  bigestNameCity();
  smallestNameCity();
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
