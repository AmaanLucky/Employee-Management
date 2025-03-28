import { supabase } from '../lib/supabase';

export const signUp = async (credentials) => {
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        first_name: credentials.first_name,
        last_name: credentials.last_name,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const login = async (credentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) throw error;
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getUsers = async (page = 1) => {
  const { data: session } = await supabase.auth.getSession();
  const userId = session?.session?.user?.id;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('user_id', userId)
    .range((page - 1) * 6, page * 6 - 1)
    .order('created_at', { ascending: false });

  if (error) throw error;

  const { count } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  return {
    data,
    total_pages: Math.ceil((count || 0) / 6),
    page,
  };
};

export const updateUser = async (id, userData) => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const createUser = async (userData) => {
  const { data: session } = await supabase.auth.getSession();
  const userId = session?.session?.user?.id;

  const { data, error } = await supabase
    .from('users')
    .insert([{ ...userData, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
};