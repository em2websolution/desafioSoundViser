
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  public userId: number;

  @Column({
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Enter your name"
      }
    },
  })
  name: string;

  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [11, 14],
        msg: "CPF must be between 11 and 14 characters in length"
      },
    },
  })
  cpf: string;

  @Column({
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Enter a valid e-mail"
      }
    },
  })
  email: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}