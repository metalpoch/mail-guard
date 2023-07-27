import { useState, useEffect } from 'react'
import { User } from '@supabase/auth-helpers-nextjs'
import { useSupabase } from './useSupabase'

function useAuth(): User | null {
    const [user, setUser] = useState<User | null>(null)
    const supabase = useSupabase()

    useEffect(() => {

        const { data } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                const currentUser = session?.user ?? null
                setUser(currentUser)
            }
        );

        return () => {
            data.subscription.unsubscribe()
        };
    }, [supabase.auth, user])

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