import mssql from "mssql";
import { sqlConfig } from "../config";
class Connection {
  private pool: Promise<mssql.ConnectionPool>;
  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }
  createRequest(request: mssql.Request, data: { [x: string]: string }) {
    let keyNames = Object.keys(data);
    keyNames.map((key) => {
      let value = data[key];
      request.input(key, value);
    });
    return request;
  }
  async executeRequest(
    storedProcedure: string,
    data: { [x: string]: string } = {}
  ) {
    let emptyrequest = await (await this.pool).request();
    let request = this.createRequest(emptyrequest, data);
    let results = await (await request.execute(storedProcedure)).recordset;
    return results
  }
}

export const exec = new Connection().executeRequest
