export class StoreShoeStock {
  public name: number;
  public calories: string;
  public fat: string;
  public carbs: number;
  public protein: number;
    
  constructor(name, calories, fat, carbs, protein){
    this.name = name;
    this.calories = calories;
    this.fat = fat;
    this.carbs = carbs;
    this.protein = protein;
  }

  getRow(): string {
    return { name, calories, fat, carbs, protein };
  }

}
