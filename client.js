const WebSocket = require('ws');

// connecting WebSocket server
const ws=new WebSocket('ws://localhost:8000');

//store processed orders to avoid duplicats
const processedOrders = new Set();

// function to determine action
const determineAction = (order) => {
    const { priceType, status, AppOrderID } = order;
    if (status === "cancelled") return "cancelOrder";
    if (!processedOrders.has(AppOrderID)) {
        if ((priceType === "MKT" && status === "complete") ||(priceType === "LMT" && status === "open") ||
            (priceType === "SL-LMT" || priceType === "SL-MKT" && status === "pending")) {
            return "placeOrder";
        }
    } else {
        return "modifyOrder";
    }
};

//handle incoming messages
ws.on('message', (data) => {
    const order = JSON.parse(data);

    // check redundancy
    const isRedundant = processedOrders.has(order.AppOrderID);
    if (!isRedundant) {
        //determine action based on order details
        const action = determineAction(order);
        console.log(`Action for Order ${order.AppOrderID}: ${action}`);
        //  add to processed orders
        processedOrders.add(order.AppOrderID);

        // simulate sending to action handler
        console.log(`Sending update for order ${order.AppOrderID} to handler at ${new Date().toISOString()}`);
    } else {
        console.log(`Ignored redundant order ${order.AppOrderID}`);
    }
});

// aggregate updates within 1 second
let buffer = [];
let timer;
ws.on('message', (data) => {
    buffer.push(data);
    if (!timer) {
        timer = setTimeout(() => {
            if (buffer.length > 0) {
                const update = buffer.pop();  // keep only the latest update
                console.log(`Aggregated update:${update}`);
                buffer = [];
            }
            clearTimeout(timer);
            timer = null;
        }, 1000);
    }
});

console.log('WebSocket listener running');
