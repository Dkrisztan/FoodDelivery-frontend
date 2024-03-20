import microwaveIcon from '../assets/microwave.png';
import ovenIcon from '../assets/oven.png';
import refrigeratorIcon from '../assets/refrigerator.png';
import radiatorIcon from '../assets/radiator.png';
import coffeeMakerIcon from '../assets/coffee-maker.png';
import televisionIcon from '../assets/tv.png';
import laundryMachineIcon from '../assets/laundry-machine.png';

type Icons = {
  [key: string]: string;
};

const Icons: Icons = {
  microwave: microwaveIcon,
  oven: ovenIcon,
  radiator: radiatorIcon,
  refrigerator: refrigeratorIcon,
  coffeeMaker: coffeeMakerIcon,
  television: televisionIcon,
  laundryMachine: laundryMachineIcon,
};
export default Icons;
