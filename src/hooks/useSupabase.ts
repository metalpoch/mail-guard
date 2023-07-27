import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from '@/lib/database.types'

export const useSupabase = () => {
    const supabase = createClientComponentClient<Database>()
    return supabase
}