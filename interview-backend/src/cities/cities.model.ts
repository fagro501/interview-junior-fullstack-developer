export class City {
  uuid: string;
  name: string;
  count: number;

  /**
   * Constructor to build city out of a json object
   * @param jsonObject
   */
  constructor(jsonObject: any) {
    if (jsonObject.count && jsonObject.cityName && jsonObject.uuid) {
      this.count = jsonObject.count;
      this.name = jsonObject.cityName;
      this.uuid = jsonObject.uuid;
    } else {
      throw new Error('The Json file has bad objects');
    }
  }
}
