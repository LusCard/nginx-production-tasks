export interface IDBConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}
