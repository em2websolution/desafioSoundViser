import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt, DeletedAt, } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table
export class Bank extends Model<Bank> {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      })
      public id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: "Digite o tipo de transação: [Deposito | Transferencia | Pagamento"
            }
        }
    })
    type: string;

    @Column({
        type: DataType.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty: {
              msg: "Digite o valor da transação"
            },
            is: {
                args: ["^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"],
                msg: "Digite um valor valido"
            },
        }
    })    
    value: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        defaultValue: 0
    })
    userIdTransfer: number;

    @BelongsTo(() => User)
    user: User;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;

}