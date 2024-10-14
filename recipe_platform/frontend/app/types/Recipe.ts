export type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  rating: number;
  category: string;
  equipment: string[];
  comments: Comment[];
};


export type Comment = {
  user: string;
  message: string;
};

