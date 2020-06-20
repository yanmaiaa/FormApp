import React, {useRef, useEffect} from 'react';
import { Form } from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup from 'yup';
import './App.css';

import Input from './components/Form/Input';


function App() {
  
  const formRef = useRef(null);

  async function  handleSubmit(data, { reset }){
    try{
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    address: Yup.object().shape({
      city: Yup.string()
        .min(3, 'No mínimo 3 caracteres')
        .required('A cidade é obrigatória')
    })
  });

    await schema.validate(data, {
      abortEarly: false,
    })

    console.log(data);

    formRef.current.setErrors({});//Limpando os avisos de erro ao clicar em 'enviar'

    reset();

 } catch (err) {
   if(err instanceof Yup.ValidationError) {
     const errorMessages = {};

     err.inner.forEach(error => {
       errorMessages[error.path] = error.message;
     })

    formRef.current.setErrors(errorMessages);
   }
 }
}

useEffect(() => {
  setTimeout(() => {
    formRef.current.setData({
      name: 'Yan Damasceno',
      email: 'yandamasceno01@gmail.com',
      address: {
        city: 'Salvador',
        state: 'Bahia'
      }
    })
  }, 1000)
}, []);

  return (
    <div className="App">
     <h1>Test Form!</h1>
     <Form ref={formRef} onSubmit={handleSubmit}>
       Nome:<Input name="name"/>
       E-mail:<Input type="email" name="email"/>
       

    <Scope path="address">
       Cidade:<Input name="city"/>
       Estado:<Input name="state"/>
    </Scope>

       <button type="submit">Enviar</button>
     </Form>
    </div>
  );
}

export default App;
