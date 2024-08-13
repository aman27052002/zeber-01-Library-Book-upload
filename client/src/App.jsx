import Form from './components/Form/Form'
import { useState } from 'react';
export default function App() {
  const [showForm,setshowForm] = useState(false);
  return (
    <div className="flex items-center flex-col gap-6 h-screen p-4 bg-[#14161b]">
      
      <button onClick={()=>setshowForm(true)} className='bg-indigo-500 font-bold px-4 py-4 rounded-lg text-lg '>Add Book</button>
      {showForm && <Form onClose={()=>setshowForm(false)} />}
    </div>
  );
}
