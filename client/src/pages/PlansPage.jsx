// import axios from "axios";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../app/store";
import PlanCard from "../components/PlanCard";
// import usePlans from "../hooks/usePlans";


export default function PlansPage() {
  

  return (
    <div className="flex items-center h-screen justify-center bg-black">
      <div className="w-[600px]">
        <h1 className="font-semibold text-3xl">
          Choose a plan that works for you
        </h1>
        <div className="flex mt-4 gap-4">
          <PlanCard />
          <PlanCard />
        </div>
        <button
          className="rounded bg-red-500 hover:bg-red-700 p-3 text-white px-10 mt-3 w-full"          
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
