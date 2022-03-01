import * as React from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleModal = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleModal };
};

export { useModal };
