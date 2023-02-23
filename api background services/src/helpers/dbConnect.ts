import mssql from "mssql";
import { sqlConfig } from "../Config";

class Connection {
  private pool: Promise<mssql.ConnectionPool>;
  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }
  createRequest = (
    request: mssql.Request,
    data: { [x: string]: string | number }
  ) => {
    let keyNames = Object.keys(data);

    keyNames.map((key) => {
      let value = data[key];
      request.input(key, value);
    });
    return request;
  };
  executeRequest = async (
    storedProcedure: string,
    data: { [x: string]: string | number } = {}
  ) => {
    let emptyrequest = await (await this.pool).request();

    let request = await this.createRequest(emptyrequest, data);
    let results = await (await request.execute(storedProcedure)).recordset;
    return results;
  };
  query = async (query: string) => {
    const results = await (await this.pool).request().query(query);
    return results;
  };
}

export const exec = new Connection().executeRequest;
export const query = new Connection().query;
