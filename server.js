const WebSocket = require('ws');

// sample order updates
const orderUpdates = [
        { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"},
        { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"}, // Duplicate
        { "AppOrderID": 1111075075, "price": 2, "triggerPrice": 4, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:17", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "IDEA"}, // Duplicate
        { "AppOrderID": 1111075076, "price": 3, "triggerPrice": 5, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANCE"}, 
        { "AppOrderID": 1111075076, "price": 3, "triggerPrice": 5, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:18", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "RELIANCE"}, // Duplicate 
        { "AppOrderID": 1111075077, "price": 4, "triggerPrice": 6, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:19", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "TATA"},  
        { "AppOrderID": 1111075078, "price": 5, "triggerPrice": 7, "priceType": "LMT", "productType": "I", "status": "cancelled", "CumulativeQuantity": 0, "LeavesQuantity": 1, "Order GeneratedDateTimeAPI": "23-07-2024 10:16:20", "transactio n": "sell", "AlgoID": "", "exchange": "NSE", "symbol": "BAJAJ"}, 
        { "AppOrderID": 1111075079, "price": 6, "triggerPrice": 8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO"},  
        { "AppOrderID": 1111075079, "price": 6, "triggerPrice": 8, "priceType": "MKT", "productType": "I", "status": "complete", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderG eneratedDateTimeAPI": "23-07-2024 10:16:21", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "WIPRO"},  // Duplicate 
        { "AppOrderID": 1111075080, "price": 7, "triggerPrice": 9, "priceType": "LMT", "productType": "I", "status": "open", "CumulativeQuantity": 0, "LeavesQuantity": 1, "OrderGeneratedDateTimeAPI": "23-07-2024 10:16:22", "transaction": "buy", "AlgoID": "", "exchange": "NSE", "symbol": "ONGC"}
       
];

// create a WebSocket Server
const server = new WebSocket.Server({ port: 8000 });

server.on('connection', (ws) => {
    console.log('Client connected');

    // helper function to send updates with delays
    const sendUpdates = (updates, delay) => {
        setTimeout(() => {
            updates.forEach((update, index) => {
                ws.send(JSON.stringify(update));
                console.log(`Sent: ${JSON.stringify(update)} at ${new Date().toISOString()}`);
            });
        }, delay);
    };

    // sending updates as per the requirement
    sendUpdates(orderUpdates.slice(0, 10), 1000);
    sendUpdates(orderUpdates.slice(10, 30), 3000);
    sendUpdates(orderUpdates.slice(30, 70), 6000);
    sendUpdates(orderUpdates.slice(70, 100), 11000);
});

console.log('server running on ws://localhost:8000');
