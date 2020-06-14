const { gql } = require('apollo-server-express');

const schema = gql`
  type Coordinates{
    latitude: String
    longitude: String
  }

  type ResultDetails {
    searchFacility: String
    searchId: String
    searchPlace: String
    searchRadius: String
    searchAt: String
    searchCoordinates: Coordinates
  }

  type Query {
    hello: String
    getSearchResults(id: String): [ResultDetails]
  }
`;

module.exports = schema;