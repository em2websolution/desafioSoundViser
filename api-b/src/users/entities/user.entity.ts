
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
        msg: "Digite o seu nome"
      }
    },
  })
  name: string;

  @Column({
    allowNull: false,
    validate: {
      len: {
        args: [11, 14],
        msg: "CPF precisa conter entre 11 e 14 caracteres"
      },
    },
  })
  cpf: string;

  @Column({
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Digite um e-mail valido"
      }
    },
  })
  email: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}