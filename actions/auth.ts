// app/actions/get-role.ts
'use server'

import { headers } from 'next/headers';

export async function getRoleFromHeaders(): Promise<string> {
  const headersList = headers();
  const role = headersList.get('x-user-role');
  
  return role || 'guest';
}