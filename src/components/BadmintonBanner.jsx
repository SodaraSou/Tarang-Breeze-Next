import Image from "next/image";

function BadmintonBanner() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 border-none shadow-none rounded-none">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image src="/badminton.png" alt="football" width={300} height={300} />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
        <h1 className="font-bold text-4xl mb-4">Badminton</h1>
        <p>
          Join Tarang to find a Badminton team to play with or compete against.
          Discover venues to book for your matches and immerse yourself in the
          world of Badminton.
        </p>
      </div>
    </div>
  );
}

export default BadmintonBanner;
