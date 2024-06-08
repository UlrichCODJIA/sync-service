const request = require('supertest');
const app = require('../src/app');
const Sync = require('../src/models/sync');
const plantService = require('../src/services/plantService');
const firebaseService = require('../src/services/firebaseService');

jest.mock('../src/services/plantService');
jest.mock('../src/services/firebaseService');

describe('Sync Controller', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should sync plant data successfully', async () => {
        const lastSyncTimestamp = new Date();
        const updatedPlants = [
            {
                _id: '123',
                scientificName: 'Aloe vera',
                commonNames: ['Aloe', 'True aloe'],
                description: 'Medicinal plant',
            },
        ];

        plantService.getUpdatedPlants.mockResolvedValue(updatedPlants);
        firebaseService.sendNotification.mockResolvedValue();
        Sync.findOneAndUpdate.mockResolvedValue();

        const response = await request(app).post('/sync');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Plant data synced successfully');
        expect(plantService.getUpdatedPlants).toHaveBeenCalledWith(lastSyncTimestamp);
        expect(firebaseService.sendNotification).toHaveBeenCalledWith('plant_updates', expect.any(Object));
        expect(Sync.findOneAndUpdate).toHaveBeenCalledWith({}, { lastSyncTimestamp: expect.any(Date) }, { upsert: true });
    });

    it('should handle errors during sync', async () => {
        const errorMessage = 'Error syncing plant data';
        plantService.getUpdatedPlants.mockRejectedValue(new Error(errorMessage));

        const response = await request(app).post('/sync');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe(errorMessage);
    });
});