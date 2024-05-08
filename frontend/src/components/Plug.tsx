import Icons from '../utils/Icons.tsx';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog.tsx';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import Cookies from 'js-cookie';
import axios from 'axios';

interface PlugProps {
  id: string;
  name: string;
  color: string;
  index: number;
  icon: string;
  refetchData: () => void;
}
export function Plug({ id, name, color, icon, index, refetchData }: PlugProps) {
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('accessToken')}` },
  };

  const [newName, setNewName] = useState(name);
  const [newColor, setNewColor] = useState(color);
  const [newIcon, setNewIcon] = useState(icon);

  async function handlePlugDelete() {
    try {
      const response = await axios.delete('https://onlab-backend.vercel.app/plug/' + id, config);
      console.log(response);
      refetchData();
    } catch (e) {
      console.log(e);
    }
  }

  async function handlePlugUpdate() {
    const plugData = {
      name: newName,
      iconName: newIcon,
      color: newColor,
    };
    try {
      const response = await axios.patch(
        'https://onlab-backend.vercel.app/plug/' + id,
        plugData,
        config,
      );
      console.log(response);
      refetchData();
    } catch (e) {
      console.log(e);
    }
  }

  let alternatingBackground = '#c29d9d';
  if (index % 2 !== 0) alternatingBackground = '#F5E8DD';
  return (
    <>
      <div className='container mx-auto mt-4 mb-4 flex flex-row h-auto'>
        <Dialog>
          <DialogTrigger asChild>
            <div
              style={{ backgroundColor: color }}
              className='h-1/4 w-1/6 py-2 px-5 flex flex-row items-center justify-between rounded-l-xl'
            >
              <p className='text-2xl mx-auto'>{name}</p>
              <img src={Icons[icon]} width={32} height={32} alt='icon' />
            </div>
          </DialogTrigger>
          <DialogContent className='w-1/5 bg-neutral-800 text-white border-none'>
            <DialogHeader>
              <DialogTitle className='text-center'>Konnektor szerkesztése</DialogTitle>
            </DialogHeader>
            <div className='flex flex-row py-2 justify-evenly'>
              <div className='flex flex-row items-center justify-between gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Név
                </Label>
                <Input
                  type='text'
                  id='name'
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  className='bg-neutral-800 text-white'
                />
              </div>
              <div>
                <Select onValueChange={(e) => setNewIcon(Object.keys(Icons)[+e].toString())}>
                  <SelectTrigger className='w-[40px] p-0 outline-none border-none focus:outline-none focus:shadow-none bg-neutral-800'>
                    <SelectValue
                      placeholder={<img alt='icon' height='64' src={Icons[icon]} width='64' />}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.keys(Icons).map((value, index) => {
                        return (
                          <SelectItem value={index.toString()}>
                            <img alt='icon' height='64' width='64' src={Icons[value]} />
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <HexColorPicker color={newColor} onChange={setNewColor} className='react-colorful' />
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  className='mx-auto bg-gray-200 text-black font-bold hover:bg-gray-300'
                  type='submit'
                  onClick={handlePlugUpdate}
                >
                  Változtatások mentése
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div
          style={{ backgroundColor: alternatingBackground }}
          className='grid grid-cols-13 flex-grow pl-12 h-auto items-center rounded-r-xl'
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className='col-span-1 relative'>
              <div style={{ backgroundColor: color }} className='w-[1px] h-8'></div>
            </div>
          ))}
          <div className='col-span-1 relative h-full'>
            <button
              onClick={() => {
                handlePlugDelete().then();
              }}
              className='w-full h-full bg-red-600 text-white rounded-r-xl hover:bg-red-700 hover:shadow-md transition duration-300 ease-in-out'
            >
              Törlés
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
