import SignIn from "@components/signin";
import LogoTypeDark from "@images/logo-type.svg";
import LogoType from "@images/logo-type-light.svg";
import Image from "next/image";

async function Navbar() {
  return (
    <div className="flex items-center justify-between py-6 container">
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

      <SignIn />
    </div>
  );
}

export default Navbar;
