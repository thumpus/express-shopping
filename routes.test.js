process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");

let bagels = { name: "bagels", price: "2.50"};
let donuts = { name: "donuts", price: "800.00"};

beforeEach(function(){
    items.push(bagels);
});

afterEach(function(){
    items.length = 0;
});

describe("GET /items", function(){
    test("Gets a list of items", async function(){
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual([bagels]);
    });
});

describe("POST /items", function(){
    test("Adds an item to the list", async function(){
        
        const resp = await request(app).post(`/items`).send(donuts);
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({"added": donuts});
    });
});

describe("GET /items/bagels", function(){
    test("Gets details on a specific item", async function(){
        const resp = await request(app).get('/items/bagels');
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"item": bagels});
    })
})

describe("PATCH /items/:name", function(){
    test("changes the price of bagels", async function(){
        const resp = await request(app).patch(`/items/${bagels.name}`).send({ name: "bagels2", price: "4.20"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ "Updated": { name: "bagels2", price: "4.20"} });
    })
})

describe("DELETE /items/:name", function(){
    test("deletes an item", async function(){
        const resp = await request(app).delete(`/items/${bagels.name}`);
        expect(resp.body).toEqual({ message: "DELETED!!" })
        expect(items).toEqual([]);
    })
})