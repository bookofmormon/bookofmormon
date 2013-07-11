
var config = require('../config.yaml')
  , request = require('superagent')

  , getDb = require('../lib/db')
  , debug = require('debug')('bookofmormon:api');

function listItems(req, res) {
  return res.send({items: []});
}

function addItem(req, res) {
  var db = getDb()
    , item = req.body;

  if (item._id) {
    db.collection('items').update({_id: new ObjectId(item._id)},
                                  { $set: item }, function (err, item) {
      if (err) return res.send({error: err.message});
      return res.send({item: item[0]});
    });
  } else {
    db.collection('items').insert(item, function (err, item) {
      if (err) return res.send({error: err.message});
      return res.send({item: item[0]});
    });
  }
}

function listItems(req, res) {
  var db = getDb();

  db.collection('items').find().toArray(function (err, items) {
    if (err) return res.send({error: err.message});
    return res.send({items: items});
  });
}

exports.addRoutes = function (app) {
  app.get('/api/list', listItems);
  app.post('/api/add', addItem);
};

