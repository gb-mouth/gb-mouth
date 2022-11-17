import { useUrl, Link, useCart } from "@shopify/hydrogen";
import { useWindowScroll } from "react-use";
import { Drawer, useDrawer } from "./Drawer.client";
import { CartDetails } from "./CartDetails.client";
import { IconBag, IconMenu } from "./elements/Icon";

export default function Header({ shop }) {
  const { pathname } = useUrl();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();


  const isHome = pathname === "/";
  const title = shop.name;

  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className="grid">
          <Drawer.Title>
            <h2 className="sr-only">Cart Drawer</h2>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
      <MobileHeader
          title={title}
          isHome={isHome}
          openCart={openCart}
          openMenu={openMenu}
      />
    </>
  );
}

function MobileHeader({title, isHome, openCart, openMenu}) {
  const {y} = useWindowScroll();

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-black/80 text-white dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    } flex h-16 p-6 md:p-8 lg:p-12 lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`,
  };

  /** 元のコード
      <header
      role="banner"
      className={`flex items-center h-16 p-6 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm ${
        isHome ? "bg-black/80 text-white" : "bg-white/80"
      }`}
    >
      <div className="flex gap-12">
        <Link className="font-bold" to="/">
          {shop.name}
        </Link>
      </div>

      <button
        onClick={openDrawer}
        className="relative flex items-center justify-center w-8 h-8"
      >
        <IconBag />
        <CartBadge dark={isHome} />
      </button>
    </header>
  */

  return (
    <header role="banner" className={styles.container}>
      <div className="flex items-center justify-start w-full gap-4">
        <button onClick={openMenu} className={styles.button}>
          <IconMenu />
        </button>

        <Link
          className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
          to="/"
        >
          <div className="font-bold text-center" as={isHome ? 'h1' : 'h2'}>
            {title}
          </div>
        </Link>
        <button
          onClick={openCart}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconBag />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function CartBadge({ dark }) {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark ? "text-black bg-white" : "text-white bg-black"
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
