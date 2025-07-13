export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      contest_entries: {
        Row: {
          contest_id: string
          entry_fee_paid: number
          fantasy_team_id: string
          final_rank: number | null
          id: string
          joined_at: string
          points_earned: number | null
          user_id: string
          winnings: number | null
        }
        Insert: {
          contest_id: string
          entry_fee_paid: number
          fantasy_team_id: string
          final_rank?: number | null
          id?: string
          joined_at?: string
          points_earned?: number | null
          user_id: string
          winnings?: number | null
        }
        Update: {
          contest_id?: string
          entry_fee_paid?: number
          fantasy_team_id?: string
          final_rank?: number | null
          id?: string
          joined_at?: string
          points_earned?: number | null
          user_id?: string
          winnings?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contest_entries_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contest_entries_fantasy_team_id_fkey"
            columns: ["fantasy_team_id"]
            isOneToOne: false
            referencedRelation: "fantasy_teams"
            referencedColumns: ["id"]
          },
        ]
      }
      contests: {
        Row: {
          created_at: string
          current_participants: number | null
          deadline: string
          difficulty: string | null
          entry_fee: number
          game_id: string
          id: string
          max_participants: number | null
          name: string
          prize_pool: number
          status: string | null
          type: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          deadline: string
          difficulty?: string | null
          entry_fee?: number
          game_id: string
          id?: string
          max_participants?: number | null
          name: string
          prize_pool?: number
          status?: string | null
          type: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          deadline?: string
          difficulty?: string | null
          entry_fee?: number
          game_id?: string
          id?: string
          max_participants?: number | null
          name?: string
          prize_pool?: number
          status?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "contests_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      fantasy_teams: {
        Row: {
          contest_id: string
          created_at: string
          id: string
          rank: number | null
          status: string | null
          team_name: string
          total_points: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          contest_id: string
          created_at?: string
          id?: string
          rank?: number | null
          status?: string | null
          team_name: string
          total_points?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          contest_id?: string
          created_at?: string
          id?: string
          rank?: number | null
          status?: string | null
          team_name?: string
          total_points?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fantasy_teams_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          category: string
          created_at: string
          description: string | null
          end_time: string | null
          id: string
          image_url: string | null
          player_count: number | null
          start_time: string | null
          status: string | null
          title: string
          total_prize_pool: number | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          image_url?: string | null
          player_count?: number | null
          start_time?: string | null
          status?: string | null
          title: string
          total_prize_pool?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          end_time?: string | null
          id?: string
          image_url?: string | null
          player_count?: number | null
          start_time?: string | null
          status?: string | null
          title?: string
          total_prize_pool?: number | null
        }
        Relationships: []
      }
      leaderboards: {
        Row: {
          contest_id: string | null
          id: string
          rank: number
          total_points: number
          tournament_id: string | null
          updated_at: string
          user_id: string
          winnings: number | null
        }
        Insert: {
          contest_id?: string | null
          id?: string
          rank: number
          total_points?: number
          tournament_id?: string | null
          updated_at?: string
          user_id: string
          winnings?: number | null
        }
        Update: {
          contest_id?: string | null
          id?: string
          rank?: number
          total_points?: number
          tournament_id?: string | null
          updated_at?: string
          user_id?: string
          winnings?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "leaderboards_contest_id_fkey"
            columns: ["contest_id"]
            isOneToOne: false
            referencedRelation: "contests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leaderboards_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          name: string
          points: number | null
          position: string
          price: number
          status: string | null
          team: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          name: string
          points?: number | null
          position: string
          price?: number
          status?: string | null
          team: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          name?: string
          points?: number | null
          position?: string
          price?: number
          status?: string | null
          team?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          id: string
          kyc_verified: boolean | null
          updated_at: string
          user_id: string
          username: string | null
          wallet_balance: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          kyc_verified?: boolean | null
          updated_at?: string
          user_id: string
          username?: string | null
          wallet_balance?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          id?: string
          kyc_verified?: boolean | null
          updated_at?: string
          user_id?: string
          username?: string | null
          wallet_balance?: number | null
        }
        Relationships: []
      }
      team_players: {
        Row: {
          added_at: string
          fantasy_team_id: string
          id: string
          is_captain: boolean | null
          is_vice_captain: boolean | null
          player_id: string
        }
        Insert: {
          added_at?: string
          fantasy_team_id: string
          id?: string
          is_captain?: boolean | null
          is_vice_captain?: boolean | null
          player_id: string
        }
        Update: {
          added_at?: string
          fantasy_team_id?: string
          id?: string
          is_captain?: boolean | null
          is_vice_captain?: boolean | null
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_players_fantasy_team_id_fkey"
            columns: ["fantasy_team_id"]
            isOneToOne: false
            referencedRelation: "fantasy_teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string
          description: string | null
          end_date: string
          entry_fee: number | null
          id: string
          image_url: string | null
          name: string
          prize_pool: number | null
          start_date: string
          status: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          name: string
          prize_pool?: number | null
          start_date: string
          status?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string
          entry_fee?: number | null
          id?: string
          image_url?: string | null
          name?: string
          prize_pool?: number | null
          start_date?: string
          status?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          metadata: Json | null
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          metadata?: Json | null
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
