import Hero from '../Components/Hero'
import Offers from '../Components/Offers'
import NewCollections from '../Components/NewCollections'
import Newsletter from '../Components/NewsLetter'

const Shop = () => {
  return (
    <main className='min-h-screen bg-gray-50/50 flex flex-col space-y-12 sm:space-y-16 lg:space-y-24 pb-16 sm:pb-24 animate-in fade-in duration-300 w-full overflow-hidden'>
      <Hero />
      <Offers />
      <NewCollections />
      <Newsletter />
    </main>
  )
}

export default Shop
