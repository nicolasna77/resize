import Link from "next/link";

const Header = () => {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="container flex h-16 items-center">
          <Link href="/" className="text-4xl px-4 font-bold">
            Resize<span className="text-primary">2</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
