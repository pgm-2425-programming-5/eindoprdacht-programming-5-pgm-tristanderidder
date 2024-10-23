export type Recipe = {
  documentId: number;
  name: string;
  image: {
    url: string;
  };
  ingredients: {
    amount: string;
    name: string;
  }[];
  instructions: {
    step: string;
    name: string;
  }[];
  rating: number;
  category: string;
  equipment: {
    name: string;
  }[];
  comments: Comment[];
};


export type Comment = {
  user: string;
  message: string;
};

