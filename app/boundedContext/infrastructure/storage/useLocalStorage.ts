import { MMKV } from 'react-native-mmkv'

const storage = new MMKV();

export enum StorageTypes {
  object = 'object',
  number = 'number',
  string = 'string',
  boolean = 'boolean'
}

function useLocalStorage() {

  function saveData (keyStorage: string, objet: string | number | boolean | Uint8Array | object) {
    let valueToStore: string | number | boolean | Uint8Array = '';
    if (typeof objet === 'object') valueToStore = JSON.stringify(objet);
    if (typeof objet === 'string' || typeof objet === 'number' || typeof objet === 'boolean') {
      valueToStore = objet as string | number | boolean | Uint8Array;
    }
    storage.set(keyStorage, valueToStore);
  }

  function getData (keyStorage: string, type = StorageTypes.string) {
    if (type === StorageTypes.string) {
      return storage.getString(keyStorage);
    } else if (type === StorageTypes.object) {
      return JSON.parse(storage.getString(keyStorage) || '{}');
    } else if (type === StorageTypes.number) {
      return storage.getNumber(keyStorage);
    } else if (type === StorageTypes.boolean) {
      return storage.getBoolean(keyStorage);
    }
    return '';
  }

  return { saveData, getData };

}

export default useLocalStorage;
