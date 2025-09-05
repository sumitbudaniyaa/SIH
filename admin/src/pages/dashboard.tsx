import Nav from "../components/nav";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import axios from "axios";
import { useEffect, useState } from "react";
import { User, Smartphone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [complaints, setComplaints] = useState<any[]>([]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/complaintRoutes/getComplaints`
      );
      setComplaints(res?.data?.complaints);
    } catch (err: any) {
      console.log(err);
    }
  };

  const updateComplaint = async (complaintId: any, status: string) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/complaintRoutes/updateComplaint`,
        { complaintId, status }
      );
      toast.success(res.data.message);
      fetchComplaints();
    } catch (err: any) {
      toast.error(err.response?.data?.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);
  
  const center: LatLngExpression = [26.9124, 75.7873];

  return (
    <div className="w-screen min-h-screen">
      <Toaster position="top-center" />
      <Nav />

      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "94vh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {complaints.map((complaint: any, index: number) => (
          <Marker
            key={index}
            position={[
              complaint.location.coordinates[1],
              complaint.location.coordinates[0],
            ]}
          >
            <Popup>
              <div className="p-3 w-80 flex flex-col rounded-xl bg-white ml-[50%] translate-x-[-50%] gap-2">
                <span className="bg-blue-100 text-blue-800 font-medium text-sm rounded-md flex items-center w-full justify-between px-2 py-1 self-start">
                  {complaint.category}
                  <code className="bg-white px-2 rounded-sm text-xs py-.5">
                    #{complaint.complaintId}
                  </code>
                </span>
                <img
                  src={complaint.photo}
                  className="w-full rounded-lg h-40 border border-gray-500"
                  alt="complaint"
                />
                <div className="flex flex-col text-gray-800">
                  <p className="text-base font-semibold flex items-center gap-1">
                    <User size={"1rem"} /> {complaint.name}
                  </p>
                  <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
                    <Smartphone size={"1rem"} /> {complaint.phone}
                  </p>
                  <p className="text-lg">{complaint.description}</p>
                </div>

                <div className="flex flex-col mt-2">
                  <div className="w-full flex items-center justify-between">
                    <p className="text-lg font-semibold">In progress?</p>
                    <label
                      className={`relative inline-flex items-center cursor-pointer ${
                        complaint.status === "Progress" ||
                        complaint.status === "Solved"
                          ? "pointer-events-none cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <input
                        onChange={() => {
                          updateComplaint(complaint?.complaintId, "Progress");
                        }}
                        type="checkbox"
                        checked={complaint.status === "Progress" || complaint.status === "Solved"
}
                        className={`sr-only peer ${
                          complaint.status === "Progress" ||
                          complaint.status === "Solved"
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      />
                      <div
                        className={`peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-8 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0 ${
                          complaint.status === "Progress" ||
                          complaint.status === "Solved"
                            ? "pointer-events-none cursor-not-allowed opacity-50"
                            : ""
                        }`}
                      ></div>
                    </label>
                  </div>


                  <div className="w-full flex items-center justify-between">
                    <p className="text-lg font-semibold">Issue solved?</p>
                    <label
                      className={`relative inline-flex items-center cursor-pointer ${
                 
                        complaint.status === "Solved"
                          ? "pointer-events-none cursor-not-allowed opacity-50"
                          : ""
                      }`}
                    >
                      <input
                        onChange={() => {
                          updateComplaint(complaint?.complaintId, "Solved");
                        }}
                        type="checkbox"
                        checked={complaint.status === "Solved"
}
                        className={`sr-only peer ${
                    
                          complaint.status === "Solved"
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                      />
                      <div
                        className={`peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-8 h-8  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0 ${
                
                          complaint.status === "Solved"
                            ? "pointer-events-none cursor-not-allowed opacity-50"
                            : ""
                        }`}
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Dashboard;
