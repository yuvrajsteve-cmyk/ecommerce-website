import new_collections from '../Assets/all_product'
import Item from '../Components/Item/Item'

const NewCollections = () => {
  const displayData = [...new_collections]
    .sort(() => 0.5 - Math.random())
    .slice(0, 8)

  return (
    <section className='w-full py-16 sm:py-24 animate-in fade-in duration-300 flex flex-col items-center'>
      <div className='flex flex-col items-center mb-10 select-none'>
        <h1 className='text-4xl md:text-6xl mt-9 font-bold text-gray-800 font-sans tracking-wide uppercase'>
          POPULAR IN WOMEN
        </h1>
        <div className='w-50 h-1 mt-5 bg-gray-800 border-none rounded' />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-12 px-6 md:px-12 lg:px-60 my-10 w-full justify-items-center'>
        {displayData.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </section>
  )
}

export default NewCollections
