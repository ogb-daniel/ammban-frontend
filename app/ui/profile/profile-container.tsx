export default function ProfileContainer({ title }: { title: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
    </div>
  );
}
