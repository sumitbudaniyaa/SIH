import { useEffect, useState } from "react";
import Header from "../components/header";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

type locationType = {
  type: string;
  coordinates: number[];
};

type complaintType = {
  location: locationType;
  name: string;
  phone: string;
  photo: string;
  category: string;
  description: string;
};

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [complaint, setComplaint] = useState<complaintType>({
    location: {
      type: "Point",
      coordinates: [],
    },
    name: "",
    phone: "",
    category: "None",
    description: "",
    photo: "",
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location access is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setComplaint((prev: complaintType) => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: [pos.coords.longitude, pos.coords.latitude],
          },
        }));
      },
      (err) => {
        toast.error(
          "Could not get your location. Please allow location access."
        );
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      setComplaint((prev) => ({
        ...prev,
        photo: base64,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(complaint.category === "None") {toast.error("Please select a valid category"); return;}
    if(complaint.photo === ""){toast.error("Please upload a photo"); return;}

    try {
      setLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/complaintRoutes/createComplaint`,
        complaint
      );

      toast.success(res.data.message);

      setComplaint({
        location: {
          type: "Point",
          coordinates: [],
        },
        name: "",
        phone: "",
        category: "None",
        description: "",
        photo: "",
      });
      getLocation();
    } catch (err: any) {
      toast.error(err.response?.data?.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center mb-20">
      <Toaster position="top-center" />
      <Header />

      <div className="w-[95%] rounded-2xl bg-white p-5 shadow-sm mt-10 flex flex-col items-center gap-4">
        <div className="w-full h-70 relative">
          {complaint.photo ? (
            <img
              src={complaint?.photo}
              className="w-full h-full rounded-xl"
              alt=""
            />
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
            value={complaint?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setComplaint((prev) => ({ ...prev, name: e.target.value }));
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
              setComplaint((prev) => ({ ...prev, phone: e.target.value }));
            }}
            required
            type="tel"
            id="phone"
            className="w-full rounded-md py-2 h-12 px-3 outline-gray-300 shadow-sm border border-gray-100 bg-neutral-100"
            maxLength={10}
            minLength={10}
            value={complaint.phone}
          />

          <label htmlFor="category" className="text-sm text-gray-900 mt-3">
            Select Category
          </label>
          <select
            value={complaint?.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setComplaint((prev) => ({ ...prev, category: e.target.value }));
            }}
            name="category"
            id="category"
            className="w-full p-2 h-12 rounded-md bg-neutral-100 border-gray-100 border outline-gray-300 shadow-sm"
          >
            <option value="None">None</option>
            <option value="Road">Road</option>
            <option value="Sewage">Sewage</option>
          </select>

          <label htmlFor="description" className="text-sm text-gray-900 mt-3">
            Enter Description
          </label>
          <textarea
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setComplaint((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
            required
            id="description"
            value={complaint.description}
            className="w-full min-h-20 rounded-md py-2 px-3 outline-gray-300 shadow-sm border border-gray-100 bg-neutral-100"
          />

          <button
            type="submit"
            className={`flex gap-1 items-center rounded-md bg-gray-900 text-sm font-semibold text-white p-2 cursor-pointer justify-center mt-5 ${
              loading ? "cursor-not-allowed pointer-events-none" : ""
            }`}
          >
            {loading ? (
              <div className="flex flex-row gap-2 w-full h-full justify-center items-center p-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:.6s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:.6s]"></div>
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
