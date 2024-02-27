import SignIn from "@components/signin";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl py-6">
      <div className="flex items-center justify-between">
        <h1>Snapcaster</h1>
        <SignIn />
      </div>
    </div>
  );
}
