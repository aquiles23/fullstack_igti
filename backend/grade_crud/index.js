import express from 'express';
import { promises as fs } from 'fs';

const app = express();
app.use(express.json());
global.file = 'grades.json';

app.post('/', async (req, res) => {
  console.log('POSTING');
  let poster, grade;
  grade = JSON.parse(await fs.readFile(global.file));
  poster = { id: grade.nextId++, ...req.body, timestamp: new Date() };
  grade.grades.push(poster);
  await fs.writeFile(global.file, JSON.stringify(grade,null,2));
  res.send(poster);
});

app.put('/', async (req, res) => {
  try {
    let id = req.body.id,
      body = req.body,
      idx,
      grade,
      time;
    grade = JSON.parse(await fs.readFile(global.file));
    idx = grade.grades.findIndex((val) => {
      return id === val.id;
    });
    if (idx === -1) throw new Error('id not found');
    time = grade.grades[idx].timestamp;
    grade.grades[idx] = { ...body, timestamp: time };
    await fs.writeFile(global.file, JSON.stringify(grade,null,2));
    res.send(body);
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

app.delete('/:id',async (req,res)=>{
  try {
    let id = parseInt(req.params.id),
      idx,
      grade;
    grade = JSON.parse(await fs.readFile(global.file));
    idx = grade.grades.findIndex((val) => {
      return id === val.id;
    });
    if (idx === -1) throw new Error('id not found');
    grade.grades.splice(idx,1);
    await fs.writeFile(global.file, JSON.stringify(grade,null,2));
    res.send(id + ' foi excluido');
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }

});

app.get('/grade/:id', async (req, res) => {
  console.log('GETING');
  let id = parseInt(req.params.id),
      idx,
      grade,
      query;
  grade = JSON.parse(await fs.readFile(global.file));
  query = grade.grades.find(val =>{
    return id === val.id;
  });
  res.send(query);
});

app.get('/nota/:student/:subject', async (req, res) => {
  console.log('GETING');
  let student = req.params.student,
      subject = req.params.subject,
      filtered,
      grade,
      sum;
  grade = JSON.parse(await fs.readFile(global.file));
  filtered = grade.grades.filter(val =>{
    return val.subject === subject && val.student === student
  });
  sum = filtered.reduce((acc,val) =>{
    return acc += val.value;
  }, 0 );
  console.log(sum);
  res.send(`${sum}`);
});
app.get('/media/:subject/:type', async (req, res) => {
  console.log('GETING');
  let type = req.params.type,
      subject = req.params.subject,
      filtered,
      grade,
      sum,
      media;
  grade = JSON.parse(await fs.readFile(global.file));
  filtered = grade.grades.filter(val =>{
    return val.subject === subject && val.type === type
  });
  sum = filtered.reduce((acc,val) =>{
    return acc += val.value;
  }, 0 );
  media = sum/filtered.length;
  console.log(`${sum} ${filtered.length}`);
  res.send(`${media}`);
});

app.get('/big3/:subject/:type', async (req, res) => {
  console.log('GETING');
  let type = req.params.type,
      subject = req.params.subject,
      filtered,
      grade;
  grade = JSON.parse(await fs.readFile(global.file));
  filtered = grade.grades.filter(val =>{
    return val.subject === subject && val.type === type
  });
  filtered = filtered.sort((a,b) =>{
    return b.value - a.value;
  });
  res.send(`${JSON.stringify(filtered[0],null,2)}, ${JSON.stringify(filtered[1],null,2)}, ${JSON.stringify(filtered[2],null,2)}`);
});

app.listen(3000, () => {
  console.log('WELCOME to grades manager');
});
