const Intern = require('../lib/Intern');

test('creates an Intern object', () => {
    const intern = new Intern("testName", 1, "test@email.com", "UCI");
    expect(intern.school).toBe("UCI");
});

test('import employee school', () => {
    const intern = new Intern("testName", 1, "test@email.com", "UCI");
    expect(intern.getSchool()).toBe("UCI");
});


test('import role of employee', () => {
    const intern = new Intern("testName", 1, "test@email.com", "UCI");
    expect(intern.getRole()).toBe("Intern");
}); 