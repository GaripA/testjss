import express from 'express';
import Task from './models/Task.js';

const app = express();
app.use(express.urlencoded({ extended: true }));


app.post("/add", async function (req, res) {
  const task= new Task();
  task.price= req.body.price
  task.size= req.body.size
  task.brand = req.body.brand
  task.bougth= 0 ;

  //le premier task est la variable créée au dessus, le seond designe la collonne
  await task.save();
  res.redirect('/');
});

app.get("/acheter/:idtv", async function (req, res) {
  const tv = await Task.load({ id: req.params.idtv });
  tv.bougth = 1;
  await tv.save();
  res.redirect('/');
});

app.get("/delete/:id", async function (req, res) {
  await Task.delete({ id: req.params.id });
  res.redirect('/');
});

/*
app.get("/", async function (req, res) {
  const tasks = await Task.loadMany(); //met la table de la database dans la variables tasks
  res.render('listTasks.ejs', { tasks: tasks });
});
*/

app.get("/", async function (req, res) {
  const tasks = await Task.loadMany({bougth : 0 });
  const owned = await Task.loadMany({bougth: 1 });
  res.render('listTasks.ejs', {tasks,owned});
});

app.listen(4000);
/*cd C:\Users\PC\Desktop\codeexoexam\LW3L-orm*/