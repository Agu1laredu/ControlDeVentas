import { client } from "../supabase/client";

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const result = await client.auth.signUp({
      email,
      password,
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProfile = async (email: string, password: string) => {
  try {
    const { data, error } = await client.auth.updateUser({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      throw new Error("An error occurred during authentication");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { error } = await client.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const {
      data: { user },
    } = await client.auth.getUser();
    if (user) {
      const { id, app_metadata, user_metadata } = user;

      if (app_metadata?.provider === "google" && user_metadata?.full_name) {
        return { username: user_metadata.full_name };
      }

      const { data, error, status } = await client
        .from("profiles")
        .select("id, full_name, updated_at")
        .eq("id", id)
        .single();

      if (error && status === 406) {
        throw new Error("An error has occurred");
      }

      return {
        username: data?.full_name,
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
