import React, { Component } from 'react';

import axios from 'axios';


class CartItem extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.data.productId}</td>
                <td>{this.props.data.productName}</td>
                <td>{this.props.data.cost}</td>
                <td>{this.props.data.quantity}</td>
                <td><button className='btn btn-outline-danger' onClick={()=>{
                    this.props.onDeleteClick(this.props.data);
                }}>delete</button></td>
            </tr>
        )
    }
};

class SearchItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            visible: true,
        }
    }

    render() {

        return <div className={'border shadow mt-2 p-2 text-center rounded'}>
            <p className="">{this.props.item.productName}</p>
            <div className='form-inline justify-content-center'>
                <label className=''>Quantity</label>
                <input className='form-control mx-3' type='number' onChange={(e) => { this.setState({ quantity: e.target.value }) }} value={this.state.quantity} />

            </div>
            <p className='p-2'><button className='btn btn-primary mx-1' onClick={() => { this.props._onAddButtonClick({ ...this.props.item, quantity: this.state.quantity }) }}>Add</button>
                <button className='btn btn-danger mx-1' onClick={this.props._onCancelButtonClick}>Cancel</button>
            </p>
        </div>;
    }
}


export default class MyApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            result: { loaded: false },
            totalCost: 0,
            data: [],
        }
    }

    _calculateTotal() {
        let total = 0;
        this.state.data.forEach(function (e) {
            total = total + parseInt(e.quantity) * parseInt(e.cost);
        })
        console.log(total);
        this.setState({ totalCost: total });
    }

    _onAddButtonClick = (res) => {
        let orig = [...this.state.data];
        let flag = 0;
        orig = Array.from(orig, (x) => {
            if (x.productId === res.productId) {
                x.quantity = parseInt(x.quantity) + parseInt(res.quantity);
                flag = 1;
                return x;
            }
            return x;
        });
        if (flag) {
            this.setState({ data: orig }, () => { this._calculateTotal() });
        } else {
            orig.push(res);
            this.setState({ data: orig }, () => { this._calculateTotal() });
        }

        // this.setState({data:[...this.state.data,res]});
        this._clearResult();
    }

    _clearResult() {
        this.setState({ result: {} });
        document.getElementById('searchInput').value = '';
    }

    _onChange = (e) => {
        if (e === '') {
            return;
        }
        this.setState({ loading: true });
        axios.get("/api/product/" + e).then(res => res.data[0]).then((res) => {
            if (res === undefined) {
                throw Error('Undefined!!');
            }
            this.setState({ loading: false, result: { loaded: true, ...res }, error: undefined })
        }).catch(err => {
            this.setState({ loading: false, result: {}, error: "No product found" });
        })
    }

    render() {
        return (
            <div className='card-body'>
                <div className='row justify-content-center'>
                    <div className=' form-group col-md-6'>
                        <input className='form-control' placeholder="Enter the productId" id='searchInput' onChange={(e) => { this._onChange(e.target.value) }}></input>
                        {this.state.loading ? <p>Loading...</p> : ""}
                        {this.state.error ? <p>No data found!!</p> : ""}
                        {this.state.result.loaded ? <SearchItem item={this.state.result} _onCancelButtonClick={() => {
                            this._clearResult();
                        }} _onAddButtonClick={this._onAddButtonClick}
                        /> : ''}
                        <br />
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='mt-2 col-md-9'>
                        <div className='card shadow-sm'>
                            <div class='card-header'>Cart</div>
                            <div class='card-body'>
                                <table className='table'>
                                    <thead>
                                        <tr><th>sn</th><th>productId</th><th>productName</th><th>Cost per unit</th><th>Quantity</th>
                                        <th>Actions</th>
                                        </tr>
                                    
                                    </thead>
                                    <tbody>{
                                        this.state.data.map((data, index) => <CartItem key={index} index={index + 1} data={data} onDeleteClick={(e)=>{
                                            this.setState({data:this.state.data.filter(function(x){
                                                return x.productId !== e.productId ;
                                            })},this._calculateTotal)
                                            
                                        }} />)
                                    }</tbody>
                                </table>
                            </div>
                            <div className='card-footer d-flex flex-row justify-content-between'>
                                <p>Total Cost: {this.state.totalCost}</p>
                                <p>Received Amount: <input size='5' onChange={(e)=>{this.setState({receivedAmt:e.target.value})}}></input></p>
                                <p>Change: {(parseInt(this.state.receivedAmt)-parseInt(this.state.totalCost)||0)} </p>
                                <button className='btn btn-primary'><a>Confirm</a></button>
                            </div>
                        </div>
                    </div>
                </div>







            </div>
        )
    }
}