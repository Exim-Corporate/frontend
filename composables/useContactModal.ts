export const useContactModal = () => {
  const isOpen = useState<boolean>('contact-modal-open', () => false);
  const source = useState<string>('contact-modal-source', () => 'general');

  const open = (nextSource: string = 'general') => {
    source.value = nextSource;
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    source,
    open,
    close,
  };
};
