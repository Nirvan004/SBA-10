export interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDetail extends Meal {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string | null;
}