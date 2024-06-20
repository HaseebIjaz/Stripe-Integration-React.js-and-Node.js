const config = {
    pk_test: String(process.env.REACT_APP_STRIPE_PK_TEST),
    server_url: String(process.env.REACT_APP_SERVER_URL),
    server_payment_route: String(process.env.REACT_APP_SERVER_PAYMENT_ROUTE),
}

export default config;