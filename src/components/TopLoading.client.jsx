import Modal from 'react-modal';
import { useState } from "react";
import GbMouth from '../assets/gb-mouth2.mp4'

const customStyles = {
  overlay: {
    zIndex: 333
  },
  content: {
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
  },
};

export function TopLoading () {
  const [showModal, setShowModal] = useState(true);

  const handleClickModal = () => {
    console.log()
    setShowModal(false);
  }

  return (
    <div onClick={handleClickModal} className="relative top-0 w-full h-full">
        <Modal 
          isOpen={showModal}
          contentLabel="Minimal Modal Example"
          style={customStyles}
          className="absolute"
        >
          <video
            className="block object-cover w-full h-full"
            src={GbMouth}
            muted
            loop
            playsInline
            autoPlay
          ></video>
        </Modal>
    </div>
  );
};
