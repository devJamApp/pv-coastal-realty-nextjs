import ContactForm from "./ContactForm";
import Image from "next/image";
const Contact = () => {
  return (
    <div className="relative flex flex-row">
      <div className="relative h-screen w-full">
        <Image
          src="/paradise-beach.webp"
          fill={true}
          className="object-cover"
          alt="PV Coastal Realty: Contact Us Today To Find Your Dream Home In Paradise"
        />
        <div className="absolute h-full w-full bg-gradient-to-b from-zinc-50 via-zinc-50/90 to-zinc-100/20" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-4 w-full">
        <h3 className="text-6xl font-bold drop-shadow-md text-sky-500">
          Your Life In Paradise Awaits
        </h3>
        <div className="flex flex-col items-center space-y-4">
          <span className="text-2xl font-medium drop-shadow-md ">
            Take the next step towards your dream, contact PV Coastal Realty
            Today!
          </span>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
