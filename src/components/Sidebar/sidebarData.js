// import profileImg from '../../assets/profile.svg';
// import SidebarIcon from '../icons/SidebarIcon';

import { ImUser } from 'react-icons/im';
import { IoLayersSharp } from 'react-icons/io5';
import { IoIosMail, IoIosResize } from 'react-icons/io';
import { GiEarthAfricaEurope } from 'react-icons/gi';
import { RiFileList3Line } from 'react-icons/ri';
import { FaChartLine } from 'react-icons/fa';
import { MdOutlineLiquor, MdColorLens } from 'react-icons/md';

export const sidebarData = [
  // { title: 'Home', icon: <HiHome />, tab: 'home' },
  { title: 'Profile', icon: <ImUser />, tab: 'profile' },
  // { title: 'Advertisements', icon: <GoChecklist />, tab: 'ads' },
  // { title: 'Categories', icon: <IoGrid />, tab: 'categories' },
  {
    title: 'Categories',
    icon: <IoLayersSharp />,
    tab: 'subcategories',
  },
  { title: 'Products', icon: <MdOutlineLiquor />, tab: 'products' },
  { title: 'Orders', icon: <RiFileList3Line />, tab: 'orders' },
  { title: 'Colors', icon: <MdColorLens />, tab: 'colors' },
  { title: 'Sizes', icon: <IoIosResize />, tab: 'sizes' },
  { title: 'Mails', icon: <IoIosMail />, tab: 'contact' },
  { title: 'Country', icon: <GiEarthAfricaEurope />, tab: 'countries' },
  { title: 'Government', icon: <GiEarthAfricaEurope />, tab: 'governments' },
  { title: 'City', icon: <GiEarthAfricaEurope />, tab: 'cities' },
  { title: 'Reports', icon: <FaChartLine />, tab: 'reports' },
];
