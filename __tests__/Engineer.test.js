const Engineer = require('../lib/Engineer');

test('creates an Engineer object', () => {
    const engineer = new Engineer("testName", 1, "test@email.com", "test01");
    expect(engineer.github).toBe("test01");
});


test('import engineer github value', () => {
    const engineer = new Engineer("testName", 1, "test@email.com", "test01");
    expect(engineer.getGithub()).toBe("test01");
});


test('import role of employee', () => {
    const engineer = new Engineer("testName", 1, "test@email.com", "test01");
    expect(engineer.getRole()).toBe("Engineer");
});