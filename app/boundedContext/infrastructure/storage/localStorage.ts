import {MMKV} from 'react-native-mmkv';
const storage = new MMKV();

export enum StorageTypes {
  object = 'object',
  number = 'number',
  string = 'string',
  boolean = 'boolean',
}

export default class LocalStorage {
  keyStorage: string;
  valueStoraged: any;

  constructor(keyStorage: string) {
    this.keyStorage = keyStorage;
  }

  getData(type = StorageTypes.string) {
    if (type === StorageTypes.string) {
      this.valueStoraged = storage.getString(this.keyStorage);
    } else if (type === StorageTypes.object) {
      this.valueStoraged = JSON.parse(
        storage.getString(this.keyStorage) || '{}',
      );
    } else if (type === StorageTypes.number) {
      this.valueStoraged = storage.getNumber(this.keyStorage);
    } else if (type === StorageTypes.boolean) {
      this.valueStoraged = storage.getBoolean(this.keyStorage);
    }
  }
}
