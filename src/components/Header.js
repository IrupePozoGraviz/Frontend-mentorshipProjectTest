/* eslint-disable react/react-in-jsx-scope */
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from '@mui/material';
import Image from '../helpers/Image';
import './Header.css';
import Tinder from '../assets/tinder-icon.png';

const Header = () => {
  return (
    <div className="header">
      <IconButton>
        <PersonIcon fontSize="large" className="header_icon" />
      </IconButton>
      <Image src={Tinder} className="header__logo" alt="Tinder Logo" />
      <IconButton>
        <ForumIcon />
      </IconButton>
    </div>
  )
}
export default Header;
