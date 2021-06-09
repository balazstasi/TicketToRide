import Sequelize from 'sequelize';

export const db = {};

const dialect = process.env.NODE_ENV === 'production' ? 'mysql' : 'sqlite';

const sequelize = new Sequelize('wssync', 'wssync', 'wssync', {
  dialect,
  host: 'localhost',
  storage: 'wssync.sqlite',
  logging: false,
  define: {
    freezeTableName: true
  }
});

const rooms = sequelize.define('rooms', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false
  },
  state: {
    type: Sequelize.TEXT('long'),
    allowNull: true
  }
}, {
  hooks: {
    beforeCount(options) {
      options.raw = true;
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.rooms = rooms;

sequelize.sync();