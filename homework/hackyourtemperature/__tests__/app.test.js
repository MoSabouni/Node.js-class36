import supertest from "supertest";
import app from "../app.js";


const request = supertest(app);

describe("POST /weather", () => {

  describe("given a city name correctly", () => {

      test("should respond with 200 status code", async () => {
        const response = await request.post("/weather").send({ cityName: "London" });
        expect(response.statusCode).toBe(200)
      });

      test("should specifiy json in the content type header", async () => {
        const response = await request.post("/weather").send({ cityName: "London" })
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
      });

      test("response has city", async () => {
        const response = await request.post("/weather").send({ cityName: "London" })
        expect(response.body.cityName).toBeDefined();
      });

      test("response has temprature", async () => {
        const response = await request.post("/weather").send({ cityName: "London" })
        expect(response.body.temp).toBeDefined();
      });
  });


  

    describe("given a city name incorrectly", () => {
  
        test("should respond with 404 status code in case of typo, empty string, gibirish word and a non city name", async () => {
          const cases = [{cityName: "Londob"}, {cityName: ""}, {cityName: "asdasdasd"}, {cityName: "John Cena"}];
          
          for (const aCase of cases) {
          const response = await request.post("/weather").send(aCase);
          expect(response.statusCode).toBe(404)
          }
        });
  
        test("should respond with Weather Text declaring no city was found", async () => {
          const response = await request.post("/weather").send({ cityName: "" })
          expect(response.body.weatherText).toEqual("City is not found!")
        });
  
        test("response has no city name if it is written incorrectly", async () => {
          const response = await request.post("/weather").send({ cityName: "asdsdsasd" })
          expect(response.body.cityName).toBeUndefined();
        });
  
        test("response has no temprature if there is no city", async () => {
          const response = await request.post("/weather").send({ cityName: "" })
          expect(response.body.temp).toBeUndefined();
        });
    });
  
})