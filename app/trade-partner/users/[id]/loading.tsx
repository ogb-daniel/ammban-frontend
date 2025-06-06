import CircleLoader from "@/app/ui/circle-loader";

export default function Loading() {
  return (
    <div className=" left-[50%] top-[50%]  z-50 translate-x-[-50%] translate-y-[-50%] absolute">
      <CircleLoader className="text-primary" />
    </div>
  );
}
