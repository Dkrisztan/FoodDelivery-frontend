import { Register } from '../../components/Register';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default function Home() {
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user', formData);
      console.log(response);
      redirect("/login")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <>
      <Register onSubmit={handleSubmit}/>
    </>
  );
}
