const path = require('path');
const sqlite3 = require('sqlite3').verbose();
export const database = new sqlite3.Database(path.resolve(__dirname, '../taskflow.db'));