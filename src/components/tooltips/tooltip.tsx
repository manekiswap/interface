import { FiInfo } from 'react-icons/fi';

export default function Tooltip() {
  return (
    <FiInfo
      sx={{ marginLeft: '8px', color: 'white.300', '&:hover': { color: 'white.400' } }}
      size={16}
      onMouseEnter={() => {
        console.log('hover');
      }}
    />
  );
}
