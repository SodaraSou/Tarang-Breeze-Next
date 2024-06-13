import Image from "next/image";

function PingPongTableBanner() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 border-none shadow-none rounded-none">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image
          src="/table-tennis.png"
          alt="table-tennis"
          width={300}
          height={300}
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
        <h1 className="font-bold text-4xl mb-4">Ping Pong Facilities</h1>
        <p>
          Our tables are designed to meet professional standards, featuring a
          perfectly smooth surface and precise markings for an accurate and
          enjoyable playing experience.
        </p>
      </div>
    </div>
  );
}

export default PingPongTableBanner;
