import { useState, useEffect, useCallback } from 'react'
import { User } from '@supabase/auth-helpers-nextjs'
import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/supabase-client'

function useAuth(): User | null {
    const [user, setUser] = useState<User | null>(null)
    const supabase = createClient()

    const handleAuthStateChange = useCallback(async (event: AuthChangeEvent, session: Session | null) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
    }, [])

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(handleAuthStateChange)

        return () => {
            data.subscription.unsubscribe()
        };
    }, [supabase.auth, handleAuthStateChange])

    useEffect(() => {
        async function getActiveSession() {
            const { data } = await supabase.auth.getUser()
            setUser(data.user ?? null)
        }
        getActiveSession();
    }, [supabase.auth])

    return user
}

export default useAuth