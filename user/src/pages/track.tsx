import axios from "axios";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CircleAlert, Pickaxe, BadgeCheck } from "lucide-react";

const TrackComplaint = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [complaintId, setComplaintId] = useState<string>("");
  const [complaint, setComplaint] = useState<any>();

  const trackComplaint = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/complaintRoutes/trackComplaint`,
        {
          complaintId,
        }
      );
      setComplaint(res.data.complaint);
      toast.success(res.data.message);
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="w-full h-12 bg-white shadow-sm flex items-center px-2">
        <p
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ChevronLeft size={"1rem"} /> back
        </p>
      </div>

      <form
        onSubmit={trackComplaint}
        className="w-[95%] ml-[50%] translate-x-[-50%] bg-white flex flex-col rounded-md shadow-sm p-5 mt-5"
      >
        <label htmlFor="complaint-id" className="text-sm text-gray-900 mt-3">
          Enter Complaint Id
        </label>
        <input
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setComplaintId(e.target.value);
          }}
          id="complaint-id"
          type="text"
          className="w-full rounded-md py-2 h-12 px-3 outline-gray-300 shadow-sm border border-gray-100 bg-neutral-100"
        />

        <button
          type="submit"
          className={`flex gap-1 justify-center items-center rounded-md bg-gray-900 text-sm font-semibold text-white p-2 outline-none cursor-pointer mt-5 ${
            loading && "pointer-events-none cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="flex flex-row gap-2 w-full h-full justify-center items-center p-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:.6s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:.6s]"></div>
            </div>
          ) : (
            "Track Complaint"
          )}
        </button>
      </form>

      {complaint && (
        <div className="w-[95%] ml-[50%] translate-x-[-50%] bg-white flex flex-col gap-2 rounded-md shadow-sm p-5 mt-5">
          <img className="w-full rounded-lg" src={complaint.photo} alt="" />

          <div className="flex items-center justify-between mt-3">
            <p className="text-lg">{complaint.name}</p>
            <p className="text-lg">{complaint.phone}</p>
          </div>

          <p className="text-lg bg-blue-100/50 rounded-md p-2 mt-3">
            {complaint.description}
          </p>

          <div className="w-full flex justify-center mt-5">
            <ul className="list-none flex flex-col gap-5 pl-2 border-l border-neutral-400">
              <li
                className={`text-2xl text-neutral-400 flex items-center gap-1 ${
                  complaint.status === "Pending" && "text-red-500"
                }`}
              >
                {" "}
                <CircleAlert />
                pending
              </li>
              <li
                className={`text-2xl text-neutral-400 flex items-center gap-1 ${
                  complaint.status === "Progress" && "text-yellow-500"
                }`}
              >
                <Pickaxe />
                in process
              </li>
              <li
                className={`text-2xl text-neutral-400 flex items-center gap-1 ${
                  complaint.status === "Solved" && "text-green-500"
                }`}
              >
                <BadgeCheck />
                issue resolved
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackComplaint;
