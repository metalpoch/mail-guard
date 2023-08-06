export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      disposable_email_domains: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          id: number
          max_requests: number | null
          name: string
        }
        Insert: {
          id?: number
          max_requests?: number | null
          name: string
        }
        Update: {
          id?: number
          max_requests?: number | null
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          balance: number
          disposable_requests: number
          id: string
          last_payment: string | null
          plan_id: number
          requests: number
        }
        Insert: {
          balance?: number
          disposable_requests?: number
          id: string
          last_payment?: string | null
          plan_id?: number
          requests?: number
        }
        Update: {
          balance?: number
          disposable_requests?: number
          id?: string
          last_payment?: string | null
          plan_id?: number
          requests?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_plan_id_fkey"
            columns: ["plan_id"]
            referencedRelation: "plans"
            referencedColumns: ["id"]
          }
        ]
      }
      tickets: {
        Row: {
          appointment_date: string
          created_at: string | null
          description: string | null
          id: number
          status: string
          title: string
          user_id: string
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          description?: string | null
          id?: number
          status?: string
          title: string
          user_id: string
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          description?: string | null
          id?: number
          status?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tickets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
