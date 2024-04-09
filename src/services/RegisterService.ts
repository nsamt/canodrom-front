import { registre } from "@/api/Api";

export const RegisterService = async (userName: string, email:string, password: string) => {
  const response = await registre(userName, email, password);
  return response.data;
};