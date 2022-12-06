import Modal from 'react-modal';
import { useState } from "react";
import GbMouth from '../assets/gb-mouth.mp4'

const customStyles = {
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
    <div onClick={handleClickModal} div className="relative top-0 w-full h-full z-2">
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
