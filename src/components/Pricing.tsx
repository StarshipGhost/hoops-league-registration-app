import CheckIcon from "./icons/CheckIcon";
import DollarSignIcon from "./icons/DollarSignIcon";
import CardIcon from "./icons/CardIcon";
import { useHeaderContext } from "./customs/HeaderContext";
import SectionHeader from "./SectionHeader";
import { OrangeButton } from "./Button";

const PricingHeader = () => {
  return (
    <SectionHeader
      sectionIcon={{ icon: <DollarSignIcon /> }}
      iconBg={"bg-green-500/10 dark:bg-green-500/20"}
      title={"Pricing & Payment"}
      description={"The price include court rental and equipement"}
    />
  );
};

const PricingCheckLine = ({ text }: { text: string }) => {
  return (
    <div className="flex gap-2">
      <CheckIcon />
      <span className="text-sm sm:text-base dark:text-white">{text}</span>
    </div>
  );
};

const PricingCard = () => {
  const { scrollFunction } = useHeaderContext();
  const benefits = [
    "Access to one game session",
    "More than 2 hours of play time",
    "All equipement provided",
    "Sports drink included",
    "Beginner friendly",
  ];
  return (
    <div className="flex flex-col items-center gap-2 border border-solid border-neutral-300 dark:border-neutral-500 sm:dark:border-neutral-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 py-8 px-[3vw] shadow-md">
      <h2 className="text-2xl font-bold dark:text-white">Single Game</h2>
      <div className="flex items-end gap-2">
        <h1 className="text-2xl font-bold tracking-tighter dark:text-white">$15</h1>
        <span className="text-center max-w-md text-zinc-500 dark:text-zinc-400">per game</span>
      </div>
      <p className="max-w-md text-base text-zinc-500 dark:text-zinc-400">Perfect for trying out our games</p>
      <div className="flex flex-col flex-wrap items-start gap-2 my-4">
        {benefits.map((benefit) => (
          <PricingCheckLine key={benefit} text={benefit} />
        ))}
      </div>
      <OrangeButton extra="w-full py-2" text="Get Started" onClick={() => scrollFunction(5)} />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900/60 flex flex-col gap-4 border border-solid sm:border-neutral-300  dark:border-neutral-500 sm:dark:border-neutral-800 rounded-2xl p-4 shadow-md">
      <div className="flex gap-3 items-center">
        <CardIcon />
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Accepted Payment Methods</h2>
      </div>
      <PricingCheckLine text="Cash (at venue)" />
      <div className="text-sm sm:text-base bg-gray-200 dark:bg-zinc-800 p-4 border border-solid border-neutral-300 dark:border-neutral-800 rounded-md">
        <b className="dark:text-white">Note: </b>
        <span className="max-w-md text-zinc-500 dark:text-zinc-400">
          If there are no spots left and you have a reserved spot (as a confirmed player), any no-show or cancellation
          within 2 hours of the games will count as a presence.
        </span>
      </div>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="flex flex-col items-center bg-white dark:bg-black px-[10vw] py-20 border-box gap-8">
      <PricingHeader />
      <PricingCard />
      <PaymentMethod />
    </div>
  );
};

export default Pricing;
