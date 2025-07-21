const Navbar = () => {
  return (
    <nav className="w-full py-12 pl-0 lg:pl-40 flex justify-center lg:justify-start">
      <div className="flex flex-row gap-2">
        <img src="/logo.svg" alt="LOGO" className="rounded" />
        <h1 className="text-[#dfe0fd] text-3xl font-semibold tracking-wider">
          Intervu.AI
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
