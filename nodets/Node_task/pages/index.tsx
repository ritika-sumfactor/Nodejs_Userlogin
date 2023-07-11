import Head from 'next/head';
import Image from 'next/image';
import RegistrationForm from '../components/registration';
import GetAllUser from '../components/getAlluser';
import Login from './login';
export default function Home() {
    return (
      <>
        <h1> </h1>
        <RegistrationForm />
        <br />
        {/* <GetAllUser /> */}
        <br />
        {/* <Login /> */}
      </>
    );
  }