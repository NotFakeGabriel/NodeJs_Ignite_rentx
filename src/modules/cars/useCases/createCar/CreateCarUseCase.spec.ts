import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("shuld be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Brand Car", 
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  })

  it("shuld not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car", 
        description: "Description Car", 
        daily_rate: 100, 
        license_plate: "ABC-1234", 
        fine_amount: 60, 
        brand: "Brand Car", 
        category_id: "category",
      });

      await createCarUseCase.execute({
        name: "Name Car", 
        description: "Description Car", 
        daily_rate: 100, 
        license_plate: "ABC-1234", 
        fine_amount: 60, 
        brand: "Brand Car", 
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it("shuld be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABCD-1234", 
      fine_amount: 60, 
      brand: "Brand Car", 
      category_id: "category",
    });

    expect(car.available).toBe(true);
  })
})