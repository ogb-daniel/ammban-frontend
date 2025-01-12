import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HOME } from "../lib/routes";

export default function Logo() {
  return (
    <Link href={HOME.url}>
      {" "}
      <Image
        src="/logo.png"
        width={117}
        height={27}
        alt="Cubecover logo"
      />{" "}
    </Link>
  );
}
