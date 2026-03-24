import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function TestSupabasePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  // Note: This assumes a 'profiles' table exists (from our previous schema)
  // as the user's example used 'todos' which might not exist.
  const { data: profiles, error } = await supabase.from('profiles').select('*')

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">Supabase Error</h1>
        <pre className="mt-4 p-4 bg-red-50 rounded">{JSON.stringify(error, null, 2)}</pre>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test (Standardized SSR)</h1>
      <p className="mb-4 text-muted-foreground">Successfully fetched {profiles?.length || 0} profiles.</p>
      <ul className="space-y-2">
        {profiles?.map((profile: any) => (
          <li key={profile.id} className="p-3 border rounded">
            {profile.full_name || 'Anonymous User'} - <span className="text-xs text-muted-foreground">{profile.id}</span>
          </li>
        ))}
      </ul>
      {profiles?.length === 0 && <p>No profiles found. Try signing up first!</p>}
    </div>
  )
}
