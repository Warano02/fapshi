# FAPSHI Payment API Client

A client for interacting with the FAPSHI payment API. This module allows developers to initiate payments, check payment statuses, and manage transactions.

## Installation

To install this module, you can use npm:

```bash
npm install fapshi
```

## Usage

Here's how to use the FAPSHI module in your application:
Importing the Module.

```js
const FAPSHI = require('fapshi');
```

## Initializing the Client

You need to create an instance of the FAPSHI class by providing your username and API key.

````js
const fapshi = new FAPSHI('your_api_user', 'your_api_key');
```

Available Methods
---------------------
Here is an overview of the available methods in the client:

### 1. initiatePay(data)

This method initiates the payment process.
Parameters:  

data: An object with the necessary properties to initiate the payment.
Example:

````js

const paymentData = {
    amount: 1000, // Amount in XAF
    email: "user@example.com",
    userId: "user123",
    externalId: "external_id_123",
    redirectUrl: "http://example.com/redirect",
    message: "Thank you for your payment"
};
const response = await fapshi.initiatePay(paymentData);
````

### 2.  directPay(data)

This method sends a payment request directly to a mobile phone.

data: An object with the necessary properties to initiate the payment.

````js
const directPayData = {
    amount: 1000,
    phone: "61234567",
    medium: "mobile",
    name: "John Doe",
    email: "john@example.com",
    userId: "user123",
    externalId: "external_id_123",
    message: "Payment for services"
};
const response = await fapshi.directPay(directPayData);
`````

### 3. paymentStatus(transId)

Checks the status of a payment using the transaction ID.

Parameters:  

transId: The transaction ID.

````js
const statusResponse = await fapshi.paymentStatus("transaction_id");

````

### 4. expirePay(transId)

Expires a transaction.

Parameters:  

transId: The transaction ID to expire.

``js
const expireResponse = await fapshi.expirePay("transaction_id");
``

### 5.  userTrans(userId)

Retrieves transactions for a specific user.

Parameters:  

userId: The user's ID.

````js
const transactions = await fapshi.userTrans("user123");
````

### 6. balance()

Retrieves the service balance.

````js
const balanceResponse = await fapshi.balance();
````

### 7. payout(data)

Performs a payout to the specified phone number.

Parameters:  

data: An object containing payout information.

````js
const payoutData = {
    amount: 1000,
    phone: "61234567",
    medium: "mobile",
    name: "John Doe",
    email: "john@example.com",
    userId: "user123",
    externalId: "external_id_123",
    message: "Payout to user"
};
const payoutResponse = await fapshi.payout(payoutData);

````

### 8. search(params)

Searches transactions based on specified criteria.

Parameters:  

params: An object containing search criteria such as status, medium, start, end, amt, limit, and sort

````js
const searchParams = {
    status: "successful",
    medium: "mobile money",
    start: "2023-01-01",
    end: "2023-12-31",
    amt: 100,
    limit: 10,
    sort: "asc"
};
const searchResults = await fapshi.search(searchParams);
````
