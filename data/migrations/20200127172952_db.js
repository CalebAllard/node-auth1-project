
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.text('username');
        tbl.text('password');
        tbl.text('email');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExistsnp('users');
};
