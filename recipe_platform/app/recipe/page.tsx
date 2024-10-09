import React from 'react';
import RecipeItem from './component/RecipeItem';
import {promises as fs} from 'fs';
import path from 'path';
import {Recipe} from '../types/Recipe';

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
            <div>
                {recipes.map((recipe) => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

