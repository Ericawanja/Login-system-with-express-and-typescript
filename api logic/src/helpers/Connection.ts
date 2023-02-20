import mssql from "mssql";
import { sqlConfig } from "../config";

class Connection {
  private pool: Promise<mssql.ConnectionPool>;
  constructor() {
    this.pool = mssql.connect(sqlConfig);
  }

  //adding inputs
  createRequest = (request: mssql.Request, data: { [x: string]: string; }) => {
    const keys = Object.keys(data);

    keys.map((keyname) => {
      request.input(keyname, data[keyname]);
    });
  };

  //exec
  executeRequest = async (
    storedProcedure: string,
    data: { [x: string]: string; }
  ) => {
    let request = await (await this.pool).request();
    let requestobj = this.createRequest(request, data);
    let result = await (await request.execute(storedProcedure)).recordset;
    return result;
  };
  async query(queryString: string) {
    return await (await this.pool).request().query(queryString);
  }
}

export const exec = new Connection().executeRequest;
export const query = new Connection().query;
