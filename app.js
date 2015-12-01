var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , async = require('async')
  , bodyParser = require('body-parser')
  , r = require('rethinkdb')
  , config = require(__dirname + '/config.js');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

// index page 
app.get('/', function(req, res) {
    res.render('index');
});

// cook page 
app.get('/cook', function(req, res) {
    res.render('cook');
});

// // seller page 
// app.get('/sell', function(req, res) {
//     res.render('sell');
// });

//The REST routes
app.route('/sell')
  .get(listItems)
  .post(createCommand);

// r.table('authors').run(connection, function(err, cursor) {
//     if (err) throw err;
//     cursor.toArray(function(err, result) {
//         if (err) throw err;
//         console.log(JSON.stringify(result, null, 2));
//     });
// });


/*
 * Retrieve all items.
 */
function listItems(req, res, next) {
  r.table('boissons').run(req.app._rdbConn, function(err, cursor) {
    if(err) {
      return next(err);
    }

    //Retrieve all the boissons in an array.
    cursor.toArray(function(err, result) {
      if(err) {
        return next(err);
      }
      // console.log(result);
      res.render('sell', {result : result});
      // res.json(result);
    });
  });
}

/*
 * Insert a new command.
 */
function createCommand(req, res, next) {
  var todoItem = req.body;
  todoItem.createdAt = r.now();

  console.dir(todoItem);

  r.table('todos').insert(todoItem, {returnChanges: true}).run(req.app._rdbConn, function(err, result) {
    if(err) {
      return next(err);
    }

    res.json(result.changes[0].new_val);
  });
}

/*
 * Store the db connection and start listening on a port.
 */
function startExpress(connection) {
  app._rdbConn = connection;
  app.listen(config.express.port);
  console.log('Listening on port ' + config.express.port);
}

/*
 * Connect to rethinkdb, create the needed tables/indexes and then start express.
 * Create tables/indexes then start express
 */
async.waterfall([
  function connect(callback) {
    r.connect(config.rethinkdb, callback);
  },
  function createDatabase(connection, callback) {
    //Create the database if needed.
    r.dbList().contains(config.rethinkdb.db).do(function (containsDb) {
      return r.branch(
        containsDb,
        {created: 0},
        r.dbCreate(config.rethinkdb.db)
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function createTable(connection, callback) {
    //Create the table if needed.
    r.tableList().contains('boissons').do(function (containsTable) {
      return r.branch(
        containsTable,
        {created: 0},
        r.tableCreate('boissons')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },

  function createIndex(connection, callback) {
    //Create the index if needed.
    r.table('boissons').indexList().contains('code').do(function (hasIndex) {
      return r.branch(
        hasIndex,
        {created: 0},
        r.table('boissons').indexCreate('code')
      );
    }).run(connection, function(err) {
      callback(err, connection);
    });
  },
  function waitForIndex(connection, callback) {
    //Wait for the index to be ready.
    r.table('boissons').indexWait('code').run(connection, function (err, result) {
      callback(err, connection);
    });
  },
  function insertData(connection, callback) {
		// r.table('boissons').delete().run(connection, function(err, result) {
		// 	callback(err, connection);
		// });

		// r.table('boissons').get('cafe').run(connection, function (err, result) {
		// 	console.log("1");
		// 	console.log(result);
		// 	// r.branch(
		// 	// 	result, 
		// 	// 	{created: 0},
		// 	// 	r.table('boissons').insert([{ name: "Café", code: "cafe", price: "50", admin_price: "50"}])
		// 	// )
		// 	callback(err, connection);
		// });

		//
		r.table('boissons').get('ugghhh').do(function (exists) {
			console.log(exists);
			return r.branch(
				result, 
				{created: 0},
				r.table('boissons').insert([{ name: "Café", code: "cafe", price: "50", admin_price: "50"}])
			);
		}).run(connection, function(err) {
			callback(err, connection);
		});
  },
], function(err, connection) {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  startExpress(connection);
});

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });