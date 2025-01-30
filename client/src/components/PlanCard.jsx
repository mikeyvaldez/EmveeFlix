import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
// import usePlans from "../hooks/usePlans.js";


const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "CAD",
});

export default function PlanCard({ plan, setSelectedSession, selectedSession }) {
  const { name, price, canDownload, canWatchTrailerParkBoys } = plan;  

  return (
    <div
      className={`border rounded p-3 h-[350px] w-full pointer mr-3 cursor-pointer bg-white ${
        selectedSession === plan.price.id ? "border-3 border-black" : null
      }`}
      onClick={() => setSelectedSession(plan.price.id)}
    >
      <div className="rounded bg-gradient-to-r from-cyan-500 to-blue-500 w-full p-3 text-white font-bold">
        <h3 className="text-2xl">{name}</h3>
        <p className="font-light">{formatter.format(price.amount / 100)}</p>
      </div>

      <div className="border-b py-4 flex text-reg items-center">
        <div className="w-6 h-6 rounded-full text-sm bg-cyan-500 flex items-center justify-center">
          <CheckIcon color="white" width={15} fontWeight={900} />
        </div>
        <div className="ml-3">
          <h3 className="text-gray-600">Monthly price</h3>
          <h3 className="font-semibold">
            {formatter.format(price.amount / 100)}
          </h3>
        </div>
      </div>

      <div className="border-b py-4 flex text-reg items-center">
        {canDownload ? (
          <div className="w-6 h-6 rounded-full text-sm bg-cyan-500 flex items-center justify-center">
            <CheckIcon color="white" width={15} fontWeight={900} />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full text-sm bg-red-500 flex items-center justify-center">
            <XMarkIcon color="white" width={15} fontWeight={900} />
          </div>
        )}
        <div className="ml-3">
          <h3 className="text-gray-600">Downloads</h3>
          <h3 className="font-semibold">Included</h3>
        </div>
      </div>

      <div className="border-b py-4 flex text-reg items-center">
        {canWatchTrailerParkBoys ? (
          <div className="w-6 h-6 rounded-full text-sm bg-cyan-500 flex items-center justify-center">
            <CheckIcon color="white" width={15} fontWeight={900} />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full text-sm bg-red-500 flex items-center justify-center">
            <XMarkIcon color="white" width={15} fontWeight={900} />
          </div>
        )}
        <div className="ml-3">
          <h3 className="text-gray-600">Trailer Park Boys</h3>
          <h3 className="font-semibold">Included</h3>
        </div>
      </div>
    </div>
  );
}
