function getSortedAndFilteredCities(cities) {
  const minPopualtionCity = 50000
  const filteredCitites = cities.filter((objCity) => +objCity.population > minPopualtionCity)
  let sortedAndFilteredCities = filteredCitites.sort((a, b) => a.city.localeCompare(b.city))

  let maxPopulation = 0
  let indexMaxPopulation = null
  let cityMaxPopulation = null

  sortedAndFilteredCities.forEach((city, index)=>{
    if(city.population > maxPopulation) {
      maxPopulation = +city.population
      indexMaxPopulation  = index
      cityMaxPopulation = city
    }
   }
  )

  sortedAndFilteredCities = [cityMaxPopulation, ...sortedAndFilteredCities.splice(0, indexMaxPopulation), ...sortedAndFilteredCities.splice(indexMaxPopulation)]
    .map(objCity => objCity.city)

  return sortedAndFilteredCities
}

export  default  getSortedAndFilteredCities;