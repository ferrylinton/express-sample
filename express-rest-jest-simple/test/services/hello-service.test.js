const { getMessage } = require('../../src/services/hello-service');


describe('helloService', () => {
	
    test('should return message', async () => {
        const name = 'ferry'; 
		const message = getMessage(name);
		expect(message).toEqual(`Horas ${name} !!`);
	});

    test('should throw error', async () => {
		expect(() => getMessage('')).toThrow(new Error('Name is empty'));
	});

});
