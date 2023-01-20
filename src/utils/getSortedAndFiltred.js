function getSortedAndFilteredCities(cities) {
  //В начале фильтруем по населению, чтобы массив стал поменьше для сортировки,потом сортируем
  const minPopualtionCity = 50000
  const filteredCitites = cities.filter((objCity) => +objCity.population > minPopualtionCity)
  let sortedAndFilteredCities = filteredCitites.sort((a, b) => a.city.localeCompare(b.city))

  //Массив для нахождения максимума населения
  const arrPopulation = sortedAndFilteredCities.map((city) => city.population)
  const maxPopulation = Math.max(...arrPopulation)

  //Ищем обьект города с максимальным населением и индекс этого города
  const cityWithMaxPopualtion = sortedAndFilteredCities.find((city) => +city.population === maxPopulation)
  const index = sortedAndFilteredCities.findIndex((city) => +city.population === maxPopulation)

  //Вырезаем этот объект из отсротированного массива, вставляем его вперед
  sortedAndFilteredCities = [cityWithMaxPopualtion, ...sortedAndFilteredCities.splice(0, index), ...sortedAndFilteredCities.splice(index)]
    .map(objCity => objCity.city)

  return sortedAndFilteredCities
}

export  default  getSortedAndFilteredCities;