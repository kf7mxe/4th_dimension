import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllActiveTransactions, completeTransaction, deleteTrancaction, getUserById, transferMoney } from "../../services/services";
import './Orders.css'


const Orders = () => {
    const role = useSelector((state) => state.user.role);
    const [transactions, setTransactions] = useState([]);


    const updateTransactions = async () => {
        const response = await getAllActiveTransactions();
        setTransactions(response);
    };
    // Only call when component mounts
    useEffect(() => {
        updateTransactions();
    }, []);

    const handleCompleteClick = (item) => {
        // put needs all data, so whole item is passed
        completeTransaction(item).then(() => {
            updateTransactions();
        });
    }
    const handleRefundClick = (id, amount, transactionId) => {
        // Remove money from owner, add money to user
        transferMoney(8, id, amount).then((response) => {
          deleteTrancaction(transactionId).then((resDelete) => {
              console.log(resDelete);
            if(resDelete === false) {
              return
            }
            getAllActiveTransactions().then((resGetAll) => {
              setTransactions(resGetAll)
              getUserById(user.id).then((res) => {
                dispatch(setUser(res))
              })
            })
          })
        })
        
      }
    console.log(transactions);
    return (
        <div className="orders">
            <h1>Orders</h1>
            {(role === "drinkMiester") &&
                <div className="drink-miester-view">
                    {transactions.map((item) => {
                        return (
                            <div className="transaction-container" key={item.transactionid}>
                                <div className="transaction-header">
                                <div className="transaction-id">Transaction Number: {item.transactionid}</div>
                                </div>
                                <div className="transaction-body">
                                <div className="item-name">Buyer: {item.transactionbuyer}</div>
                                <div className="item-price">Drink Miester: {item.transactiondrinkmeister}</div>
                                <div className="item-quantity">Date: {item.transactiondate}</div>
                                <div className="item-quantity">Cost: ${item.transactionprice}</div>
                                </div>
                                <div className="item-buttons">
                                    <button className="complete-button" onClick={() => { handleCompleteClick(item) }}>Complete</button>
                                    <button className="delete-button" onClick={() => { handleRefundClick(item.transactionid) }}>Refund</button>
                                </div>
                            </div>
                        )
                    })}
                    {/* Get all current drinks and display them */}
                    {/* Button to fulfill and delete */}
                </div>
            }
        </div>
    )
}

export default Orders;