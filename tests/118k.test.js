const request = require("supertest");
const app = require("../index.js");

//Route does not exist, bad request
describe("POST /api/other", () => {
  it("Should respond with a 400 status code, content-type is JSON, error is defined.", async () => {
    const response = await request(app).post("/api/other").send({
      name: "la cabane de leon",
      address: "Enghien Les Bains"
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

//Verb does not exist, bad request
describe("GET /api/company", () => {
  it("Should respond with a 400 status code, content-type is JSON, error is defined.", async () => {
    const response = await request(app).get("/api/company").send({
      name: "la cabane de leon",
      address: "Enghien Les Bains"
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

// Request Body parameter 'name' is not defined, bad request
describe("POST /api/company", () => {
  it("Should respond with a 400 status code, content-type is JSON, error is defined.", async () => {
    const response = await request(app).post("/api/company").send({
      address: "Enghien Les Bains"
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

// Status must be "Success" (1 result)
describe("POST /api/company", () => {
  it("Should respond with a 200 status code, content-type is JSON, status & message & phone_number are defined, status is 'Success'.", async () => {
    const response = await request(app).post("/api/company").send({
      name: "la cabane de leon",
      address: "Enghien Les Bains"
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBeDefined();
    expect(response.body.message).toBeDefined();
    expect(response.body.phone_number).toBeDefined();
    expect(response.body.status).toBe("Success");
  });
});

// Status must be "Warning" (result: more than one)
describe("POST /api/company", () => {
  it("Should respond with a 400 status code, content-type is JSON, status & message & phone_number are defined, status is 'Warning'.", async () => {
    const response = await request(app).post("/api/company").send({
      name: "la cabane de leon"
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.status).toBeDefined();
    expect(response.body.message).toBeDefined();
    expect(response.body.phone_number).toBeDefined();
    expect(response.body.status).toBe("Warning");
  });
});

// Status must be "Error" (no result)
describe("POST /api/company", () => {
  it("Should respond with a 404 status code, content-type is JSON, status & message are defined, status is 'Error'.", async () => {
    const response = await request(app).post("/api/company").send({
      name: "aaaaaaaaaaaaa"
    });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBeDefined();
    expect(response.body.message).toBeDefined();
    expect(response.body.status).toBe("Error");
  });
});
