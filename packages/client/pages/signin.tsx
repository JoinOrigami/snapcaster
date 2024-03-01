import SignIn from "@components/signin";
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <SignIn
        onSuccess={() => router.push((router.query.next as string) || "/")}
      />
    </div>
  );
}

Page.getLayout = (page: any) => page;

export default Page;
