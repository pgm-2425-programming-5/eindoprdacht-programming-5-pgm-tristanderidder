import { gql, request } from "graphql-request";


export const query = gql`
    query Recipes {
recipes {
    documentId
    name
    image {
      url
    }
    rating
    instructions {
      step
      name
    }
    ingredients {
      amount
      name
    }
    comments {
      documentId
      comment
    }
    equipment {
      documentId
      name
    }
  category
}
}

  `;