import { Sequelize, Options } from 'sequelize';
import { UserModel, UserAttributes, initUserModel } from './User';

export interface Models {
  User: typeof UserModel;
}

let models: Models | undefined;

export const initModels = (config: Options) => {
  if (!models) {
    const sequelize = new Sequelize({
      ...config,
      dialect: 'postgres' // specify the dialect here
    });
    const User = initUserModel(sequelize);
    models = {
      User: User as typeof UserModel,
    };
  }
  return models;
};

export default models;
