//USER
export interface IUser {
  user_id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  created_at: string;
  modified_at: string;
}
