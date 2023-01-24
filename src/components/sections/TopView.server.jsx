import { Link } from "@shopify/hydrogen";
import GbMouth from '../../assets/gb-mouth34.mp4'
import { Heading } from "../elements/Heading";
import { Text } from "../elements/Text";

export function TopView({}) {
  const heading = {value: 'Welcome to Good Mouth Bad Mouth'}
  const byline = null
  const cta = {value: 'Shop Now →'}
  return (
    <Link to='/products'>
      <section className={`relative justify-end flex flex-col w-full -mt-nav h-screen`} >
        <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-1 content-stretch overflow-clip">
          <video
            className="block object-cover w-full h-full"
            src={GbMouth}
            muted
            loop
            playsInline
            autoPlay
          ></video>
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inset-4 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-1 content-stretch overflow-clip"> */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
            <div>
              <button className="w-64 dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast py-2 px-4 border border-primary-500 hover:border-transparent rounded">
                {cta?.value && <Text size="lead">{cta.value}</Text>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}