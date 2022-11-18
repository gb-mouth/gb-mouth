import { useUrl, Link, useCart } from "@shopify/hydrogen";
import { useWindowScroll } from "react-use";
import { useDrawer } from "./Drawer.client";
import { IconBag, IconMenu } from "./elements/Icon";
import { CartDrawer } from "./CartDrawer.client";
import { MenuDrawer, useMenuDrawer } from "./MenuDrawer.client";

export default function Header({ shop }) {
  const { pathname } = useUrl();
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useMenuDrawer();


  const isHome = pathname === "/";
  const title = shop.name;

  const menu = {
    items: [
      {
        id: 1,
        to: '/',
        title: 'Home',
        target: '_self'
      },
      {
        id: 2,
        to: '/products',
        title: 'Products',
        target: '_self'
      },
    ]
  };

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu}/>
      <DesktopHeader
        title={title}
        isHome={isHome}
        openCart={openCart}
        menu={menu}
      />
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
            {title.toUpperCase()}
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

function DesktopHeader({countryCode, isHome, menu, openCart, title}) {
  const {y} = useWindowScroll();

  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
    container: `${
      isHome
        ? 'bg-black/80 text-white dark:bg-contrast/60 text-contrast dark:text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`,
  };

  return (
    <header role="banner" className={styles.container}>
      <div className="flex gap-12">
        <Link className={`font-bold`} to="/">
          {title.toUpperCase()}
        </Link>
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <Link key={item.id} to={item.to} target={item.target}>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={openCart} className={styles.button}>
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
