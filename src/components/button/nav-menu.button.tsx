import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { Button, ButtonProps } from 'theme-ui';

import NavMenuModal from '../modals/nav-menu.modal';

type Props = ButtonProps;

export default function NavMenuButton(props: Omit<Props, 'sx'>) {
  const { className } = props;
  const [menuModalActive, setMenuModalActive] = useState(false);

  return (
    <>
      <Button
        className={className}
        variant="buttons.small-icon"
        sx={{ backgroundColor: 'dark.transparent', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => {
          setMenuModalActive(true);
        }}
      >
        <FiMenu sx={{ color: 'white.400' }} />
      </Button>
      <NavMenuModal
        active={menuModalActive}
        onClose={() => {
          setMenuModalActive(false);
        }}
      />
    </>
  );
}
