import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="item-center hidden lg:flex">
        <Image src="/logo.svg" alt="logo" width={50} height={50} />
        <p className="text-3xl font-semibold text-white ml-2.5">
          Finance Manager
        </p>
      </div>
    </Link>
  );
};

export default HeaderLogo;
