import { IDBConnection } from "./database.interface";

export class ConnectDB implements IDBConnection {
  private static instance: ConnectDB;

  constructor(private connectionDB: IDBConnection) {}

  public static getInstance(connectionDB: IDBConnection): ConnectDB {
    if (!ConnectDB.instance) {
      ConnectDB.instance = new ConnectDB(connectionDB);
    }
    return ConnectDB.instance;
  }

  public async connect(): Promise<void> {
    return this.connectionDB.connect();
  }

  public async disconnect(): Promise<void> {
    return this.connectionDB.disconnect();
  }
}
