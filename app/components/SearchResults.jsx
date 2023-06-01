import PropertyCard from "./PropertyCard"

const SearchResults = ({ results }) => {

  return (
    <div>
      <h2 className="text-4xl font-bold pb-2 border-b">
        Search Results
      </h2>
      {results.length > 0 &&
        <ul className="grid grid-cols-4 gap-8">
          {results.map((property, i) => {
            return <PropertyCard property={property} key={i} i={i} />
          })}
        </ul>
      }
    </div>
  )

}

export default SearchResults