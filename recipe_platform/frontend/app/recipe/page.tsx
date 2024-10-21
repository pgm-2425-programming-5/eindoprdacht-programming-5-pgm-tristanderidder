import React from 'react';
import {promises as fs} from 'fs';
import path from 'path';
import {Recipe} from '../types/Recipe';
import RecipeFilter from './component/RecipeFilter';

type RecipeProps = {
    recipes: Recipe[];
};

export default async function RecipePage() {
    let filePath = path.join(
        path.join(process.cwd(), 'public/data/dummy.json')
    );
    let data = await fs.readFile(filePath, "utf-8");
    let recipes: Recipe[] = JSON.parse(data).recipes;
    

    return (
      <div>
        <div className={`flex justify-around`}>
          <RecipeFilter recipes={recipes} />
        </div>
      </div>
    );
};



