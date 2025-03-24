import { useState } from 'react'
import './App.css'

function App() {
  const [inputString, setInputString] = useState('hello world');
  const [transformString, setTransformedString] = useState(inputString);


  const handleInputChange = (e) => {
    setInputString(e.target.value);
  }

  const toLowerCase = () => {
    setTransformedString(inputString.toLowerCase());
  }

  const toUpperCase = () => {
    setTransformedString(inputString.toUpperCase());
  }

  const toCamelCase = () => {
    setTransformedString(
      inputString.split(' ').map((word, index) => (index == 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())).join('')
    )
  };

  const toPascalCase = () => {
    setTransformedString(
      inputString.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('')
    );
  }

  const toSnakeCase = () => {
    setTransformedString(
      inputString.toLowerCase().split(' ').join('_')
    );
  }

  const toKebabCase = () => {
    setTransformedString(
      inputString.toLowerCase().split(' ').join('-')
    );
  }
  return (
    <div className=' min-w-screen flex justify-center p-6 flex-col items-center'>
      <textarea value={inputString} placeholder='Enter a string to transform' rows={4} className='w-md border-1 p-2' onChange={handleInputChange}/>

      <div className='btn-div w-md grid grid-cols-3 gap-4 mt-5'>
          <button className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-gray-400' onClick={toLowerCase}>Lower Case</button>
          <button className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-gray-400' onClick={toUpperCase}>Upper Case</button>
          <button className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-gray-400' onClick={toCamelCase}>Camel Case</button>
          <button className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-gray-400' onClick={toPascalCase}>Pascal Case</button>
          <button className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-gray-400' onClick={toSnakeCase}>Snake Case</button>
          <button className='p-3 bg-gray-200 rounded cursor-pointer hover:bg-gray-400'onClick={toKebabCase}>Kebab Case</button>
      </div>

      <div className='output flex flex-col mt-5'>
          <h1 className='font-bold text-xl'>Transformed String : </h1>
          <p>{transformString}</p>
      </div>
    </div>
  )
}

export default App
