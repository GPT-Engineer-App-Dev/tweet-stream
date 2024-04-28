import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchTweets = async () => {
  let { data: tweets, error } = await supabase
    .from('tweets')
    .select('*')
    .order('timestamp', { ascending: false });
  if (error) throw error;
  return tweets;
};

export const postTweet = async (tweet) => {
  const { data, error } = await supabase
    .from('tweets')
    .insert([tweet]);
  if (error) throw error;
  return data;
};

export const storeTweet = async (tweet) => {
  const { data, error } = await supabase
    .from('tweets')
    .insert([tweet]);
  if (error) throw error;
  return data;
};