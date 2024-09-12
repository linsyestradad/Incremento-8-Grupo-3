import db from "../database/db.js";
import { DataTypes } from "sequelize";

// Definir los modelos
const Usuario = db.define('usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreComp: {
        type: DataTypes.STRING(350),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    contrasenha: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fechaNaci: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    timestamps: false
});

export default Usuario;  // Exportar directamente el modelo
