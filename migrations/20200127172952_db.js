
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.text('username');
        tbl.charset('password');
        tbl.text('email');
    });
};

exports.down = function(knex) {
  
};
