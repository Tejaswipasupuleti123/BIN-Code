import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Bank from './Bank.jpg';  
import Card from './Card.jpg';
import axios from 'axios';
import './App.css'

const App = () => {
    const [currentSection, setCurrentSection] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setCurrentSection('transactions');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCurrentSection('thankYou');
    };

    return (
        <div>
            <Navbar onNavClick={setCurrentSection} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <div className="container mt-5">
                {currentSection === 'home' && <Home onLoginSuccess={handleLoginSuccess} />}
                {currentSection === 'signup' && <Signup />}
                {currentSection === 'transactions' && <Transaction />}
                {currentSection === 'contact' && <Contact />}
                {currentSection === 'eTransfer' && <ETransfer />}
                {currentSection === 'thankYou' && <ThankYou />}
            </div>
            <Footer />
        </div>
    );
};

const Navbar = ({ onNavClick, isLoggedIn, onLogout }) => (
    <nav className="navbar navbar-expand-lg navbar-custom navbar-light">
        <a className="navbar-brand" href="#" onClick={() => onNavClick}>
            <img src={Bank} alt="MyBank Logo" className="img-fluid" style={{height:'80px', width:'150px'}} />
        
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => onNavClick('signup')}>Signup</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => onNavClick('home')}>Home</a>
                </li>
                {isLoggedIn && (
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => onNavClick('transactions')}>Transactions</a>
                    </li>
                )}
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => onNavClick('contact')}>Contact Us</a>
                </li>
                {isLoggedIn && (
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={() => onNavClick('eTransfer')}>E-Transfer</a>
                    </li>
                )}
                {isLoggedIn && (
                    <li className="nav-item">
                        <a className="nav-link btn btn-custom" href="#" onClick={onLogout}>Logout</a>
                    </li>
                )}
            </ul>
        </div>
    </nav>
);

const Home = ({ onLoginSuccess }) => {
    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        if (username === '' && password === '') {
            onLoginSuccess();
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <div className="login-section">
                        <h4>Login</h4>
                        <form id="loginForm" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" name="username" placeholder="Enter your username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <div id="loginFeedback" className="form-feedback"></div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="image-section">
                        <img src={Card} alt="Login Image" className="img-fluid" style={{height:'300px', width:'600px'}}/>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="new-section">
                        <h4>Welcome to MAYBANK</h4>
                        <p>Explore our range of banking services tailored to meet your needs...</p>
                    </div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="credit-card-info">
                        <h4>Credit Card Services</h4>
                        <p>Apply for our exclusive credit cards...</p>
                        <button type="button" className="btn btn-info">Learn More</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="finance-info">
                        <h4>Finance Options</h4>
                        <p>Explore our financing solutions...</p>
                        <button type="button" className="btn btn-info">Explore Options</button>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="tracking-transactions">
                        <h4>Track Your Transactions</h4>
                        <p>Keep track of your financial activities...</p>
                        <button type="button" className="btn btn-info">Track Now</button>
                    </div>
                </div>
            </div>
        </>
    );
};

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [storedData, setStoredData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleSignup = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const userData = { username, email, password };
      const newData = [...storedData, userData];
      const data = JSON.stringify(newData);
  
      const config = {
        method: 'PUT',
        url: 'https://api.jsonbin.io/v3/b/66edba80ad19ca34f8a9b368',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$.hLTSyBkaPifsrykqVvJyuOY04lplEFiMDSU1wd8.qWVP6D0rinIq',
        },
        data: data,
      };
  
      try {
        const response = await axios(config);
        console.log(response.data);
        setMessage('Signup successful! User data stored.');
        fetchStoredData();
        clearForm();
      } catch (error) {
        console.error('Error:', error);
        setMessage('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchStoredData = async () => {
      const config = {
        method: 'GET',
        url: 'https://api.jsonbin.io/v3/b/66edba80ad19ca34f8a9b368/latest',
        headers: {
          'X-Master-Key': '$2a$10$.hLTSyBkaPifsrykqVvJyuOY04lplEFiMDSU1wd8.qWVP6D0rinIq',
        },
      };
  
      try {
        const response = await axios(config);
        setStoredData(Array.isArray(response.data.record) ? response.data.record : []);
        console.log('Stored data:', response.data.record);
      } catch (error) {
        console.error('Error fetching stored data:', error);
      }
    };
  
    const clearForm = () => {
      setUsername('');
      setEmail('');
      setPassword('');
    };
  
    useEffect(() => {
      fetchStoredData();
    }, []);
  
    return (
      <div className="container mt-5">
        <h2>Signup</h2>
        <form onSubmit={handleSignup} className="mb-4">
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing Up...' : 'Signup'}
          </button>
        </form>
        {message && <div className="alert alert-info">{message}</div>}
  
      </div>
    );
  };
  

