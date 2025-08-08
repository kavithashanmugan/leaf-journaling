import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://uvrhubgkjfexwwitdnfh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2cmh1YmdramZleHd3aXRkbmZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MTM5MDcsImV4cCI6MjA2OTE4OTkwN30.aBqi6WQkkc39R6ViMu2_TIh5DDBIQrAlTiQ-ei1v5js";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
