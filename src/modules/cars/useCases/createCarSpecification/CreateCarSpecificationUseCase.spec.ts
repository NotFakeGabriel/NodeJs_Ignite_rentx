import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemomory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemomory;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemomory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
      );
  })

  it("shuld not be able to add a new specification to a non-existent car", async () => {
    const car_id = "123";
    const specifications_id = ["54321"];
    await expect(
      createCarSpecificationUseCase.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  })  

  it("shuld be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car", 
      description: "Description Car", 
      daily_rate: 100, 
      license_plate: "ABC-1234", 
      fine_amount: 60, 
      brand: "Brand Car", 
      category_id: "category",
    })

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    })

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
       car_id: car.id, specifications_id 
      });

      expect(specificationsCars).toHaveProperty("specifications")
      expect(specificationsCars.specifications.length).toBe(1);
  }) 
})