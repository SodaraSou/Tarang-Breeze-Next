import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-white border-t bg-muted/40">
      <div className="max-w-7xl mx-auto flex justify-between p-4 xl:px-10">
        <Link href="/">
          <Image src="/tarang_logo.png" alt="logo" width={150} height={50} />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
