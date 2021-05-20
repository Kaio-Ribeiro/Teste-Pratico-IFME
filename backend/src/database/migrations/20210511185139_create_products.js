
exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('price').notNullable();
        table.string('image_url').notNullable();

        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('products')
};
