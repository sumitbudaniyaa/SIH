import { useEffect, useState } from "react";
import Header from "../components/header";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [location, setLocation] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [category, setCategory] = useState<string>("None");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  const getLocation = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          toast.error(
            "Could not get your location. Please allow location access."
          );
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(()=>{
    getLocation();
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    console.log(name);
    console.log(phone);
    console.log(category);
    console.log(description);
    console.log(photo);
    console.log(location);

    toast.success("Complaint created")
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center mb-20">
      <Toaster position="top-center" />
      <Header />

      <div className="w-[95%] rounded-2xl bg-white p-5 shadow-sm mt-10 flex flex-col items-center gap-4">
        <div className="w-full h-70 relative">
          {photo ? (
            <img src={photo} className="w-full h-full rounded-xl" alt="" />
          ) : (
            <>
              <label
                htmlFor="photo"
                className="rounded-xl border-2 border-dashed border-gray-900 absolute top-0 left-0 h-full w-full cursor-pointer flex items-center justify-center text-xl font-semibold text-gray-900"
              >
                Add Photo
              </label>
              <input
                accept="image/*"
                required
                type="file"
                id="photo"
                className="w-full hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handlePhoto(e)
                }
              />
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col">
          <label htmlFor="name" className="text-sm text-gray-900">
            Enter Name
          </label>
          <input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
            required
            type="text"
            id="name"
            className="w-full rounded-md py-2 h-12 px-3 outline-gray-300 shadow-sm border border-gray-100 bg-neutral-100"
          />

          <label htmlFor="phone" className="text-sm text-gray-900 mt-3">
            Enter Phone Number
          </label>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPhone(e.target.value);
            }}
            required
            type="tel"
            id="phone"
            className="w-full rounded-md py-2 h-12 px-3 outline-gray-300 shadow-sm border border-gray-100 bg-neutral-100"
            maxLength={10}
          />

          <label htmlFor="category" className="text-sm text-gray-900 mt-3">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setCategory(e.target.value);
            }}
            name="category"
            id="category"
            className="w-full p-2 h-12 rounded-md bg-neutral-100 border-gray-100 border outline-gray-300 shadow-sm"
          >
            <option value="None">None</option>
            <option value="road">Road</option>
            <option value="sewage">Sewage</option>
          </select>

          <label htmlFor="description" className="text-sm text-gray-900 mt-3">
            Enter Description
          </label>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
            }}
            required
            id="description"
            className="w-full min-h-20 rounded-md py-2 px-3 outline-gray-300 shadow-sm border border-gray-100 bg-neutral-100"
          />

          <button
            type="submit"
            className="flex gap-1 items-center rounded-md bg-gray-900 text-sm font-semibold text-white p-2 cursor-pointer justify-center mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
