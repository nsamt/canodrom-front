import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HeaderLogin } from "@/components/HeaderLogin";
import { RegisterService } from "@/services/RegisterService";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // <-- Agrega un estado para el correo electrónico
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError("");
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError("");
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    // <-- Agrega un controlador para el correo electrónico
    setEmail(e.target.value);
    setError("");
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await RegisterService(username, email, password); // <-- Pasa el correo electrónico a RegisterService
      navigate("/dashboard");
    } catch (error) {
      console.error("error", error);
      setError("Les dades son incorrectes");
    }
  };

  return (
    <>
      <HeaderLogin />
      <form
        className="flex h-screen items-center justify-center"
        onSubmit={onSubmit}
      >
        <Card className="h-[500px] w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl pt-4">Registre d'usuaris</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-2 pt-6">
            <Label htmlFor="name" className="text-xl">
              Nom d'usuari
            </Label>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
            />
            <Label htmlFor="email" className="text-xl">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              value={email} // <-- Usa el estado del correo electrónico aquí
              onChange={onChangeEmail} // <-- Usa el controlador del correo electrónico aquí
            />
            <Label htmlFor="password" className="text-xl pt-2">
              Contrasenya
            </Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-[40%] bg-teal-400">Registre</Button>
            <Button
              className="w-[40%] bg-teal-400 ml-4"
              onClick={() => navigate("/")}
            >
              Tornar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
};
