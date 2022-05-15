/* Definición propiedades usuarios */
export interface User {
  userId?: string;
  email: string;
  nombre: string;
  password?: string;
  password2?: string;
  image?: any;
  admin?: boolean;
}
