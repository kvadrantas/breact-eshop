import axios from "axios";
import { useEffect, useState } from "react";
import ZooCreate from "./components/ZooCreate";
import ZooList from "./components/ZooList";
import ZooModal from "./components/ZooModal";
import ZooNav from "./components/ZooNav";
import animalSort from "./js/animalsSort";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for error page 404
import PageNotFound from "./components/404-page";
 


function App () {

    const [animals, setAnimals] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [showModal, setShowModal] = useState(false);
    const [modalAnimal, setModalAnimal] = useState({
        product: '',
        quantity: '',
        price: '',
        instock: '',
        lastorder: ''
    });

    // ----------------- FILTERING -----------------
    // const [types, setTypes] = useState([]);  // filters dropbox options
    const [filterBy, setFilterBy] = useState('');
    
    // useEffect(() => {
    //     axios.get('http://localhost:3003/animal-types')
    //         .then(res => {
    //             setTypes(res.data);
    //             // console.log(res.data);
    //         })
    // }, [lastUpdate])

    useEffect(() => {
        if (filterBy) {
            axios.get('http://localhost:3003/stock-filter/'+filterBy)
            .then(res => {
                setAnimals(res.data);
                // console.log(res.data);
            })
        }
    }, [filterBy])

    const reset = () => {
        setLastUpdate(Date.now());
    }

    // ----------------- SORT -----------------
    const [sortBy, setSortBy] = useState('');
    useEffect(() => {
        if (sortBy) {
            setAnimals(animalSort(animals, sortBy, setFilterBy));
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortBy])

    // ----------------- SEARCH -----------------
    const [searchBy, setSearchBy] = useState('');

    useEffect(() => {
        if (searchBy) {
        axios.get('http://localhost:3003/animal-search/?s='+searchBy)
            .then(res => {
                setAnimals(res.data);
                // console.log(res.data);
            })
        }
    }, [searchBy])
    // ------------------------------------------


    // ALL RECORDS
    useEffect(() => {
        axios.get('http://localhost:3003/stock')
        .then(res => {
            // console.log(res.data)
            setAnimals(res.data);
        })
    }, [lastUpdate])

    // NEW RECORD
    const create = animal => {
        // console.log(animal)
        axios.post('http://localhost:3003/stock', animal)
        .then(res => {
            // console.log(res.data)
            setLastUpdate(Date.now());
        })
    }

    // EDIT RECORD 
    const edit = (animal, id) => {
        setShowModal(false);
        axios.put('http://localhost:3003/stock/' + id, animal)
        .then(res => {
            // console.log(res.data);
            setLastUpdate(Date.now());
        })
    }

    // REMOVE RECORD 
    const remove = (id) => {
        setShowModal(false);
        axios.delete('http://localhost:3003/stock/' + id)
        .then(res => {
            // console.log(res.data);
            setLastUpdate(Date.now());
        })
    }

    
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <div className="zoo">
                        <ZooModal edit={edit} remove={remove} modalAnimal={modalAnimal} showModal={showModal} setShowModal={setShowModal}></ZooModal>
                        <div className="nav">
                            <ZooNav  search={setSearchBy} filter={setFilterBy} sort={setSortBy} reset={reset}></ZooNav>
                            <ZooCreate create={create}></ZooCreate>
                        </div>
                        <ZooList animals={animals} setShowModal={setShowModal} setModalAnimal={setModalAnimal} remove={remove}></ZooList>
                    </div>
                    }>
                </Route>

                <Route path="/*" element={<PageNotFound/>} />
            </Routes>
        </Router>


        
    )

}

export default App; 