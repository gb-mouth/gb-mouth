import { Drawer } from "./Drawer.client";
import { CartDetails } from "../cart/CartDetails.client";

export function CartDrawer({isOpen, onClose}) {
  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart">
      <div className="grid">
        <CartDetails layout="drawer" onClose={onClose} />
      </div>
    </Drawer>
  );
}