import React from 'react'

interface ModalProps {
  children: React.ReactNode;
  active: boolean;
  setActive: (e: boolean) => void;
}


const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}

export default Modal
