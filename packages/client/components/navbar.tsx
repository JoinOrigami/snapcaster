import LogoTypeDark from "@images/logo-type.svg";
import LogoType from "@images/logo-type-light.svg";
import Image from "next/image";

import SignIn from "@components/signin";
import Link from "next/link";
import { useAuth, useProfile } from "@hooks/queries";

function Navbar() {
  const { data: auth } = useAuth();
  const { data: profile } = useProfile();

  return (
    <div className="flex items-center justify-between mb-8 container">
      <Link href="/">
        <Image
          src={LogoTypeDark}
          alt="Snapcaster"
          height={50}
          className="hidden dark:block"
        />
        <Image
          src={LogoType}
          alt="Snapcaster"
          height={50}
          className="dark:hidden"
        />
      </Link>

      {!auth && <SignIn />}
      {profile && (
        <div className="flex items-center gap-4">
          <img src={profile.pfp_url} alt={profile.username} className="rounded-full w-10 h-10"/>
          <div>
            <p className="text-gray-200 text-xs">logged in as</p>
            <h4 className="mb-1">{profile.username}</h4>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
