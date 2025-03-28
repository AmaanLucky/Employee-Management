import axios from 'axios';
import { supabase } from '../lib/supabase';
import { LoginCredentials, User, ApiResponse, SignUpCredentials } from '../types';

const BASE_URL = 'https://reqres.in/api';

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const session = supabase.auth.getSession();
  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }
  return config;
});

export const signUp = async (credentials: SignUpCredentials) => {
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

export const login = async (credentials: LoginCredentials) => {
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

export const getUsers = async (page: number = 1) => {
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

export const updateUser = async (id: number, userData: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteUser = async (id: number) => {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const createUser = async (userData: Partial<User>) => {
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