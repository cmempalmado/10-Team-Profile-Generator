const Manager = require('../lib/Manager');

test('creates an Manager object', () => {
    const manager = new Manager("testName", 1, "test@email.com", 100);
    expect(manager.officeNumber).toBe(100);
});

test('creates role of employee', () => {
    const manager = new Manager("testName", 1, "test@email.com");
    expect(manager.getRole()).toBe("Manager");
});