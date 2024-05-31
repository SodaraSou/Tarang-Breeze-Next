import Image from "next/image";

function BadmintonCourtBanner() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 border-none shadow-none rounded-none">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image
          src="/badminton_court.png"
          alt="badminton_court"
          width={300}
          height={300}
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
        <h1 className="font-bold text-4xl mb-4">Badminton Court</h1>
        <p>
          Our court is designed to meet international standards, offering a
          smooth, well-maintained surface that enhances your performance and
          reduces the risk of injury. You'll enjoy a superior playing
          experience.
        </p>
      </div>
    </div>
  );
}

export default BadmintonCourtBanner;
