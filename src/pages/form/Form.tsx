import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

export const INITIAL_FORM_DATA = {
  personInCharge:"",
  startDate:"",
  title:"",
  program: "",
  repetition:"0",
  theme: "",
  type: "",
  targetAudience: "",
  Organizer: "",
  attendees: 0,
  femaleAttendees: 0,
  maleAttendees: 0,
  nonBinaryAttendees: 0,
  undisclosedAttendees: 0,
  heardThroughTwitter: 0,
  heardThroughFacebook: 0,
  heardThroughInstagram: 0,
  heardThroughMastodon: 0,
  heardThroughNewsletter: 0,
  heardThroughWeb: 0,
  heardThroughSigns: 0,
  heardThroughOther: 0,
  children:0,
  streaming:"",
  notes:"",
  endDate:"",
};
export function Form() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState("");
  const [Successful, setSuccessful] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://canodrom.onrender.com/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error en la sol·licitud");
      }
      setSuccessful("Enviat amb èxit");
      console.log("Datos enviados correctamente");
      console.log(formData);
    } catch (error) {
      setError("Error en l'enviament de les dades.");
      console.error("Error:", error);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  setTimeout(() => {
    setSuccessful("");
    setError("");
  }, 3000);
  return (
    <div className=" bg-[#F5F5F5]">
      <Header />
      <div className="flex justify-center m-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-10 gap-5 rounded-md border border-slate-300 w-[55%] bg-white"
        >
          <h1 className="text-4xl text-[#FFFFFF] font-bold mb-5 text-center bg-purple-700 p-5 rounded-md">
            Introdueix les dades de l'activitat
          </h1>
          <div className="flex flex-wrap gap-3">
                <Label className="flex flex-col mt-5">
              Responsable
              <Input
                type="text"
                name="personInCharge"
                value={formData.personInCharge}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-5">
              Títol
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
                required
              />
            </Label>
            <Label className="flex flex-col mt-5">
              Data inici
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col flex-grow mt-5">
              Notes
              <Input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="flex-grow bg-[#F5F5F5] mt-1"
              />
            </Label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Label className="flex flex-col mt-5">
              Streaming
              <Input
                type="text"
                name="streaming"
                value={formData.streaming}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Programa
              <Input
                type="text"
                name="program"
                value={formData.program}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Temàtica
              <Input
                type="text"
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Públic
              <Input
                type="text"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Organitzador
              <Input
                type="text"
                name="Organizer"
                value={formData.Organizer}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Tipus d'activitat
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Nº SESSIONS
              <Input
                type="number"
                name="repetition"
                value={formData.repetition}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Assistents
              <Input
                type="number"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Nº Homes
              <Input
                type="number"
                name="maleAttendees"
                value={formData.maleAttendees}
                onChange={handleChange}
                className="bg-[#F5F5F5]  mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Nº Dones
              <Input
                type="number"
                name="femaleAttendees"
                value={formData.femaleAttendees}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Nº No-binari
              <Input
                type="number"
                name="nonBinaryAttendees"
                value={formData.nonBinaryAttendees}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Nº NC
              <Input
                type="number"
                name="undisclosedAttendees"
                value={formData.undisclosedAttendees}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Infants que els acompanyen
              <Input
                type="number"
                name="children"
                value={formData.children}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
              Assabentat per Twitter
              <Input
                type="number"
                name="heardThroughTwitter"
                value={formData.heardThroughTwitter}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per Facebook
              <Input
                type="number"
                name="heardThroughFacebook"
                value={formData.heardThroughFacebook}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per Instagram
              <Input
                type="number"
                name="heardThroughInstagram"
                value={formData.heardThroughInstagram}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per Mastodon
              <Input
                type="number"
                name="heardThroughMastodon"
                value={formData.heardThroughMastodon}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per Newsletter
              <Input
                type="number"
                name="heardThroughNewsletter"
                value={formData.heardThroughNewsletter}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per Web
              <Input
                type="number"
                name="heardThroughWeb"
                value={formData.heardThroughWeb}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per Cartelleria
              <Input
                type="number"
                name="heardThroughSigns"
                value={formData.heardThroughSigns}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
            <Label className="flex flex-col mt-3">
            Assabentat per altres
              <Input
                type="number"
                name="heardThroughOther"
                value={formData.heardThroughOther}
                onChange={handleChange}
                className="bg-[#F5F5F5] mt-1"
              />
            </Label>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {Successful && <div style={{ color: "green" }}>{Successful}</div>}
          <Button
            type="submit"
            className="rounded-full bg-[#46FCD6] mt-5 transition duration-300"
          >
            Enviar
          </Button>
          <div className="text-center bg-[#AE80FF] p-2 hover:bg-purple-700 hover:text-white rounded-full transition duration-300 ">
            <Link to="../../dashboard" className="text-center ">
              Tornar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}