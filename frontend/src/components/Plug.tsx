import Icons from '../utils/Icons.tsx';
import {
  Dialog,
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

interface PlugProps {
  name: string;
  color: string;
  index: number;
  icon: string;
}
export function Plug({ name, color, index, icon }: PlugProps) {
  const [colorPicker, setColorPicker] = useState('#7e4242');

  let alternatingBackground = '#F1DFD0';
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
                <Input type='text' id='name' className='bg-neutral-800 text-white' />
              </div>
              <div>
                <Select>
                  <SelectTrigger className='w-[40px] p-0 outline-none border-none focus:outline-none focus:shadow-none bg-neutral-800'>
                    <SelectValue
                      placeholder={
                        <img alt='icon' height='64' src={Icons['microwave']} width='64' />
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='icon'>
                        <img alt='icon' height='64' width='64' src={Icons['microwave']} />
                      </SelectItem>
                      <SelectItem value='banana'>
                        <img alt='icon' height='64' width='64' src={Icons['oven']} />
                      </SelectItem>
                      <SelectItem value='blueberry'>
                        <img alt='icon' height='64' width='64' src={Icons['refrigerator']} />
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <HexColorPicker
              color={colorPicker}
              onChange={setColorPicker}
              className='react-colorful'
            />
            <DialogFooter>
              <Button
                className='mx-auto bg-gray-200 text-black font-bold hover:bg-gray-300'
                type='submit'
              >
                Változtatások mentése
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div
          style={{ backgroundColor: alternatingBackground }}
          className='grid grid-cols-12 flex-grow px-8 h-auto items-center rounded-r-xl'
        >
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className='col-span-1 relative'>
              {<div style={{ backgroundColor: color }} className='w-12 h-2 rounded'></div>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
