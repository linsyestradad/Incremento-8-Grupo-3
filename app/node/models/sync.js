// sync.js
import sequelize from './database/db.js';
import Cliente from './models/Cliente.js';
import TipoCliente from './models/TipoCliente.js';

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false }); // Usa { force: true } solo si deseas reiniciar la base de datos
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

syncDatabase();