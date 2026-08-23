const DB_NAME = 'cashrunway'; const VERSION = 1;
const STORES = ['plans', 'scenarios', 'cashFlowEvents', 'settings'];

export function openDatabase() {
  return new Promise((resolve, reject) => { const request = indexedDB.open(DB_NAME, VERSION); request.onupgradeneeded = () => { for (const store of STORES) if (!request.result.objectStoreNames.contains(store)) request.result.createObjectStore(store, { keyPath: 'id' }); }; request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
}
export async function readState() { const db = await openDatabase(); return new Promise((resolve, reject) => { const tx = db.transaction(STORES, 'readonly'); const state = {}; STORES.forEach(name => { state[name] = []; const req = tx.objectStore(name).getAll(); req.onsuccess = () => { state[name] = req.result; }; }); tx.oncomplete = () => resolve(state); tx.onerror = () => reject(tx.error); }); }
export async function replaceState(state) { const db = await openDatabase(); return new Promise((resolve, reject) => { const tx = db.transaction(STORES, 'readwrite'); STORES.forEach(name => { const store = tx.objectStore(name); store.clear(); for (const row of state[name] ?? []) store.put(row); }); tx.oncomplete = resolve; tx.onerror = () => reject(tx.error); }); }
export async function saveState(state) { return replaceState(state); }
