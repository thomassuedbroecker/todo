module.exports = function (app, todoDb) {

  function getTodos(res) {
    todoDb.list({
      include_docs: true
    }, function (err, body) {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        res.send(body.rows.map(function (row) {
          return row.doc;
        }));
      }
    });
  }

  //kill instance
  //http://stackabuse.com/how-to-exit-in-node-js/
  app.get('/api/kill', function (req, res) {
    process.exit();
    res.json({ message: 'kill test' });

  });

  // api ---------------------------------------------------------------------
  // get all todos
  app.get('/api/todos', function (req, res) {
    getTodos(res);
  });

  // create todo and send back all todos after creation
  app.put('/api/todos', function (req, res) {
    todoDb.insert({
      type: "todo",
      text: req.body.text,
      done: false
    }, function (err, todo) {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        getTodos(res);
      }
    });
  });

  // delete a todo
  app.delete('/api/todos/:id', function (req, res) {
    todoDb.destroy(req.params.id, req.query.rev, function (err, body) {
      if (err) {
        res.status(500).send({
          error: err
        });
      } else {
        getTodos(res);
      }
    });
  });

};
