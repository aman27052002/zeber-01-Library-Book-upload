
import { useState } from "react";
// import './app.css' 
import Form from './components/Form/Form'
export default function App() {
  const [btn,setBtn] = useState(false)
  return (
    <div className="flex items-center justify-center min-h-screen p-4  bg-blue-500">
      <Form />
    </div>
  );
}
