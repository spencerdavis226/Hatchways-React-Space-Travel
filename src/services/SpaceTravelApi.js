import SpaceTravelMockApi from './SpaceTravelMockApi.js';

class SpaceTravelApi {
  static async getPlanets() {
    return SpaceTravelMockApi.getPlanets();
  }

  static async getSpacecrafts() {
    return SpaceTravelMockApi.getSpacecrafts();
  }

  static async getSpacecraftById({ id }) {
    return SpaceTravelMockApi.getSpacecraftById({ id });
  }

  static async buildSpacecraft({
    name,
    capacity,
    description,
    pictureUrl = undefined,
  }) {
    return SpaceTravelMockApi.buildSpacecraft({
      name,
      capacity,
      description,
      pictureUrl,
    });
  }

  static async destroySpacecraftById({ id }) {

    const response = await SpaceTravelMockApi.destroySpacecraftById({ id });

    return response;
  }

  static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    return SpaceTravelMockApi.sendSpacecraftToPlanet({
      spacecraftId,
      targetPlanetId,
    });
  }
}

export default SpaceTravelApi;
