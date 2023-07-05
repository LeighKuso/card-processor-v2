import BannedCountriesForm from '~/components/BannedCountriesForm';

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className='h-screen mw-80 flex justify-center'>
      <h1 className='heading'>Welcome to... The Processor</h1>
      
      <main className='h-full '>
        <BannedCountriesForm />
      </main>
    </div>
  );
}