const Transaction = () => {
    const [showDepositForm, setShowDepositForm] = useState(false);
    const [showWithdrawForm, setShowWithdrawForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [accountNumber, setAccountNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [nextId, setNextId] = useState(1); // State for the next transaction ID

    useEffect(() => {
        // Fetch existing transactions from JSON bin on component mount
        fetch(`https://api.jsonbin.io/v3/b/66edd9adacd3cb34a8883b60/latest`, {
            method: "GET",
            headers: {
                "X-Master-Key": "$2a$10$.hLTSyBkaPifsrykqVvJyuOY04lplEFiMDSU1wd8.qWVP6D0rinIq",
            },
        })
            .then(response => response.json())
            .then(data => {
                const existingTransactions = data.record || [];
                setTransactions(existingTransactions);
                // Set the next ID based on existing transactions
                if (existingTransactions.length > 0) {
                    const maxId = Math.max(...existingTransactions.map(t => t.id));
                    setNextId(maxId + 1); // Increment from the max existing ID
                }
            })
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    const handleDeposit = () => {
        setShowDepositForm(true);
        setShowWithdrawForm(false);
    };

    const handleWithdraw = () => {
        setShowWithdrawForm(true);
        setShowDepositForm(false);
    };

    const handleTransactionSubmit = async (type) => {
        const newAmount = parseFloat(amount);
        const transactionId = nextId; // Use the current next ID

        // Calculate the current balance
        const currentBalance = transactions.reduce((acc, transaction) => {
            return acc + (transaction.Type === "Deposit" ? parseFloat(transaction.Amount) : -parseFloat(transaction.Amount));
        }, 0);

        // Create new transaction object
        let newTransaction = {
            id: transactionId,
            Type: type,
            Account: accountNumber,
            Amount: newAmount.toString(),
            Balance: type === "Deposit" ? currentBalance + newAmount : currentBalance - newAmount,
        };

        // Store transaction data in JSON bin
        fetch(`https://api.jsonbin.io/v3/b/66edd9adacd3cb34a8883b60`, {
            method: "PUT", // Use PUT to update the existing bin
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2a$10$.hLTSyBkaPifsrykqVvJyuOY04lplEFiMDSU1wd8.qWVP6D0rinIq",
            },
            body: JSON.stringify([...transactions, newTransaction]), // Send the updated transactions array
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Data stored successfully:", data);
                setTransactions(prev => [...prev, newTransaction]); // Update local state with new transaction
                setNextId(nextId + 1); // Increment the next ID for future transactions
            })
            .catch(error => {
                console.error("Error storing data:", error);
            });

        // Reset form fields
        setAccountNumber("");
        setAmount("");
        setShowDepositForm(false);
        setShowWithdrawForm(false);
    };

    const handleCancel = () => {
        setShowDepositForm(false);
        setShowWithdrawForm(false);
        setAccountNumber("");
        setAmount("");
    };

    return (
        <div className="container">
            <h2 className="text-center my-4">Transaction Page</h2>
            <div className="text-center">
                <button className="btn btn-success mx-2" onClick={handleDeposit}>
                    Deposit
                </button>
                <button className="btn btn-danger mx-2" onClick={handleWithdraw}>
                    Withdraw
                </button>
            </div>

            {/* Deposit Form */}
            {showDepositForm && (
                <div className="mt-4">
                    <h4>Deposit Form</h4>
                    <div className="form-group">
                        <label>Account Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={() => handleTransactionSubmit("Deposit")}>
                        Deposit
                    </button>
                    <button className="btn btn-secondary mt-2 mx-2" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            )}

            {/* Withdraw Form */}
            {showWithdrawForm && (
                <div className="mt-4">
                    <h4>Withdraw Form</h4>
                    <div className="form-group">
                        <label>Account Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="number"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={() => handleTransactionSubmit("Withdraw")}>
                        Withdraw
                    </button>
                    <button className="btn btn-secondary mt-2 mx-2" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            )}

            {/* Transaction Output */}
            <div className="mt-5">
                {transactions.length > 0 ? (
                    <>
                        <h4>Transactions</h4>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Account</th>
                                        <th>Amount</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.id}</td>
                                            <td>{transaction.Type}</td>
                                            <td>{transaction.Account}</td>
                                            <td>{transaction.Amount}</td>
                                            <td>{transaction.Balance}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <p className="text-center"></p>
                )}
            </div>
        </div>
    );
};

const Contact = () => (
    <div className="contact-info">
        <h4>Contact Us</h4>
        <p>For any inquiries, please reach out to our support team.</p>
        <address>
            <strong>Bank Address:</strong><br />
            1234 Banking St.<br />
            City, State, ZIP Code<br />
            Email: support@maybank.com<br />
            Phone: (123) 456-7890
        </address>
    </div>
);


const ETransfer = () => {
    const [transferDetails, setTransferDetails] = useState(null);

    const handleETransferSubmit = (e) => {
        e.preventDefault();
        const fromAccount = e.target.eTransferFrom.value;
        const toAccount = e.target.eTransferTo.value;
        const amount = e.target.eTransferAmount.value;
        setTransferDetails({
            fromAccount,
            toAccount,
            amount
        });
    };

    return (
        <div className="transaction-form">
            <h4>E-Transfer</h4>
            <form id="eTransferForm" onSubmit={handleETransferSubmit}>
                <div className="form-group">
                    <label htmlFor="eTransferFrom">From Account</label>
                    <input type="text" className="form-control" id="eTransferFrom" name="eTransferFrom" placeholder="Enter your account number" />
                </div>
                <div className="form-group">
                    <label htmlFor="eTransferTo">To Account</label>
                    <input type="text" className="form-control" id="eTransferTo" name="eTransferTo" placeholder="Enter recipient's account number" />
                </div>
                <div className="form-group">
                    <label htmlFor="eTransferAmount">Amount</label>
                    <input type="number" className="form-control" id="eTransferAmount" name="eTransferAmount" placeholder="Enter amount" />
                </div>
                <button type="submit" className="btn btn-custom">Transfer</button>
            </form>
            {transferDetails && (
                <div className="transaction-details mt-3">
                    <h6>Transfer Details:</h6>
                    <p><strong>From Account:</strong> {transferDetails.fromAccount}</p>
                    <p><strong>To Account:</strong> {transferDetails.toAccount}</p>
                    <p><strong>Amount:</strong> ${transferDetails.amount}</p>
                </div>
            )}
        </div>
    );
};

const ThankYou = () => {
    return (
        <div className="container mt-5">
            <h2>LOGIN FOR MORE</h2>
            <p>MAY BANK! ThankYou.</p>
        </div>
    );
};

const Footer = () => (
    <footer className="footer mt-auto py-3">
        <div className="container">
            <span className="text-muted">Our team works tirelessly to ensure that our services are not only user-friendly but also secure and reliable. We believe in the power of innovation and strive to incorporate the latest technologies to enhance your experience. Your satisfaction is our priority, and we are always open to feedback to improve our offerings. Join us on this journey as we continue to evolve and provide the best solutions tailored just for you.</span>
        </div>
    </footer>
);

export default App;
