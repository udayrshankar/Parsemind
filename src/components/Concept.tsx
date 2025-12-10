import { Process } from "./Process";
import { TrustCenter } from "./TrustCenter";

export default function Concept() {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      <Process/>
      <TrustCenter/>
    </div>
  );
}