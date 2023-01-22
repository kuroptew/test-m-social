function getSortedAndFilteredCities(cities) {
  const minPopulationCity = 50000

  const filteredCities = cities.filter((objCity) => +objCity.population > minPopulationCity)
  const sortedAndFilteredCities = filteredCities.sort()

  let maxPopulation = 0
  let indexMaxPopulation = null
  let cityMaxPopulation = null

  sortedAndFilteredCities.forEach((city, index) => {
      if (city.population > maxPopulation) {
        maxPopulation = +city.population
        indexMaxPopulation = index
        cityMaxPopulation = city
      }
    }
  )

  const sortedFirstMaxCities = [cityMaxPopulation, ...sortedAndFilteredCities.slice(0, indexMaxPopulation),
   ...sortedAndFilteredCities.slice(indexMaxPopulation+1,)].map(objCity => ({value: objCity.city, id:objCity.population}))

  return sortedFirstMaxCities
}

export default getSortedAndFilteredCities