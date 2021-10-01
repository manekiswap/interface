import { IconButton, IconButtonProps } from '@theme-ui/components';
import { FiStar } from 'react-icons/fi';

interface Props extends Omit<IconButtonProps, 'sx'> {
  active: boolean;
}

export default function FavoriteButton(props: Props) {
  const { className, active, onClick } = props;
  return (
    <IconButton className={className} variant="buttons.small-icon" sx={{ color: 'white.400' }} onClick={onClick}>
      <FiStar sx={{ fill: active ? 'currentColor' : 'transparent' }} />
    </IconButton>
  );
}
