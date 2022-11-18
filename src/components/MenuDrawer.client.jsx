import { Text } from "./elements/Text";
// import { Drawer } from "./Drawer.client";
import { Link } from "@shopify/hydrogen";
import { startTransition } from "react";
import { Heading } from "./elements/Heading";
import { IconClose } from "./elements/Icon";
import {Fragment, useState} from 'react';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Dialog, Transition} from '@headlessui/react';


export function MenuDrawer({isOpen, onClose}) {
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
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({menu, onClose}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <Link
          key={item.id}
          to={item.to}
          target={item.target}
          onClick={() => startTransition(onClose)}
        >
          <Text as="span" size="copy" className="text-slate-50">
            {item.title}
          </Text>
        </Link>
      ))}
    </nav>
  );
}

/**
 * Drawer component that opens on user click.
 * @param heading - string. Shown at the top of the drawer.
 * @param open - boolean state. if true opens the drawer.
 * @param onClose - function should set the open state.
 * @param openFrom - right, left
 * @param children - react children node.
 */
 function Drawer({heading, open, onClose, openFrom = 'left', children}) {
  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-100" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`fixed inset-y-0 flex max-w-full ${
                openFrom === 'right' ? 'right-0' : ''
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="pt-8 w-screen max-w-lg text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-contrast">
                  <header
                    className={`sticky top-0 flex items-center px-6 h-nav sm:px-8 md:px-12 ${
                      heading ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {heading !== null && (
                      <Dialog.Title>
                        <Heading as="span" size="lead" id="cart-contents" className="text-slate-50">
                          {heading}
                        </Heading>
                      </Dialog.Title>
                    )}
                    <button
                      type="button"
                      className="p-4 -m-4 transition text-primary hover:text-primary/50"
                      onClick={onClose}
                    >
                      <IconClose aria-label="Close panel" className="text-slate-50" />
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export {Drawer};

export function useMenuDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}


