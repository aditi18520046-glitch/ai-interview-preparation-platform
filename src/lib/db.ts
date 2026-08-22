import { supabase } from './supabase';

export const db = {
  collection: (colName: string) => ({
    find: async (filter = {}, options = {}) => request('find', colName, filter, {}, options),
    findOne: async (filter = {}) => request('findOne', colName, filter),
    insert: async (data: any) => request('insertOne', colName, {}, data),
    update: async (filter: any, data: any) => request('updateOne', colName, filter, data),
    upsert: async (filter: any, data: any) => request('upsert', colName, filter, data),
    delete: async (filter: any) => request('deleteOne', colName, filter),
  })
};

async function request(operation: string, collection: string, filter: any = {}, data: any = {}, options: any = {}) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('Not authenticated');

  const res = await fetch('/api/db', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`
    },
    body: JSON.stringify({ collection, operation, filter, data, sort: options.sort, limit: options.limit })
  });
  if (!res.ok) {
     const err = await res.json().catch(() => ({}));
     throw new Error(err.error || 'DB Request Failed');
  }
  return res.json();
}
