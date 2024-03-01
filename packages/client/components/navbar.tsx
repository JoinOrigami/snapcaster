import LogoTypeDark from "@images/logo-type.svg";
import LogoType from "@images/logo-type-light.svg";
import Image from "next/image";

import SignIn from "@components/signin";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center justify-between mb-6 container">
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

      <SignIn />
    </div>
  );
}

export default Navbar;
