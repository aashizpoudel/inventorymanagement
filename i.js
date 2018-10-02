var tr = require('./models/transaction');

tr.remove({}).then(e=>{console.log('done')});
