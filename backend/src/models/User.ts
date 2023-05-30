import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';

export interface UserAttributes {
  id: string;
  discordId: string;
  discordUsername: string;
  discordDiscriminator: string;
  discordAvatar: string;
  accessToken: string;
  refreshToken: string;
  walletAddress: string | null;
}

export class UserModel extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public discordId!: string;
  public discordUsername!: string;
  public discordDiscriminator!: string;
  public discordAvatar!: string;
  public accessToken!: string;
  public refreshToken!: string;
  public walletAddress!: string | null;
}

export const initUserModel = (sequelize: Sequelize): ModelCtor<UserModel> => {
  UserModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      discordId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      discordUsername: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discordDiscriminator: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      discordAvatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      walletAddress: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      paranoid: true,
      underscored: true,
    },
  );

  return UserModel;
};
