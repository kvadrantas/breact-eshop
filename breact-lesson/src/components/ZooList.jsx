import ZooAnimal from "./ZooAnimal";

function ZooList({animals, setShowModal, setModalAnimal, remove}) {

    return (
        <div className="zoo-list">
            <div className="tbl-header">
                <div className="zoo-list-animal-stats">
                    <span>Product</span>
                    <span>Quantity</span>
                    <span>Price</span>
                    <span>Total value</span>
                    <span>In Stock</span>
                    <span>Last Order</span>
                    <button className="form-button" >Edit</button>
                    <button className="form-button" >Delete</button>
    
                </div>
            </div>
            {animals.map(animal => <ZooAnimal key={animal.id} animal={animal} setShowModal={setShowModal} setModalAnimal={setModalAnimal} remove={remove}></ZooAnimal>)}
        </div>
    )
}

export default ZooList; 