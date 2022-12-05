import { Link } from "@shopify/hydrogen";
import GbMouth from '../../assets/gb-mouth.mp4'

export function TopView({}) {
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
        </div>
      </section>
    </Link>
  );
}