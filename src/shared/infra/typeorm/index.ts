import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { isPropertyAccessChain } from 'typescript';

export default async(host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === 'test' 
      ? "rentx_test" 
      : defaultOptions.database,
    })
  )
}

