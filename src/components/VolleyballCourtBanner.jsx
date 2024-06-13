import Image from "next/image";

function VolleyballCourtBanner() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 border-none shadow-none rounded-none">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image
          src="/volleyball_court.png"
          alt="volleyball_court"
          width={300}
          height={300}
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
        <h1 className="font-bold text-4xl mb-4">Volleyball Court</h1>
        <p>
          Our volleyball court is built to professional standards, offering a
          firm, high-quality surface that supports intense rallies and powerful
          spikes. The well-marked boundaries and regulation net height ensure an
          authentic and competitive playing environment for all levels.
        </p>
      </div>
    </div>
  );
}

export default VolleyballCourtBanner;
