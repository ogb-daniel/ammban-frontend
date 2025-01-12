import React from "react";
import Logo from "./logo";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-6 border-t-2 ">
      <section className="md:grid grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3">
            CUBECOVER is committed to providing tailored insurance solutions
            that safeguard what matters most to you. With comprehensive plans
            and exceptional support, we ensure peace of mind for individuals,
            families, and businesses alike.
          </p>
          <div className="mt-8">
            <p className="font-bold">Connect with us</p>
            <div className="flex gap-4">
              <Link href={"#"}>
                <AiOutlineFacebook size={20} />
              </Link>
              <Link href={"#"}>
                <AiOutlineLinkedin size={20} />
              </Link>
              <Link href={"#"}>
                <AiOutlineTwitter size={20} />
              </Link>
              <Link href={"#"}>
                <AiOutlineInstagram size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-10 ">
        <p className="border-t-2 pt-4 md:text-center">
          Copyright &copy; {new Date().getFullYear()} CUBECOVER. All Rights
          Reserved. The Cubecover word mark is a registered trademark.
        </p>
      </div>
      <div className="mx-auto w-fit mt-10 space-x-7 text-gray-600">
        <Link href={"#"}>Cookies</Link>
        <Link href={"#"}>Terms and agreement</Link>
      </div>
    </footer>
  );
}
