export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          company_name: string
          created_at: string
          id: string
          jd_analysis: Json
          jd_source_url: string | null
          jd_text: string | null
          owner_id: string
          role_title: string
          status: string
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          jd_analysis?: Json
          jd_source_url?: string | null
          jd_text?: string | null
          owner_id?: string
          role_title: string
          status?: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          jd_analysis?: Json
          jd_source_url?: string | null
          jd_text?: string | null
          owner_id?: string
          role_title?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      career_evidence: {
        Row: {
          action: string | null
          challenge: string | null
          context: string | null
          created_at: string
          evidence_status: string
          id: string
          is_public_safe: boolean
          metrics: Json
          owner_id: string
          result: string | null
          source_note: string | null
          title: string
          tools: Json
          updated_at: string
        }
        Insert: {
          action?: string | null
          challenge?: string | null
          context?: string | null
          created_at?: string
          evidence_status?: string
          id?: string
          is_public_safe?: boolean
          metrics?: Json
          owner_id?: string
          result?: string | null
          source_note?: string | null
          title: string
          tools?: Json
          updated_at?: string
        }
        Update: {
          action?: string | null
          challenge?: string | null
          context?: string | null
          created_at?: string
          evidence_status?: string
          id?: string
          is_public_safe?: boolean
          metrics?: Json
          owner_id?: string
          result?: string | null
          source_note?: string | null
          title?: string
          tools?: Json
          updated_at?: string
        }
        Relationships: []
      }
      portfolio_publications: {
        Row: {
          application_id: string
          created_at: string
          current_revision_id: string | null
          expires_at: string | null
          id: string
          noindex: boolean
          published_at: string | null
          published_content: Json
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          application_id: string
          created_at?: string
          current_revision_id?: string | null
          expires_at?: string | null
          id?: string
          noindex?: boolean
          published_at?: string | null
          published_content?: Json
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          created_at?: string
          current_revision_id?: string | null
          expires_at?: string | null
          id?: string
          noindex?: boolean
          published_at?: string | null
          published_content?: Json
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_publications_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_publications_current_revision_id_fkey"
            columns: ["current_revision_id"]
            isOneToOne: false
            referencedRelation: "portfolio_revisions"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_revisions: {
        Row: {
          application_id: string
          change_summary: string | null
          competency_structure: Json
          created_at: string
          hero_options: Json
          id: string
          page_content: Json
          revision_no: number
          selected_hero: Json
        }
        Insert: {
          application_id: string
          change_summary?: string | null
          competency_structure?: Json
          created_at?: string
          hero_options?: Json
          id?: string
          page_content?: Json
          revision_no: number
          selected_hero?: Json
        }
        Update: {
          application_id?: string
          change_summary?: string | null
          competency_structure?: Json
          created_at?: string
          hero_options?: Json
          id?: string
          page_content?: Json
          revision_no?: number
          selected_hero?: Json
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_revisions_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_portfolio_revision: {
        Args: {
          p_application_id: string
          p_change_summary?: string
          p_competency_structure?: Json
          p_hero_options?: Json
          p_page_content?: Json
          p_selected_hero?: Json
        }
        Returns: {
          application_id: string
          change_summary: string | null
          competency_structure: Json
          created_at: string
          hero_options: Json
          id: string
          page_content: Json
          revision_no: number
          selected_hero: Json
        }
        SetofOptions: {
          from: "*"
          to: "portfolio_revisions"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      publish_portfolio_revision: {
        Args: { p_publication_id: string; p_revision_id: string }
        Returns: {
          application_id: string
          created_at: string
          current_revision_id: string | null
          expires_at: string | null
          id: string
          noindex: boolean
          published_at: string | null
          published_content: Json
          slug: string
          status: string
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "portfolio_publications"
          isOneToOne: true
          isSetofReturn: false
        }
      }
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
