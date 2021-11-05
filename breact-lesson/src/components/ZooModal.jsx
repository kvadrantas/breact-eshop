import { useEffect, useState } from "react";
import moment from "moment-timezone";


function ZooModal({edit, remove, modalAnimal, showModal, setShowModal}) {

    const [inputs, setInputs] = useState({
        product: '',
        quantity: '',
        price: '',
        instock: '',
        lastorder: ''
    });

    useEffect(() => {
        setInputs({
            product: modalAnimal.product,
            quantity: modalAnimal.quantity,
            price: modalAnimal.price,
            instock: modalAnimal.instock,
            lastorder: modalAnimal.lastorder
        })
    }, [modalAnimal]);

    const handleEdit = () => {
        if( !inputs.product || 
            !inputs.quantity || parseFloat(inputs.quantity) < 0 || !isFinite(parseFloat(inputs.quantity)) ||
            !inputs.price || parseFloat(inputs.price) < 0 || !isFinite(parseFloat(inputs.quantity))) {
            alert(`
                Please check your input!

                - required fields cannot be empty;
                - quantity and price cannot be negative or infinite.
            `)
        } else {
            edit({
                product: inputs.product,
                quantity: inputs.quantity,
                price: inputs.price,
                instock: inputs.instock,
                lastorder: inputs.lastorder
            }, modalAnimal.id)
        }
        // console.log(
        //     {
        //         product: inputs.product,
        //         quantity: inputs.quantity,
        //         price: inputs.price,
        //         instock: inputs.instock,
        //         lastorder: inputs.lastorder
        //     }
        // )
    };

    const formControl = (e, what) => {
        const inputsCopy = {...inputs};
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }


    return (
        <div className="zoo-modal" style={{
            display: showModal ? 'block' : 'none',
            top: window.scrollY + 100 + 'px'
        }}>
            <div className="zoo-modal-form">
                <h2>Edit animal</h2>
                <label>Product*</label><input type="text" value={inputs.product} onChange={(e) => formControl(e, 'product')} />
                <label>Quantity*</label><input type="text" value={inputs.quantity} onChange={(e) => formControl(e, 'quantity')} />
                <label>Price*</label><input type="number" value={inputs.price} onChange={(e) => formControl(e, 'price')} />
                <label>In Stock</label>
                <select name="" id="" value={inputs.instock} onChange={(e) => formControl(e, 'instock')}>
                    <option value="1">yes</option>
                    <option value="0">no</option>
                </select>
                <label>Last Order</label><input type="date" value={moment.tz(inputs.lastorder, "Europe/Vilnius").format('YYYY-MM-DD')} onChange={(e) => formControl(e, 'lastorder')} />
            </div>
            <button className="form-button" onClick={handleEdit}>Save</button>
            <button className="form-button" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="form-button" onClick={() => remove(modalAnimal.id)}>Delete</button>
        </div>
    )

}

export default ZooModal;