import Image from "next/image";

function FootballFieldBanner() {
  return (
    <div className="flex flex-col md:flex-row justify-between p-10 border-none shadow-none rounded-none">
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <Image
          src="/football-field.png"
          alt="football"
          width={300}
          height={300}
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left md:p-16">
        <h1 className="font-bold text-4xl mb-4">Footbal Field</h1>
        <p>
          Designed to meet professional standards, complete with high-quality
          turf. Whether you're a seasoned player or just looking to have some
          fun, our football field provides the perfect setting for all skill
          levels.
        </p>
      </div>
    </div>
  );
}

export default FootballFieldBanner;
