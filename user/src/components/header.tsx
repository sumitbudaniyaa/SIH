import { useNavigate } from "react-router-dom";
import { ChevronRight } from 'lucide-react';

const Header = () =>{

    const navigate = useNavigate();

    return(
        <div className="w-full bg-white h-15 shadow-sm flex px-2 items-center justify-between cursor-pointer">
            <h2 onClick={()=>navigate('/')} className="font-semibold text-lg">NAGAR MITRA</h2>

            <button onClick={()=>navigate('/track-complaint')} className="flex gap-1 justify-center items-center rounded-md bg-gray-900 text-sm font-semibold text-white p-2 cursor-pointer">Track Complaint <ChevronRight size={"1rem"}/></button>
        </div>
    )
}

export default Header;
