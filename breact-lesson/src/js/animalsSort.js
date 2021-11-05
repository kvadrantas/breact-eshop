function animalSort(animalss, by, setFilterBy) {
    let animals = animalss.slice();
    switch (by) {
        case 'in-stock':
            setFilterBy('1');
            // animals = animals.filter(e => e.instock === 1);
            break;
        case 'out-stock':
            setFilterBy('0');
            // animals = animals.filter(e => e.instock === 0);
            break;
        case 'number-asc':
            setFilterBy('ASC');
            // animals.sort(function(a, b) {
            //     return a.price - b.price;
            // });
            break;
        case 'number-desc':
            setFilterBy('DESC');
            // animals.sort(function(a, b) {
            //     return b.price - a.price;
            // });
            break;
        default:
    }
    return animals
}
export default animalSort;