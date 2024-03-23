import microwaveIcon from '../assets/microwave.png';
import ovenIcon from '../assets/oven.png';
import refrigeratorIcon from '../assets/refrigerator.png';
import radiatorIcon from '../assets/radiator.png';
import coffeeMakerIcon from '../assets/coffee-maker.png';
import televisionIcon from '../assets/tv.png';
import laundryMachineIcon from '../assets/laundry-machine.png';
import toasterIcon from '../assets/toaster.png';
import dishwasherIcon from '../assets/dishwasher.png';
import ironIcon from '../assets/iron.png';
import vacuumIcon from '../assets/vacuum.png';
import radioIcon from '../assets/radio.png';
import hairDryerIcon from '../assets/hair-dryer.png';
import electricKettleIcon from '../assets/electric-kettle.png';
import airConditionerIcon from '../assets/air-conditioner.png';

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
  toaster: toasterIcon,
  dishwasher: dishwasherIcon,
  iron: ironIcon,
  vacuum: vacuumIcon,
  radio: radioIcon,
  hairDryer: hairDryerIcon,
  electricKettle: electricKettleIcon,
  airConditioner: airConditionerIcon,
};
export default Icons;
