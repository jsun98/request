import Type from 'sequelize';
import sequelize from '../sequelize';
import Active from './active';

const Ledger = sequelize.define(
  'Ledger',
  {
    id: {
      primaryKey: true,
      type: Type.INTEGER,
      allowNull: false,
    },
    date: {
      type: Type.DATE,
    },
    debit_user: {
      primaryKey: true,
      type: Type.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('debit_user', val.toLowerCase());
      },
    },
    credit_user: {
      primaryKey: true,
      type: Type.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('credit_user', val.toLowerCase());
      },
    },
    amount: {
      type: Type.DOUBLE(10, 2),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: 'Ledger',
    hooks: {
      afterCreate(transaction, options) {
        console.log('K');
        Active.findOne({
          where: {
            ower: transaction.credit_user,
            owed: transaction.debit_user,
          },
        }).then(record => {
          if (record) {
            record.updateAttributes({
              amount: record.amount + transaction.amount,
            });
          } else {
            Active.findOne({
              where: {
                ower: transaction.debit_user,
                owed: transaction.credit_user,
              },
            }).then(rec => {
              if (rec) {
                if (rec.amount > transaction.amount) {
                  rec
                    .update({
                      amount: rec.amount - transaction.amount,
                    })
                    .then(() => {});
                } else if (rec.amount === transaction.amount) {
                  rec.destroy({ force: true });
                } else {
                  Active.create({
                    ower: transaction.credit_user,
                    owed: transaction.debit_user,
                    amount: transaction.amount - rec.amount,
                  });
                  rec.destroy({ force: true });
                }
              } else {
                Active.create({
                  ower: transaction.credit_user,
                  owed: transaction.debit_user,
                  amount: transaction.amount,
                });
              }
            });
          }
        });
      },
    },
  },
);

export default Ledger;
