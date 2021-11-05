import moment from "moment-timezone";

function ZooAnimal({animal, setShowModal, setModalAnimal, remove}) {

    const showEdit = () => {
        setShowModal(true);
        setModalAnimal(animal);
    }

    const stock = (a) => {
        if(a === 1) {
            return 'yes';
        } else {
            return 'no';
        }
    }

    return (
        <div className="zoo-list-animal">
            {/* <i className="fas fa-pencil-alt edit" onClick={showEdit}></i> */}
            {/* <i className="far fa-trash-alt delete" onClick={() => remove(animal.id)}></i> */}
    
            <div className="zoo-list-animal-stats">
                <span className="zoo-list-animal-name">{animal.product}</span>
                <span><span className="field-names">Quantity: </span>{animal.quantity}</span>
                <span><span className="field-names">Price: </span>{animal.price}</span>
                <span><span className="field-names">Quantity: </span>{animal.price * animal.quantity}</span>
                <span><span className="field-names">In Stock: </span>{stock(animal.instock)}</span>
                <span><span className="field-names">Last Order: </span>{moment.tz(animal.lastorder, "Europe/Vilnius").format('YYYY-MM-DD')}  </span>
                <button className="form-button" onClick={showEdit}>Edit</button>
                <button className="form-button" onClick={() => remove(animal.id)}>Delete</button>
            </div>
        </div>
    )
}

export default ZooAnimal; 