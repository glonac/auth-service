import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const MongoConfig = async (): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoUri(),
    ...MongoOptions(),
  };
};

const getMongoUri = () => {
  console.log();
  const userString = process.env.MONGO_NAME_AUTH
    ? process.env.MONGO_NAME_AUTH + ':' + process.env.MONGO_PASSWORD + '@'
    : '';

  return (
    'mongodb://' +
    userString +
    process.env.MONGO_HOST +
    ':' +
    process.env.MONGO_PORT +
    '/' +
    process.env.MONGO_NAME_AUTH
  );
};

const MongoOptions = () => ({});
