const { gql } = require('apollo-server-express');

const schema = gql`
  type Coordinates{
    latitude: String
    longitude: String
  }

  type Time {
    seconds: Int
    nanoseconds: Int
  }

  type ResultDetails {
    searchFacility: String
    searchId: String
    searchPlace: String
    searchRadius: String
    searchAt: Time
    searchCoordinates: Coordinates
  }

  type Query {
    hello: String
    getSearchResults(id: String): [ResultDetails]
  }
`;

module.exports = schema;