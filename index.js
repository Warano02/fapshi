const axios = require("axios");
const baseUrl = "https://live.fapshi.com";

module.exports = class FAPSHI {
    /**
     * 
     * @param {string} user : user name get for an services
     * @param {string} key : api key access
     */
    constructor(user, key) {
        if (!user || !key) throw new Error("Mention your user name and api key ");

        this.apiuser = user;
        this.key = key;

        this.headers = {
            apiuser: this.apiuser,
            apikey: this.key,
        };
    }

    /** 
     * This function returns an object with the link where a user is to be redirected in order to complete his payment
     *
     * Below is a parameter template. Just amount is required
     *
     * data = {
     *     "amount": Integer ,
     *     "email": String,
     *     "userId": String,
     *     "externalId": String,
     *     "redirectUrl": String,
     *     "message": String
     * }
     */
    initiatePay(data) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                if (!data?.amount) return resolve(error("amount required", 400));
                if (!Number.isInteger(data.amount))
                    return resolve(error("amount must be of type integer", 400));
                if (data.amount < 100)
                    return resolve(error("amount cannot be less than 100 XAF", 400));

                const config = {
                    method: "post",
                    url: baseUrl + "/initiate-pay",
                    headers: self.headers,
                    data: data,
                };
                const response = await axios(config);
                response.data.statusCode = response.status;
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function directly initiates a payment request to a user's mobile device and 
     * returns an object with a transId property that is used to get the status of the payment
     *
     * Below is a parameter template. amount and phone are required
     *
     * data = {
     *     "amount": Integer ,
     *     "phone": String ,
     *     "medium": String,
     *     "name": String,
     *     "email": String,
     *     "userId": String,
     *     "externalId": String,
     *     "message": String
     * }
     */
    directPay(data) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                if (!data?.amount) return resolve(error("amount required", 400));
                if (!Number.isInteger(data.amount))
                    return resolve(error("amount must be of type integer", 400));
                if (data.amount < 100)
                    return resolve(error("amount cannot be less than 100 XAF", 400));
                if (!data?.phone) return resolve(error("phone number required", 400));
                if (typeof data.phone !== "string")
                    return resolve(error("phone must be of type string", 400));
                if (!/^6[\d]{8}$/.test(data.phone))
                    return resolve(error("invalid phone number", 400));

                const config = {
                    method: "post",
                    url: baseUrl + "/direct-pay",
                    headers: self.headers,
                    data: data,
                };
                const response = await axios(config);
                response.data.statusCode = response.status;
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function returns an object containing the details of the transaction associated with the Id passed as parameter
     */
    paymentStatus(transId) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                if (!transId || typeof transId !== "string")
                    return resolve(error("invalid type, string expected", 400));
                if (!/^[a-zA-Z0-9]{8,10}$/.test(transId))
                    return resolve(error("invalid transaction id", 400));

                const config = {
                    method: "get",
                    url: baseUrl + "/payment-status/" + transId,
                    headers: self.headers,
                };
                const response = await axios(config);
                response.data.statusCode = response.status;
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function expires the transaction associated with the Id passed as parameter and returns an object containing the details of the transaction
     */
    expirePay(transId) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                if (!transId || typeof transId !== "string")
                    return resolve(error("invalid type, string expected", 400));
                if (!/^[a-zA-Z0-9]{8,10}$/.test(transId))
                    return resolve(error("invalid transaction id", 400));

                const config = {
                    method: "post",
                    url: baseUrl + "/expire-pay",
                    data: { transId },
                    headers: self.headers,
                };
                const response = await axios(config);
                response.data.statusCode = response.status;
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function returns an array of objects containing the transaction details of the user Id passed as parameter
     */
    userTrans(userId) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                if (!userId || typeof userId !== "string")
                    return resolve(error("invalid type, string expected", 400));
                if (!/^[a-zA-Z0-9-_]{1,100}$/.test(userId))
                    return resolve(error("invalid user id", 400));

                const config = {
                    method: "get",
                    url: baseUrl + "/transaction/" + userId,
                    headers: self.headers,
                };
                const response = await axios(config);
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function returns an object containing the balance of a service
     */
    balance() {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                const config = {
                    method: "get",
                    url: baseUrl + "/balance",
                    headers: self.headers,
                };
                const response = await axios(config);
                response.data.statusCode = response.status;
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function performs a payout to the phone number specified in the data parameter and 
     * returns an object with a transId property that is used to get the status of the payment
     *
     * Note: In the live environment, payouts must be enabled for this to work. Contact support if needed
     *
     * Below is a parameter template. amount and phone are required
     *
     * data = {
     *     "amount": Integer ,
     *     "phone": String ,
     *     "medium": String,
     *     "name": String,
     *     "email": String,
     *     "userId": String,
     *     "externalId": String,
     *     "message": String
     * }
     */
    payout(data) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                if (!data?.amount) return resolve(error("amount required", 400));
                if (!Number.isInteger(data.amount))
                    return resolve(error("amount must be of type integer", 400));
                if (data.amount < 100)
                    return resolve(error("amount cannot be less than 100 XAF", 400));
                if (!data?.phone) return resolve(error("phone number required", 400));
                if (typeof data.phone !== "string")
                    return resolve(error("phone must be of type string", 400));
                if (!/^6[\d]{8}$/.test(data.phone))
                    return resolve(error("invalid phone number", 400));

                const config = {
                    method: "post",
                    url: baseUrl + "/payout",
                    headers: self.headers,
                    data: data,
                };
                const response = await axios(config);
                response.data.statusCode = response.status;
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }

    /** 
     * This function returns an array containing the transactions that satisfy
     * the criteria specified in the parameter passed to the function
     *
     * Below is a parameter template.
     *
     * params = {
     *     "status": enum [created, successful, failed, expired],
     *     "medium": mobile money or orange money,
     *     "start": Date in format yyyy-mm-dd,
     *     "end": Date in format yyyy-mm-dd,
     *     "amt": >= 100,
     *     "limit": range(1, 100) default is 10,
     *     "sort": asc || desc
     * }
     */
    search(params = {}) {
        const self = this;
        return new Promise(async function (resolve) {
            try {
                const config = {
                    method: "get",
                    url: baseUrl + "/search",
                    params: params,
                    headers: self.headers,
                };
                const response = await axios(config);
                resolve(response.data);
            } catch (e) {
                console.log(e);
                const statusCode = e.response ? e.response.status : 500;
                const message = e.response && e.response.data ? e.response.data.message : "Erreur inconnue";
                resolve(error(message, statusCode));
            }
        });
    }
};

function error(message, statusCode) {
    return { message, statusCode };
}